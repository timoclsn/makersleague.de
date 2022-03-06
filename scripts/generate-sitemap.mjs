import { readFileSync, writeFileSync } from 'fs';
import { globby } from 'globby';
import prettier from 'prettier';

import { allBlogPosts } from '../.contentlayer/generated/allBlogPosts.mjs';

(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc');

  const pages = await globby([
    'pages/**/*tsx',
    '!pages/_*.tsx',
    '!pages/404.tsx',
    '!pages/blog/*.tsx',
    '!pages/mitglieder/*.tsx',
    '!pages/api',
  ]);

  allBlogPosts.forEach((blogPost) => {
    pages.push(`pages/blog/${blogPost.slug}.tsx`);
  });

  const members = JSON.parse(
    readFileSync('./.next/server/chunks/.members', 'utf8')
  );
  members.forEach((member) => {
    pages.push(`pages/mitglieder/${member.slug}.tsx`);
  });

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          ${pages
            .map((page) => {
              const path = page.replace('pages', '').replace('.tsx', '');
              const route = path === '/index' ? '' : path;

              return `
                <url>
                  <loc>${`https://makersleague.de${route}`}</loc>
                </url>
              `;
            })
            .join('')}
        </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  });

  writeFileSync('./public/sitemap.xml', formatted);
})();
