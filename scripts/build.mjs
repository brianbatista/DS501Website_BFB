import { mkdir, writeFile, cp } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { pages } from '../src/pages.mjs';
import { document } from '../src/components.mjs';

export const root = fileURLToPath(new URL('../', import.meta.url));
export async function build({ basePath = process.env.BASE_PATH || '' } = {}) {
  const prefix = basePath.replace(/^\/+|\/+$/g, '');
  if (prefix && !/^[a-zA-Z0-9_-]+(?:[./][a-zA-Z0-9_-]+)*$/.test(prefix)) {
    throw new Error('BASE_PATH must be a URL path such as /DS501Website_BFB');
  }
  // Keep authored routes root-relative; prefix only the generated URLs for hosting
  // beneath a repository path. Fragment and external links stay unchanged.
  const render = page => prefix
    ? document(page).replace(/\b(href|src)="\/(?!\/)/g, `$1="/${prefix}/`)
    : document(page);
  await mkdir(`${root}dist`, { recursive: true });
  await cp(`${root}public`, `${root}dist`, { recursive: true });
  await cp(`${root}src/styles.css`, `${root}dist/styles.css`);
  for (const page of pages) {
    const directory = `${root}dist${page.path}`;
    await mkdir(directory, { recursive: true });
    await writeFile(`${directory}/index.html`, render(page));
  }
  await writeFile(`${root}dist/404.html`, render({ path: '/404/', title: 'Page not found', content: '<section class="page-intro"><p class="eyebrow">404 / A loose page</p><h1>Not in this edition.</h1><p>This page could not be found.</p><a class="text-link" href="/">Return home <span aria-hidden="true">↗</span></a></section>' }));
  console.log(`Built ${pages.length} pages in dist/`);
}
if (process.argv[1] === fileURLToPath(import.meta.url)) await build();
