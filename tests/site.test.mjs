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
    assert.match(html, /Sample projects/);
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

test('GitHub Pages build keeps all routes and assets inside the repository URL', async () => {
  const prefix = '/DS501Website_BFB';
  try {
    await build({ basePath: `${prefix}/` });
    const files = [...pages.map(page => `${page.path}/index.html`), '/404.html'];
    for (const file of files) {
      const html = await readFile(`${root}dist${file}`, 'utf8');
      assert.match(html, /href="#main"/, `${file}: skip link remains local`);
      for (const [, href] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
        if (href.startsWith('#')) continue;
        assert.ok(href.startsWith(`${prefix}/`), `${file}: ${href}`);
        const localPath = href.slice(prefix.length);
        const target = `${root}dist${localPath}${localPath.endsWith('/') ? 'index.html' : ''}`;
        assert.ok((await stat(target)).isFile(), `${file}: ${href}`);
      }
    }
    const home = await readFile(`${root}dist/index.html`, 'utf8');
    assert.match(home, /Ways of seeing/);
    const recovery = await readFile(`${root}dist/404.html`, 'utf8');
    assert.ok(recovery.includes(`href="${prefix}/">Return home`));
    const research = await readFile(`${root}dist/research/index.html`, 'utf8');
    assert.ok(research.includes(`href="${prefix}/research/" aria-current="page"`));
  } finally {
    // Leave the normal localhost preview usable after running the test suite.
    await build({ basePath: '' });
  }
});
