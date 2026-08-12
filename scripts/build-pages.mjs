#!/usr/bin/env node
/**
 * Builds the static GitHub Pages export locally, exactly as the workflow does.
 *
 *   npm run build:pages
 *
 * Output lands in `out/`. Preview it the way Pages will serve it — from a
 * /Bamboo-Village/ sub-path — with:
 *
 *   npm run preview:pages
 *
 * This exists as a script rather than an inline `GITHUB_PAGES=true next build`
 * because that syntax does not work in PowerShell or cmd.exe on Windows.
 */

import { spawn } from 'node:child_process';

const child = spawn('next', ['build'], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    GITHUB_PAGES: 'true',
    PAGES_BASE_PATH: process.env.PAGES_BASE_PATH ?? '/Bamboo-Village',
  },
});

child.on('exit', (code) => process.exit(code ?? 1));
