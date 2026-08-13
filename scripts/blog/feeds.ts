import {
  SITE_URL,
  BLOG_BASE_PATH,
  BLOG_AUTHOR,
  BLOG_INDEX,
  BLOG_PUBLISHER,
  BLOG_URLS,
} from '../../src/config/blog';
import type { Post } from './posts';
import { escapeHtml, postUrl } from './templates';

function toRfc822(isoDate: string): string {
  return new Date(`${isoDate}T09:00:00Z`).toUTCString();
}

/**
 * Full post bodies rather than summaries: it costs nothing, and it is what
 * makes a post readable in a feed reader or forwardable by a newsletter.
 */
export function renderFeed(posts: readonly Post[]): string {
  const items = posts
    .map(
      (post) => `    <item>
      <title>${escapeHtml(post.title)}</title>
      <link>${postUrl(post.slug)}</link>
      <guid isPermaLink="true">${postUrl(post.slug)}</guid>
      <pubDate>${toRfc822(post.date)}</pubDate>
      <description>${escapeHtml(post.description)}</description>
      <content:encoded><![CDATA[${post.html}]]></content:encoded>
${post.tags.map((tag) => `      <category>${escapeHtml(tag)}</category>`).join('\n')}
    </item>`
    )
    .join('\n');

  const latest = posts[0];

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeHtml(BLOG_INDEX.TITLE)} — ${escapeHtml(BLOG_AUTHOR.NAME)}</title>
    <link>${SITE_URL}${BLOG_BASE_PATH}/</link>
    <description>${escapeHtml(BLOG_INDEX.DESCRIPTION)}</description>
    <language>en</language>
    <copyright>${escapeHtml(BLOG_PUBLISHER.NAME)}</copyright>
    <managingEditor>${escapeHtml(BLOG_AUTHOR.NAME)}</managingEditor>
    <atom:link href="${SITE_URL}${BLOG_URLS.FEED}" rel="self" type="application/rss+xml" />
${latest === undefined ? '' : `    <lastBuildDate>${toRfc822(latest.date)}</lastBuildDate>`}
${items}
  </channel>
</rss>
`;
}

export function renderSitemap(posts: readonly Post[]): string {
  const urls = [
    { loc: `${SITE_URL}/`, lastmod: null },
    { loc: `${SITE_URL}${BLOG_BASE_PATH}/`, lastmod: posts[0]?.date ?? null },
    ...posts.map((post) => ({ loc: postUrl(post.slug), lastmod: post.date })),
  ];

  const entries = urls
    .map(
      ({ loc, lastmod }) =>
        `  <url>\n    <loc>${loc}</loc>${lastmod === null ? '' : `\n    <lastmod>${lastmod}</lastmod>`}\n  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}
