import { readdirSync, readFileSync } from 'fs';
import { join, basename } from 'path';
import matter from 'gray-matter';
import { BLOG_PATHS, WORDS_READ_PER_MINUTE } from '../../src/config/blog';
import { renderMarkdown } from './markdown';

export interface PostFrontmatter {
  readonly title: string;
  readonly description: string;
  readonly date: string;
  readonly tags: readonly string[];
  readonly draft: boolean;
  readonly ogImage: string | null;
}

export interface Post extends PostFrontmatter {
  readonly slug: string;
  readonly html: string;
  readonly readingMinutes: number;
}

/**
 * `date: 2026-08-14` in YAML parses to a Date; a quoted date stays a string.
 * Both are accepted so a post never fails to build over its own quoting.
 */
function toIsoDate(value: unknown, slug: string): string {
  const parsed = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Post "${slug}" has an unreadable date: ${String(value)}`);
  }
  const iso = parsed.toISOString().split('T')[0];
  if (iso === undefined) {
    throw new Error(`Post "${slug}" produced an empty date`);
  }
  return iso;
}

function requireString(value: unknown, field: string, slug: string): string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Post "${slug}" is missing required frontmatter field: ${field}`);
  }
  return value.trim();
}

function readTags(value: unknown): readonly string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((tag): tag is string => typeof tag === 'string');
}

function countWords(markdown: string): number {
  return markdown.split(/\s+/).filter((word) => word.length > 0).length;
}

async function readPost(filePath: string): Promise<Post> {
  const slug = basename(filePath, '.md');
  const { data, content } = matter(readFileSync(filePath, 'utf8'));

  const ogImage = data.ogImage;

  return {
    slug,
    title: requireString(data.title, 'title', slug),
    description: requireString(data.description, 'description', slug),
    date: toIsoDate(data.date, slug),
    tags: readTags(data.tags),
    draft: data.draft === true,
    ogImage: typeof ogImage === 'string' && ogImage.trim() !== '' ? ogImage.trim() : null,
    html: await renderMarkdown(content, slug),
    readingMinutes: Math.max(1, Math.round(countWords(content) / WORDS_READ_PER_MINUTE)),
  };
}

/** Newest first, which is the order both the index and the feed want. */
export async function loadPosts(includeDrafts: boolean): Promise<readonly Post[]> {
  const files = readdirSync(BLOG_PATHS.CONTENT)
    .filter((name) => name.endsWith('.md'))
    .map((name) => join(BLOG_PATHS.CONTENT, name));

  const posts = await Promise.all(files.map(readPost));

  return posts
    .filter((post) => includeDrafts || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}
