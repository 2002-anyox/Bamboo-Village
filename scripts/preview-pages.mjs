#!/usr/bin/env node
/**
 * Serves the static export from `out/` the way GitHub Pages will — under the
 * /Bamboo-Village/ sub-path — so you can catch base-path problems before
 * deploying.
 *
 *   npm run build:pages
 *   npm run preview:pages     → http://localhost:3200/Bamboo-Village/
 *
 * No dependencies: this is a small static file server.
 */

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, resolve, normalize, sep } from 'node:path';

const PORT = Number(process.env.PORT ?? 3200);
const BASE_PATH = process.env.PAGES_BASE_PATH ?? '/Bamboo-Village';
const ROOT = resolve(process.cwd(), 'out');

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
};

const send = (response, status, body, type = 'text/plain; charset=utf-8') => {
  response.writeHead(status, { 'Content-Type': type });
  response.end(body);
};

const server = createServer(async (request, response) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  } catch {
    return send(response, 400, 'Bad request');
  }

  if (pathname === '/' && BASE_PATH) {
    response.writeHead(302, { Location: `${BASE_PATH}/` });
    return response.end();
  }

  if (BASE_PATH && !pathname.startsWith(BASE_PATH)) {
    return send(response, 404, `Not found. The site is served at ${BASE_PATH}/`);
  }

  const relative = pathname.slice(BASE_PATH.length) || '/';

  // Keep the resolved path inside out/, whatever the request asks for.
  const target = resolve(ROOT, `.${normalize(relative)}`);
  if (target !== ROOT && !target.startsWith(ROOT + sep)) {
    return send(response, 403, 'Forbidden');
  }

  const candidates = [target, join(target, 'index.html'), `${target}.html`];

  for (const candidate of candidates) {
    try {
      const info = await stat(candidate);
      if (!info.isFile()) continue;
      const body = await readFile(candidate);
      const type = TYPES[extname(candidate)] ?? 'application/octet-stream';
      return send(response, 200, body, type);
    } catch {
      // try the next candidate
    }
  }

  try {
    return send(response, 404, await readFile(join(ROOT, '404.html')), TYPES['.html']);
  } catch {
    return send(response, 404, 'Not found');
  }
});

server.listen(PORT, () => {
  console.log(`\n  Static preview: http://localhost:${PORT}${BASE_PATH}/\n`);
  console.log('  This mirrors how GitHub Pages serves the site.');
  console.log('  Ctrl+C to stop.\n');
});
