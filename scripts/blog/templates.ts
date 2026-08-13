import {
  SITE_URL,
  BLOG_BASE_PATH,
  BLOG_AUTHOR,
  BLOG_PUBLISHER,
  BLOG_INDEX,
  BLOG_URLS,
  umamiScriptTag,
} from '../../src/config/blog';
import type { Post } from './posts';

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function postUrl(slug: string): string {
  return `${SITE_URL}${BLOG_BASE_PATH}/${slug}/`;
}

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Repeats the homepage's no-flash theme script. Blog pages are plain HTML, so
 * they cannot reuse the React hook, but they must read the same localStorage
 * key or a reader's theme choice would not survive the click into a post.
 */
const THEME_SCRIPT = `(function(){var s=localStorage.getItem('theme');var t=s==='light'||s==='dark'?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);})();`;

const THEME_TOGGLE_SCRIPT = `document.getElementById('theme-toggle').addEventListener('click',function(){var t=document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark';document.documentElement.setAttribute('data-theme',t);localStorage.setItem('theme',t);});`;

function analyticsTag(): string {
  const tag = umamiScriptTag();
  return tag === '' ? '' : `\n    ${tag}`;
}

interface PageMeta {
  readonly title: string;
  readonly description: string;
  readonly canonical: string;
  readonly ogType: 'website' | 'article';
  readonly ogImage: string;
  readonly publishedTime: string | null;
  readonly structuredData: string;
}

function head(meta: PageMeta): string {
  const publishedTag =
    meta.publishedTime === null
      ? ''
      : `\n    <meta property="article:published_time" content="${meta.publishedTime}" />
    <meta property="article:author" content="${escapeHtml(BLOG_AUTHOR.NAME)}" />`;

  return `    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(meta.title)}</title>
    <meta name="description" content="${escapeHtml(meta.description)}" />
    <meta name="author" content="${escapeHtml(BLOG_AUTHOR.NAME)}" />
    <link rel="canonical" href="${meta.canonical}" />
    <link rel="alternate" type="application/rss+xml" title="${escapeHtml(BLOG_INDEX.TITLE)} — ${escapeHtml(BLOG_PUBLISHER.NAME)}" href="${SITE_URL}${BLOG_URLS.FEED}" />

    <link rel="icon" type="image/x-icon" href="/assets/favicon/favicon.ico" />
    <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/favicon-180x180.png" />

    <meta property="og:type" content="${meta.ogType}" />
    <meta property="og:site_name" content="${escapeHtml(BLOG_PUBLISHER.NAME)}" />
    <meta property="og:url" content="${meta.canonical}" />
    <meta property="og:title" content="${escapeHtml(meta.title)}" />
    <meta property="og:description" content="${escapeHtml(meta.description)}" />
    <meta property="og:image" content="${meta.ogImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />${publishedTag}

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(meta.title)}" />
    <meta name="twitter:description" content="${escapeHtml(meta.description)}" />
    <meta name="twitter:image" content="${meta.ogImage}" />

    <meta name="theme-color" content="#332b80" />
    <link rel="stylesheet" href="${BLOG_URLS.STYLESHEET}" />

    <script type="application/ld+json">
${meta.structuredData}
    </script>

    <script>${THEME_SCRIPT}</script>${analyticsTag()}`;
}

function shell(meta: PageMeta, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
${head(meta)}
  </head>
  <body>
    <a class="skip-nav" href="#main-content">Skip to content</a>
    <header class="blog-header">
      <a class="blog-home" href="/">
        <img class="logo logo-light" src="/assets/logo/Novada_Logo_RGB_Donkerblauw.svg" alt="NovAda" />
        <img class="logo logo-dark" src="/assets/logo/Novada_Logo_RGB_Warmlichtgrijs.svg" alt="NovAda" />
      </a>
      <button id="theme-toggle" type="button" aria-label="Toggle colour theme">
        <span class="theme-icon-light" aria-hidden="true">☾</span>
        <span class="theme-icon-dark" aria-hidden="true">☀</span>
      </button>
    </header>
    <main id="main-content">
${body}
    </main>
    <footer class="blog-footer">
      <p>Written by ${escapeHtml(BLOG_AUTHOR.NAME)} at <a href="/">${escapeHtml(BLOG_PUBLISHER.NAME)}</a>.</p>
      <p>
        <a href="${BLOG_URLS.FEED}">RSS</a> ·
        <a href="${BLOG_AUTHOR.LINKEDIN}">LinkedIn</a> ·
        <a href="${BLOG_AUTHOR.GITHUB}">GitHub</a>
      </p>
    </footer>
    <script>${THEME_TOGGLE_SCRIPT}</script>
  </body>
</html>
`;
}

function postStructuredData(post: Post, ogImage: string): string {
  return JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      image: ogImage,
      url: postUrl(post.slug),
      mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl(post.slug) },
      keywords: post.tags.join(', '),
      author: {
        '@type': 'Person',
        name: BLOG_AUTHOR.NAME,
        url: SITE_URL,
        sameAs: [BLOG_AUTHOR.LINKEDIN, BLOG_AUTHOR.GITHUB],
      },
      publisher: {
        '@type': 'Organization',
        name: BLOG_PUBLISHER.NAME,
        url: SITE_URL,
        logo: `${SITE_URL}${BLOG_PUBLISHER.LOGO_URL}`,
      },
    },
    null,
    2
  );
}

export function renderPostPage(post: Post, ogImage: string): string {
  const tags =
    post.tags.length === 0
      ? ''
      : `\n        <ul class="tags">${post.tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join('')}</ul>`;

  const body = `      <article class="post">
        <header class="post-header">
          <h1>${escapeHtml(post.title)}</h1>
          <p class="post-meta">
            <time datetime="${post.date}">${formatDate(post.date)}</time> ·
            ${post.readingMinutes} min read
          </p>${tags}
        </header>
${post.html}
      </article>
      <nav class="post-nav"><a href="${BLOG_BASE_PATH}/">← All writing</a></nav>`;

  return shell(
    {
      title: `${post.title} — ${BLOG_AUTHOR.NAME}`,
      description: post.description,
      canonical: postUrl(post.slug),
      ogType: 'article',
      ogImage,
      publishedTime: post.date,
      structuredData: postStructuredData(post, ogImage),
    },
    body
  );
}

export function renderIndexPage(posts: readonly Post[], ogImage: string): string {
  const entries = posts
    .map(
      (post) => `        <li>
          <a href="${BLOG_BASE_PATH}/${post.slug}/">
            <h2>${escapeHtml(post.title)}</h2>
          </a>
          <p class="post-meta"><time datetime="${post.date}">${formatDate(post.date)}</time> · ${post.readingMinutes} min read</p>
          <p>${escapeHtml(post.description)}</p>
        </li>`
    )
    .join('\n');

  const body = `      <div class="post index">
        <header class="post-header">
          <h1>${escapeHtml(BLOG_INDEX.TITLE)}</h1>
          <p class="post-meta">${escapeHtml(BLOG_INDEX.DESCRIPTION)}</p>
        </header>
        <ul class="post-list">
${entries}
        </ul>
      </div>`;

  return shell(
    {
      title: `${BLOG_INDEX.TITLE} — ${BLOG_AUTHOR.NAME}`,
      description: BLOG_INDEX.DESCRIPTION,
      canonical: `${SITE_URL}${BLOG_BASE_PATH}/`,
      ogType: 'website',
      ogImage,
      publishedTime: null,
      structuredData: JSON.stringify(
        {
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: `${BLOG_INDEX.TITLE} — ${BLOG_AUTHOR.NAME}`,
          description: BLOG_INDEX.DESCRIPTION,
          url: `${SITE_URL}${BLOG_BASE_PATH}/`,
          author: {
            '@type': 'Person',
            name: BLOG_AUTHOR.NAME,
            sameAs: [BLOG_AUTHOR.LINKEDIN, BLOG_AUTHOR.GITHUB],
          },
        },
        null,
        2
      ),
    },
    body
  );
}
