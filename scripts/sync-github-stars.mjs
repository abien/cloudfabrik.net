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

    // Extract repo links from the star list container (preserves "recently starred" order)
    const repos = await page.evaluate(() => {
      const repoLinks = document.querySelectorAll(
        '#user-list-repositories > div.d-block div.d-inline-block.mb-1 > a'
      );
      const repoSet = new Set();

      repoLinks.forEach(el => {
        const href = el.getAttribute('href');
        if (href) {
          const match = href.match(/^\/([a-zA-Z0-9._-]+\/[a-zA-Z0-9._-]+)$/);
          if (match) {
            repoSet.add(match[1]);
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
    console.warn('⚠️  Using cached config (if available)');
    process.exit(0); // Exit gracefully - build continues with cached config
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run the script
scrapeStarList();
