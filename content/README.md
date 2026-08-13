# Writing and publishing

Posts are Markdown files in `content/posts/`. The build turns each one into a real HTML page in
`dist/blog/<slug>/index.html` — full text and preview tags in the served HTML, so crawlers and link
previews see the post rather than an empty React shell.

## Publishing a post

```bash
npm run blog:new "The post I have been putting off"   # creates content/posts/the-post-....md
npm run blog:preview                                   # builds with drafts, serves on :3000
# remove `draft: true`
./deploy.sh
```

That is the whole loop. `blog:preview` is the only command with drafts turned on; `./deploy.sh`
never publishes one.

## Frontmatter

```yaml
---
title: 'Sentence case, no trailing full stop'
description: 'One sentence. It is the link preview and the search result.'
date: 2026-08-14
tags: [ai, tooling]
draft: true
ogImage: /assets/og/custom.png # optional; one is generated from the title otherwise
---
```

`title`, `description` and `date` are required and the build fails without them, because a post
missing a description ships a blank link preview and nobody notices until it is on LinkedIn.

## Before you share the link

The preview image and tags are worth thirty seconds of checking, once, per post:

```bash
curl -A "LinkedInBot/1.0" https://novada.be/blog/<slug>/ | grep 'og:'
```

Then paste the URL into LinkedIn's Post Inspector, which forces a re-crawl. LinkedIn caches
previews for around a week, so a wrong image fixed after sharing stays wrong on the post you already
published.

## Conventions worth keeping

- **URLs never change.** `/blog/<slug>/` has no date in it, so a post from last year does not look
  stale, and the slug is the filename. Renaming a file breaks every existing link to it.
- **Descriptions are written for the click.** It is the only sentence most people read.
- **Ship while still slightly unhappy with it.** The alternative is a folder of drafts, which is
  how most engineering blogs die.

## What the build emits

| Output | Purpose |
|---|---|
| `dist/blog/<slug>/index.html` | The post, with OG tags and `BlogPosting` structured data |
| `dist/blog/index.html` | The listing |
| `dist/blog/rss.xml` | Full-text feed — what aggregators and newsletters read |
| `dist/sitemap.xml` | Published posts only |
| `dist/assets/og/<slug>.png` | 1200×630 link preview, rendered from the title |
| `dist/assets/blog.css` | `fonts.css` + `theme.css` + `blog.css`, concatenated |

Preview images need `rsvg-convert` (`brew install librsvg`). Without it the build still succeeds and
falls back to the site logo, with a warning.
