import { execFileSync } from 'child_process';
import { writeFileSync, mkdirSync, unlinkSync } from 'fs';
import { join } from 'path';
import {
  BLOG_PATHS,
  BLOG_URLS,
  BLOG_AUTHOR,
  BLOG_PUBLISHER,
  OG_IMAGE_SIZE,
  OG_IMAGE_FONT,
  SITE_URL,
} from '../../src/config/blog';
import { escapeHtml } from './templates';

const RENDERER = 'rsvg-convert';

const BRAND = { BACKGROUND: '#211c40', TEXT: '#ececec', ACCENT: '#8b7fdc' } as const;

const TITLE_LINE_HEIGHT = 74;
const TITLE_FONT_SIZE = 60;
const MAX_TITLE_LINES = 4;
const MAX_CHARACTERS_PER_LINE = 32;
const MARGIN = 90;

/** Greedy wrap on character count; the serif is proportional, so this is a close-enough estimate. */
function wrapTitle(title: string): readonly string[] {
  const lines: string[] = [];
  let current = '';

  for (const word of title.split(/\s+/)) {
    const candidate = current === '' ? word : `${current} ${word}`;
    if (candidate.length > MAX_CHARACTERS_PER_LINE && current !== '') {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current !== '') lines.push(current);

  if (lines.length <= MAX_TITLE_LINES) return lines;
  const kept = lines.slice(0, MAX_TITLE_LINES);
  kept[MAX_TITLE_LINES - 1] = `${kept[MAX_TITLE_LINES - 1] ?? ''}…`;
  return kept;
}

function buildSvg(title: string): string {
  const lines = wrapTitle(title);
  const blockHeight = lines.length * TITLE_LINE_HEIGHT;
  const firstBaseline = (OG_IMAGE_SIZE.HEIGHT - blockHeight) / 2 + TITLE_FONT_SIZE;

  const titleSpans = lines
    .map(
      (line, index) =>
        `<text x="${MARGIN}" y="${firstBaseline + index * TITLE_LINE_HEIGHT}" font-family="${OG_IMAGE_FONT}" font-size="${TITLE_FONT_SIZE}" fill="${BRAND.TEXT}">${escapeHtml(line)}</text>`
    )
    .join('\n  ');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_IMAGE_SIZE.WIDTH}" height="${OG_IMAGE_SIZE.HEIGHT}" viewBox="0 0 ${OG_IMAGE_SIZE.WIDTH} ${OG_IMAGE_SIZE.HEIGHT}">
  <rect width="100%" height="100%" fill="${BRAND.BACKGROUND}"/>
  <rect x="0" y="0" width="14" height="${OG_IMAGE_SIZE.HEIGHT}" fill="${BRAND.ACCENT}"/>
  ${titleSpans}
  <text x="${MARGIN}" y="${OG_IMAGE_SIZE.HEIGHT - MARGIN}" font-family="${OG_IMAGE_FONT}" font-size="30" fill="${BRAND.ACCENT}">${escapeHtml(BLOG_AUTHOR.NAME)}</text>
  <text x="${OG_IMAGE_SIZE.WIDTH - MARGIN}" y="${OG_IMAGE_SIZE.HEIGHT - MARGIN}" text-anchor="end" font-family="${OG_IMAGE_FONT}" font-size="30" fill="${BRAND.TEXT}" opacity="0.65">${escapeHtml(BLOG_PUBLISHER.NAME)}</text>
</svg>`;
}

let rendererChecked = false;
let rendererAvailable = false;

function canRender(): boolean {
  if (rendererChecked) return rendererAvailable;
  rendererChecked = true;
  try {
    execFileSync(RENDERER, ['--version'], { stdio: 'ignore' });
    rendererAvailable = true;
  } catch {
    console.warn(
      `  ! ${RENDERER} not found — link previews will fall back to the site logo.\n` +
        `    Install it with: brew install librsvg`
    );
    rendererAvailable = false;
  }
  return rendererAvailable;
}

/**
 * Returns the absolute URL of the preview image for a post. A frontmatter
 * `ogImage` always wins; otherwise one is rendered from the title.
 */
export function generateOgImage(slug: string, title: string, override: string | null): string {
  if (override !== null) {
    return override.startsWith('http') ? override : `${SITE_URL}${override}`;
  }
  if (!canRender()) {
    return `${SITE_URL}${BLOG_PUBLISHER.LOGO_URL}`;
  }

  mkdirSync(BLOG_PATHS.OG_OUTPUT, { recursive: true });
  const svgPath = join(BLOG_PATHS.OG_OUTPUT, `${slug}.svg`);
  const pngPath = join(BLOG_PATHS.OG_OUTPUT, `${slug}.png`);

  writeFileSync(svgPath, buildSvg(title), 'utf8');
  execFileSync(RENDERER, [svgPath, '-o', pngPath, '-w', String(OG_IMAGE_SIZE.WIDTH)]);
  unlinkSync(svgPath); // Only the PNG ships; crawlers do not render SVG previews.

  return `${SITE_URL}${BLOG_URLS.OG_DIRECTORY}/${slug}.png`;
}
