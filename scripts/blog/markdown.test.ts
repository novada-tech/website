import { describe, it, expect } from 'vitest';
import { renderMarkdown } from './markdown';
import { escapeHtml, postUrl } from './templates';

describe('renderMarkdown', () => {
  it('highlights a fenced block with both themes so it works in light and dark', async () => {
    const html = await renderMarkdown('```ts\nconst a = 1;\n```', 'test');

    expect(html).toContain('--shiki-light');
    expect(html).toContain('--shiki-dark');
  });

  it('falls back to plain text instead of failing the build on an unknown language', async () => {
    const html = await renderMarkdown('```not-a-language\nx\n```', 'test');

    expect(html).toContain('shiki');
    expect(html).toContain('x');
  });

  it('restores characters markdown-it escaped, so code is not double-encoded', async () => {
    const html = await renderMarkdown('```ts\nconst a: Array<string> = [];\n```', 'test');

    expect(html).not.toContain('&amp;lt;');
  });

  it('highlights a fence nested in a list', async () => {
    const html = await renderMarkdown('- step\n\n  ```bash\n  ls\n  ```\n', 'test');

    expect(html).toContain('--shiki-light');
  });
});

describe('escapeHtml', () => {
  it('escapes characters that would break out of an attribute', () => {
    expect(escapeHtml('a "b" <c> & d')).toBe('a &quot;b&quot; &lt;c&gt; &amp; d');
  });
});

describe('postUrl', () => {
  it('is absolute and ends in a slash, matching the canonical tag', () => {
    expect(postUrl('a-post')).toBe('https://novada.be/blog/a-post/');
  });
});
