import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { BLOG_PATHS, BLOG_INDEX, HOME_OG_TITLE, DRAFTS_ENV_VAR } from '../src/config/blog';
import { loadPosts } from './blog/posts';
import { renderPostPage, renderIndexPage } from './blog/templates';
import { generateOgImage } from './blog/og-image';
import { renderFeed, renderSitemap } from './blog/feeds';

function write(path: string, contents: string): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, contents, 'utf8');
}

/** One stylesheet, assembled so the blog and the React app cannot drift apart. */
function buildStylesheet(): void {
  const sources = [BLOG_PATHS.FONTS_CSS, BLOG_PATHS.THEME_CSS, BLOG_PATHS.BLOG_CSS];
  write(BLOG_PATHS.STYLESHEET_OUTPUT, sources.map((path) => readFileSync(path, 'utf8')).join('\n'));
}

async function main(): Promise<void> {
  if (!existsSync('dist')) {
    throw new Error('dist/ does not exist — run `vite build` before the blog generator');
  }

  const includeDrafts = process.env[DRAFTS_ENV_VAR] === '1';
  const posts = await loadPosts(includeDrafts);

  // The homepage references this path from index.html, so it is generated
  // whether or not any post exists yet.
  generateOgImage('home', HOME_OG_TITLE, null);

  // The index, stylesheet and feed are always written: the homepage links to
  // /blog/, so it must resolve even before the first post is published.
  buildStylesheet();

  for (const post of posts) {
    const ogImage = generateOgImage(post.slug, post.title, post.ogImage);
    write(join(BLOG_PATHS.OUTPUT, post.slug, 'index.html'), renderPostPage(post, ogImage));
    console.log(`  ${post.draft ? 'draft ' : ''}/blog/${post.slug}/`);
  }

  const indexOgImage = generateOgImage('index', BLOG_INDEX.TITLE, null);
  write(join(BLOG_PATHS.OUTPUT, 'index.html'), renderIndexPage(posts, indexOgImage));

  // Drafts are excluded from the feed and sitemap even in a draft build, so a
  // local preview can never leak an unfinished post to a subscriber.
  const published = posts.filter((post) => !post.draft);
  write(join(BLOG_PATHS.OUTPUT, 'rss.xml'), renderFeed(published));
  write(BLOG_PATHS.SITEMAP_OUTPUT, renderSitemap(published));

  if (posts.length === 0) {
    console.log('  no posts yet — create one with: npm run blog:new "Your title"');
  }

  console.log(
    `\nBuilt ${posts.length} post(s)${includeDrafts ? ` (${posts.length - published.length} draft)` : ''}, index, feed and sitemap.`
  );
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
