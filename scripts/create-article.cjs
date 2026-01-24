#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const cp = require('child_process');

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

function tryOpenInVSCode(filepath) {
  const cmds = process.platform === 'win32' ? ['code.cmd', 'code'] : ['code'];
  for (const cmd of cmds) {
    try {
      const res = cp.spawnSync(cmd, ['-r', filepath], {
        stdio: 'ignore',
      });
      if (typeof res.status === 'number' && res.status === 0) {
        console.log('🟢 Opened in VS Code');
        return true;
      }
    } catch {
      // ignore and try next
    }
  }
  console.log('ℹ️ Could not auto-open. Open the file manually in VS Code.');
  return false;
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
  const category = CATEGORIES[parseInt(categoryIdx, 10) - 1];

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

  if (!fs.existsSync(TIL_DIR)) {
    fs.mkdirSync(TIL_DIR, { recursive: true });
  }

  if (fs.existsSync(filepath)) {
    console.log(`\n❌ File already exists: ${filename}`);
    rl.close();
    process.exit(1);
  }

  const frontmatter = `---\n` +
    `title: "${title.replace(/"/g, '\\"')}"\n` +
    `description: "${description.replace(/"/g, '\\"')}"\n` +
    `pubDate: ${today}\n` +
    `category: "${category}"\n` +
    `tags: [${tags.join(', ')}]\n` +
    `draft: false\n` +
    `---\n\n` +
    `# ${title}\n\n` +
    `Your content here...\n`;

  fs.writeFileSync(filepath, frontmatter, 'utf-8');
  console.log(`\n✅ Created: ${filename}`);
  console.log(`📂 Path: ${filepath}`);

  rl.close();

  tryOpenInVSCode(filepath);
}

main().catch((err) => {
  console.error('❌ Error:', err && err.message ? err.message : String(err));
  try { rl.close(); } catch {}
  process.exit(1);
});
