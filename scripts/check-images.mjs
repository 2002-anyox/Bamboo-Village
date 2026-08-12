#!/usr/bin/env node
/**
 * ---------------------------------------------------------------------------
 * IMAGE HEALTH CHECK
 * ---------------------------------------------------------------------------
 * Verifies every photograph referenced from the `data/` folder actually
 * resolves — remote URLs are fetched, local paths are checked on disk.
 *
 *   npm run check:images
 *
 * Run this after swapping in the venue's own photography, and any time an
 * image looks like it is falling back to the branded placeholder panel.
 * Exits with code 1 if anything is unreachable, so it can gate a deploy.
 * ---------------------------------------------------------------------------
 */

import { readdir, readFile, access } from 'node:fs/promises';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = join(ROOT, 'data');
const PUBLIC_DIR = join(ROOT, 'public');

const CONCURRENCY = 6;
const TIMEOUT_MS = 15000;

/** Pulls every image reference out of the data files. */
async function collectReferences() {
  const files = (await readdir(DATA_DIR)).filter((name) => name.endsWith('.ts'));
  const found = new Map(); // url -> Set(source files)

  const add = (url, file) => {
    if (!found.has(url)) found.set(url, new Set());
    found.get(url).add(file);
  };

  for (const file of files) {
    const source = await readFile(join(DATA_DIR, file), 'utf8');

    // unsplashPhoto('1414235077428-338989a2e8c0')  /  u('…')
    for (const match of source.matchAll(
      /\b(?:unsplashPhoto|u)\(\s*['"]([\w-]+)['"]\s*\)/g,
    )) {
      add(`https://images.unsplash.com/photo-${match[1]}`, file);
    }

    // Bare https URLs
    for (const match of source.matchAll(/['"](https:\/\/[^'"\s]+)['"]/g)) {
      if (/\.(jpe?g|png|webp|avif|gif|mp4|webm)(\?|$)/i.test(match[1])) {
        add(match[1], file);
      }
    }

    // Local paths under /public
    for (const match of source.matchAll(
      /['"](\/[\w\-./]+\.(?:jpe?g|png|webp|avif|gif|svg|mp4|webm))['"]/g,
    )) {
      add(match[1], file);
    }
  }

  return found;
}

async function checkRemote(url) {
  const target = url.includes('images.unsplash.com')
    ? `${url.split('?')[0]}?auto=format&fit=crop&q=60&w=200`
    : url;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    let response = await fetch(target, {
      method: 'HEAD',
      signal: controller.signal,
      redirect: 'follow',
    });

    // Some CDNs reject HEAD — retry with a ranged GET.
    if (response.status === 405 || response.status === 403) {
      response = await fetch(target, {
        method: 'GET',
        headers: { Range: 'bytes=0-1024' },
        signal: controller.signal,
        redirect: 'follow',
      });
    }

    return response.ok
      ? { ok: true }
      : { ok: false, reason: `HTTP ${response.status}` };
  } catch (error) {
    return { ok: false, reason: error.name === 'AbortError' ? 'timeout' : error.message };
  } finally {
    clearTimeout(timer);
  }
}

async function checkLocal(path) {
  try {
    await access(join(PUBLIC_DIR, path.replace(/^\//, '')));
    return { ok: true };
  } catch {
    return { ok: false, reason: `missing from /public${path}` };
  }
}

async function main() {
  const references = await collectReferences();
  const entries = [...references.entries()];

  if (entries.length === 0) {
    console.log('No image references found in data/.');
    return;
  }

  console.log(`Checking ${entries.length} image reference(s)…\n`);

  const failures = [];
  let done = 0;

  const queue = [...entries];
  const workers = Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length > 0) {
      const [url, sources] = queue.shift();
      const result = url.startsWith('/') ? await checkLocal(url) : await checkRemote(url);

      done += 1;
      process.stdout.write(
        `\r  ${done}/${entries.length} checked — ${failures.length} problem(s)   `,
      );

      if (!result.ok) failures.push({ url, sources: [...sources], reason: result.reason });
    }
  });

  await Promise.all(workers);
  process.stdout.write('\n\n');

  if (failures.length === 0) {
    console.log('✓ Every image resolves.');
    return;
  }

  console.log(`✗ ${failures.length} image(s) could not be loaded:\n`);
  for (const failure of failures) {
    console.log(`  ${failure.url}`);
    console.log(`     ${failure.reason} — referenced in ${failure.sources.join(', ')}\n`);
  }
  console.log(
    'Replace these in the data/ files. Until then the site renders a branded\n' +
      'placeholder panel in their place rather than a broken image.',
  );

  process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
