#!/usr/bin/env node

/**
 * Script to scrape GitHub star lists and save them to a config file
 * Usage: npm run sync-github-stars
 * 
 * Requires: Playwright (already in devDependencies for Astro)
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configDir = path.join(__dirname, '..', 'src', 'config');
const configFile = path.join(configDir, 'github-stars-config.json');

async function scrapeStarList(username = 'abien', listName = 'ai-ml') {
  let browser;
  try {
    console.log(`📚 Scraping GitHub star list: ${username}/lists/${listName}`);

    browser = await chromium.launch();
    const page = await browser.newPage();

    const url = `https://github.com/stars/${username}/lists/${listName}`;
    console.log(`🌐 Loading: ${url}`);

    await page.goto(url, { waitUntil: 'networkidle' });

    // Extract repo links from the page
    const repos = await page.evaluate(() => {
      const repoElements = document.querySelectorAll('a[href*="/"][href*="/"]');
      const repoSet = new Set();

      repoElements.forEach(el => {
        const href = el.getAttribute('href');
        if (href) {
          // Match pattern: /owner/repo (but not /owner/repo/something)
          const match = href.match(/^\/([a-zA-Z0-9._-]+\/[a-zA-Z0-9._-]+)$/);
          if (match) {
            const fullName = match[1];
            // Filter out non-repo links
            if (
              !fullName.includes('?') &&
              !fullName.includes('pull') &&
              !fullName.includes('issues')
            ) {
              repoSet.add(fullName);
            }
          }
        }
      });

      return Array.from(repoSet);
    });

    if (repos.length === 0) {
      console.warn('⚠️  No repositories found on the page');
      return null;
    }

    console.log(`✅ Found ${repos.length} repositories`);

    // Save config
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }

    const config = { repos, lastUpdated: new Date().toISOString() };
    fs.writeFileSync(configFile, JSON.stringify(config, null, 2));

    console.log(`💾 Saved to: ${configFile}`);
    console.log('\nRepositories:');
    repos.forEach((repo, i) => console.log(`  ${i + 1}. ${repo}`));

    return repos;
  } catch (error) {
    console.error('❌ Error scraping star list:', error.message);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run the script
scrapeStarList();
