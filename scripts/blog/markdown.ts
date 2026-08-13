import MarkdownIt from 'markdown-it';
import { codeToHtml } from 'shiki';
import { CODE_THEMES } from '../../src/config/blog';

const SHIKI_OPTIONS = {
  themes: { light: CODE_THEMES.LIGHT, dark: CODE_THEMES.DARK },
  defaultColor: false,
} as const;

const PLAIN_TEXT_LANGUAGE = 'text';

/**
 * Matches the code blocks markdown-it emits. Shiki is async and markdown-it's
 * renderer is not, so highlighting happens on the rendered HTML rather than
 * through markdown-it's `highlight` hook — which also means fences nested in
 * lists and blockquotes are picked up, since markdown-it has already parsed them.
 */
const CODE_BLOCK_PATTERN = /<pre><code(?: class="language-([\w+-]+)")?>([\s\S]*?)<\/code><\/pre>/g;

const HTML_ENTITIES: Readonly<Record<string, string>> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
};

function decodeEntities(html: string): string {
  return html.replace(/&(?:amp|lt|gt|quot|#39);/g, (entity) => HTML_ENTITIES[entity] ?? entity);
}

async function highlight(code: string, language: string, slug: string): Promise<string> {
  try {
    return await codeToHtml(code, { lang: language, ...SHIKI_OPTIONS });
  } catch {
    console.warn(`  ! ${slug}: unknown code language "${language}", rendered without highlighting`);
    return codeToHtml(code, { lang: PLAIN_TEXT_LANGUAGE, ...SHIKI_OPTIONS });
  }
}

const markdown = new MarkdownIt({ html: true, linkify: true, typographer: true });

export async function renderMarkdown(source: string, slug: string): Promise<string> {
  const rendered = markdown.render(source);

  const blocks = [...rendered.matchAll(CODE_BLOCK_PATTERN)];
  const replacements = await Promise.all(
    blocks.map((block) =>
      highlight(decodeEntities(block[2] ?? '').replace(/\n$/, ''), block[1] ?? PLAIN_TEXT_LANGUAGE, slug)
    )
  );

  let index = 0;
  return rendered.replace(CODE_BLOCK_PATTERN, () => replacements[index++] ?? '');
}
