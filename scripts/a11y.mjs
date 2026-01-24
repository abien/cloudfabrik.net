import pa11y from 'pa11y';

const origin = process.env.A11Y_ORIGIN ?? 'http://localhost:4321';

const targets = [
  { name: 'Home', path: '/' },
  { name: 'Archive', path: '/archive' },
  { name: 'Sample article', path: '/til/2025-03-31-vscode-und-copilot/' }
];

function formatIssue(issue) {
  return `- [${issue.type}] ${issue.message} (${issue.selector})`;
}

async function runTarget(target) {
  const url = new URL(target.path, origin).toString();
  console.log(`\nChecking ${target.name}: ${url}`);
  const result = await pa11y(url, {
    standard: 'WCAG2AA',
    chromeLaunchConfig: { headless: true }
  });

  if (!result.issues.length) {
    console.log('No issues found');
    return;
  }

  console.log(`Found ${result.issues.length} issue(s):`);
  result.issues.forEach((issue) => console.log(formatIssue(issue)));
}

async function main() {
  for (const target of targets) {
    await runTarget(target);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
