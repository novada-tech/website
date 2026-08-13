import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { BLOG_PATHS } from '../src/config/blog';

function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function template(title: string, date: string): string {
  return `---
title: '${title.replace(/'/g, "''")}'
description: 'One sentence. It is what shows up in the link preview and in search results, so write it for someone deciding whether to click.'
date: ${date}
tags: []
draft: true
---

Open with the thing the reader gets. Not the backstory.
`;
}

const title = process.argv.slice(2).join(' ').trim();

if (title === '') {
  console.error('Usage: npm run blog:new "Your post title"');
  process.exit(1);
}

const slug = slugify(title);
const path = join(BLOG_PATHS.CONTENT, `${slug}.md`);

if (existsSync(path)) {
  console.error(`${path} already exists.`);
  process.exit(1);
}

const today = new Date().toISOString().split('T')[0] ?? '';

mkdirSync(BLOG_PATHS.CONTENT, { recursive: true });
writeFileSync(path, template(title, today), 'utf8');

console.log(`Created ${path}

  1. Write it.
  2. Preview:  npm run blog:preview
  3. Publish:  remove "draft: true", then ./deploy.sh`);
