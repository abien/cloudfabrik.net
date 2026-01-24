import pa11y from 'pa11y';

const origin = process.env.A11Y_ORIGIN ?? 'http://localhost:4321';

const targets = [
  { name: 'Home', path: '/' },
  { name: 'Archive', path: '/archive' },
  { name: 'Sample article', path: '/til/2025-03-31-vscode-und-copilot/' }
];

const modes = [
  { name: 'dark', actions: [] },
  {
    name: 'light',
    actions: [
      'click element #theme-toggle'
    ]
  }
];

function formatIssue(issue) {
  return `- [${issue.type}] ${issue.message} (${issue.selector})`;
}

async function runTarget(target, mode) {
  const url = new URL(target.path, origin).toString();
  console.log(`\nChecking ${target.name} [${mode.name}]: ${url}`);
  const result = await pa11y(url, {
    standard: 'WCAG2AA',
    chromeLaunchConfig: { headless: true },
    actions: mode.actions,
    wait: 500
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
    for (const mode of modes) {
      await runTarget(target, mode);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
