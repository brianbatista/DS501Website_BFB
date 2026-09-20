import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { build, root } from '../scripts/build.mjs';
import { pages } from '../src/pages.mjs';

await build();

test('all eight routes produce complete standalone pages', async () => {
  assert.equal(pages.length, 8);
  assert.equal(new Set(pages.map(page => page.path)).size, 8);
  for (const page of pages) {
    const html = await readFile(`${root}dist${page.path}/index.html`, 'utf8');
    assert.match(html, /<!doctype html>/i);
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1, page.path);
    assert.match(html, /<main id="main" tabindex="-1">/);
    assert.match(html, /Fictional content/);
  }
});

test('every generated internal link, fragment and asset resolves', async () => {
  for (const page of pages) {
    const html = await readFile(`${root}dist${page.path}/index.html`, 'utf8');
    for (const [, href] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      assert.ok(!/^https?:/.test(href), `Unexpected external dependency: ${href}`);
      if (href.startsWith('#')) {
        assert.ok(html.includes(`id="${href.slice(1)}"`), `${page.path}: ${href}`);
      } else {
        const target = `${root}dist${href}${href.endsWith('/') ? 'index.html' : ''}`;
        assert.ok((await stat(target)).isFile(), `${page.path}: ${href}`);
      }
    }
  }
});

test('not-found page provides a working recovery path', async () => {
  const html = await readFile(`${root}dist/404.html`, 'utf8');
  assert.match(html, /Page not found/);
  assert.match(html, /href="\/">Return home/);
});
