#!/usr/bin/env node
/**
 * ---------------------------------------------------------------------------
 * CONTACT SHEET
 * ---------------------------------------------------------------------------
 * Downloads every photograph referenced from data/ at thumbnail size and
 * assembles a labelled grid, so the whole library can be eyeballed at once.
 *
 *   npm run contact-sheet        (needs ImageMagick's `montage` on PATH)
 *
 * Why this exists: a URL resolving says nothing about what is actually in the
 * frame. This is how you check that a photo matches the alt text written for
 * it, and that nothing wildly off-brand has crept in.
 *
 * Output: contact-sheet/sheet-N.png plus a numbered key printed to stdout.
 * The directory is disposable — it is not part of the site.
 * ---------------------------------------------------------------------------
 */

import { readdir, readFile, mkdir, writeFile, rm } from 'node:fs/promises';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const run = promisify(execFile);
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = join(ROOT, 'data');
const OUT_DIR = join(ROOT, 'contact-sheet');
const THUMB_W = 220;
const PER_SHEET = 24;

const stripComments = (s) =>
  s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/[^\n]*/g, '$1');

/** Collects { id, alt, file } for every Unsplash photo, in source order. */
async function collect() {
  const files = (await readdir(DATA_DIR)).filter((f) => f.endsWith('.ts'));
  const entries = [];
  const seen = new Set();

  for (const file of files.sort()) {
    const src = stripComments(await readFile(join(DATA_DIR, file), 'utf8'));

    // Pair each photo id with the nearest following alt//caption string, which
    // is how these objects are written throughout data/.
    const re = /\b(?:unsplashPhoto|u)\(\s*['"]([\w-]+)['"]\s*\)/g;
    let m;
    while ((m = re.exec(src))) {
      const id = m[1];
      const after = src.slice(m.index, m.index + 400);
      const altMatch = after.match(/alt:\s*['"]([^'"]+)['"]/);
      const nameMatch = after.match(/name:\s*['"]([^'"]+)['"]/);
      const key = `${file}:${id}`;
      if (seen.has(key)) continue;
      seen.add(key);
      entries.push({
        id,
        file,
        label: nameMatch?.[1] ?? altMatch?.[1] ?? '(no label found)',
      });
    }
  }
  return entries;
}

const slug = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 34);

async function main() {
  await rm(OUT_DIR, { recursive: true, force: true });
  await mkdir(join(OUT_DIR, 'thumbs'), { recursive: true });

  const entries = await collect();
  console.log(`Downloading ${entries.length} thumbnails…\n`);

  const key = [];
  let index = 0;

  for (const entry of entries) {
    index += 1;
    const n = String(index).padStart(2, '0');
    const url = `https://images.unsplash.com/photo-${entry.id}?auto=format&fit=crop&q=60&w=${THUMB_W}`;
    const target = join(OUT_DIR, 'thumbs', `${n}_${slug(entry.label)}.jpg`);

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      await writeFile(target, Buffer.from(await response.arrayBuffer()));
      key.push(`${n}  ${entry.label}  [${entry.file} · ${entry.id}]`);
    } catch (error) {
      key.push(`${n}  DOWNLOAD FAILED (${error.message})  [${entry.file} · ${entry.id}]`);
    }
  }

  await writeFile(join(OUT_DIR, 'KEY.txt'), key.join('\n') + '\n');
  console.log(key.join('\n'));

  // Assemble into labelled sheets, small enough to read in one screen each.
  const thumbs = (await readdir(join(OUT_DIR, 'thumbs'))).sort();
  for (let i = 0; i < thumbs.length; i += PER_SHEET) {
    const batch = thumbs.slice(i, i + PER_SHEET).map((f) => join(OUT_DIR, 'thumbs', f));
    const sheet = join(OUT_DIR, `sheet-${Math.floor(i / PER_SHEET) + 1}.png`);
    await run('montage', [
      ...batch,
      '-label', '%f',
      '-tile', '6x',
      '-geometry', `${THUMB_W}x160+6+6`,
      '-background', '#101412',
      '-fill', '#E8D3A3',
      '-pointsize', '13',
      sheet,
    ]);
    console.log(`\nWrote ${sheet}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
