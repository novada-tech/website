/**
 * Blog configuration.
 *
 * Read by the static generator in `scripts/blog/`. Everything that ends up in
 * published HTML — canonical URLs, structured data, feed identity — is declared
 * here so that no individual post has to repeat it.
 */

export const SITE_URL = 'https://novada.be';

export const BLOG_BASE_PATH = '/blog';

/**
 * Posts carry Simon's name; NovAda is the publisher. That split is what makes
 * the association subtle, and it is expressed in the per-post structured data.
 */
export const BLOG_AUTHOR = {
  NAME: 'Simon Cockx',
  LINKEDIN: 'https://www.linkedin.com/in/simon-cockx-4110b3239/',
  GITHUB: 'https://github.com/SimonCockx',
} as const;

export const BLOG_PUBLISHER = {
  NAME: 'NovAda',
  LOGO_URL: '/assets/logo/Novada_Logo_RGB_Donkerblauw.svg',
} as const;

export const BLOG_INDEX = {
  TITLE: 'Writing',
  DESCRIPTION:
    'Notes on AI-assisted software development, developer tooling, and getting the fundamentals of complex systems right.',
} as const;

/** Paths relative to the repository root. */
export const BLOG_PATHS = {
  CONTENT: 'content/posts',
  OUTPUT: 'dist/blog',
  OG_OUTPUT: 'dist/assets/og',
  STYLESHEET_OUTPUT: 'dist/assets/blog.css',
  THEME_CSS: 'src/styles/theme.css',
  FONTS_CSS: 'src/styles/fonts.css',
  BLOG_CSS: 'src/styles/blog.css',
  SITEMAP_OUTPUT: 'dist/sitemap.xml',
} as const;

/** Public URLs of the files the generator writes. */
export const BLOG_URLS = {
  STYLESHEET: '/assets/blog.css',
  OG_DIRECTORY: '/assets/og',
  FEED: '/blog/rss.xml',
} as const;

/** Preview image title for the homepage, which index.html references by path. */
export const HOME_OG_TITLE = 'Increasingly better software';

/** The size LinkedIn, X and Slack expect for a link preview image. */
export const OG_IMAGE_SIZE = { WIDTH: 1200, HEIGHT: 630 } as const;

/**
 * Georgia rather than Maregraphe: the brand serif is a licensed web font that
 * is not installed system-wide, and `rsvg-convert` can only use system fonts.
 * Georgia is already the declared fallback in the site's own font stack.
 */
export const OG_IMAGE_FONT = 'Georgia, serif';

/** One Shiki theme per site theme, selected by `[data-theme]` in blog.css. */
export const CODE_THEMES = { LIGHT: 'github-light', DARK: 'github-dark' } as const;

/**
 * Self-hosted Umami. The script tag is only emitted when both values are set,
 * so an unconfigured build publishes pages with no tracking of any kind.
 */
interface UmamiConfig {
  readonly SCRIPT_URL: string;
  readonly WEBSITE_ID: string;
}

export const UMAMI: UmamiConfig = {
  SCRIPT_URL: 'https://analytics.novada.be/script.js',
  WEBSITE_ID: '51b7017f-babe-45e5-aa7c-a07140631acf',
};

/**
 * Built here rather than in each template so the homepage (injected by a Vite
 * plugin) and the blog pages cannot end up with different tags.
 */
export function umamiScriptTag(): string {
  if (UMAMI.SCRIPT_URL === '' || UMAMI.WEBSITE_ID === '') return '';
  return `<script defer src="${UMAMI.SCRIPT_URL}" data-website-id="${UMAMI.WEBSITE_ID}"></script>`;
}

/** Average adult reading speed, used for the "N min read" line. */
export const WORDS_READ_PER_MINUTE = 200;

/** Set to build drafts into `dist/` for local preview. Never set this in deploy.sh. */
export const DRAFTS_ENV_VAR = 'BLOG_DRAFTS';
