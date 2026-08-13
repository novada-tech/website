---
title: 'Template and styling reference'
description: 'A draft that exercises every element the blog can render. Delete it once you have your own posts.'
date: 2026-08-14
tags: [meta]
draft: true
---

This post never publishes — `draft: true` keeps it out of `dist/`, the feed and the sitemap unless
you build with `BLOG_DRAFTS=1`. It exists so you can see what every element looks like before you
need it. Delete it whenever you like.

Open with the thing the reader gets. The first sentence decides whether they read the second, and
"in this post I want to explore" is not it.

## A second-level heading

Body text runs to a 720px column, which lands around 70 characters — the width the site already uses
for its prose sections. Links look [like this](https://novada.be), and `inline code` looks like that.

### A third-level heading

- A list item.
- Another one, long enough to wrap so you can check the line height and the hanging indent behave
  the way you expect them to on a narrow screen.

> A blockquote, for when you are quoting someone else and want it to be visibly not your own voice.

## Code

Fenced blocks are highlighted at build time by Shiki, in both themes, with no JavaScript shipped to
the reader:

```typescript
export async function renderMarkdown(source: string, slug: string): Promise<string> {
  const rendered = markdown.render(source);
  return highlightCodeBlocks(rendered, slug);
}
```

Shell commands are worth putting in their own block so they can be copied:

```bash
npm run blog:new "The post I have been putting off"
```

An unknown language falls back to plain text and prints a warning during the build rather than
failing it.

## Tables

| Thing | Where it lives |
|---|---|
| Post source | `content/posts/<slug>.md` |
| Generated page | `dist/blog/<slug>/index.html` |
| Feed | `dist/blog/rss.xml` |
| Preview image | `dist/assets/og/<slug>.png` |

Wide tables scroll inside their own box instead of widening the page.

---

That is everything. If you need an element that is not here, add it to this file first so the CSS
gets checked once rather than discovered mid-post.
