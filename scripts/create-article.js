#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const CATEGORIES = ['AI/ML', 'DevOps', 'Systems', 'Web', 'Infra'];
const TIL_DIR = path.join(__dirname, '..', 'src', 'content', 'til');

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 50);
}

function getToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

async function main() {
  console.log('\n📝 Create New TIL Article\n');

  const title = await question('Title: ');
  if (!title.trim()) {
    console.log('❌ Title is required');
    rl.close();
    process.exit(1);
  }

  console.log('\nCategory:');
  CATEGORIES.forEach((cat, i) => console.log(`  ${i + 1}. ${cat}`));
  const categoryIdx = await question('Select (1-5): ');
  const category = CATEGORIES[parseInt(categoryIdx) - 1];

  if (!category) {
    console.log('❌ Invalid category');
    rl.close();
    process.exit(1);
  }

  const description = await question('\nDescription: ');
  const tagsInput = await question('Tags (comma-separated): ');
  const tags = tagsInput
    .split(',')
    .map((t) => t.trim())
    .filter((t) => t)
    .map((t) => `"${t}"`);

  const today = getToday();
  const slug = slugify(title);
  const filename = `${today}-${slug}.md`;
  const filepath = path.join(TIL_DIR, filename);

  if (fs.existsSync(filepath)) {
    console.log(`\n❌ File already exists: ${filename}`);
    rl.close();
    process.exit(1);
  }

  const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
pubDate: ${today}
category: "${category}"
tags: [${tags.join(', ')}]
draft: false
---

# ${title}

Your content here...
`;

  fs.writeFileSync(filepath, frontmatter, 'utf-8');
  console.log(`\n✅ Created: ${filename}`);
  console.log(`📂 Path: ${filepath}`);

  rl.close();

  // Output filepath for VS Code to open
  console.log(`\nOPEN_FILE:${filepath}`);
}

main().catch((err) => {
  console.error('❌ Error:', err.message);
  rl.close();
  process.exit(1);
});
