/**
 * Returns a relative time string (e.g., "2h ago", "3d ago")
 */
export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);

  if (diffMinutes < 1) {
    return 'just now';
  } else if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  } else if (diffHours < 24) {
    return `${diffHours}h ago`;
  } else if (diffDays < 7) {
    return `${diffDays}d ago`;
  } else if (diffWeeks < 4) {
    return `${diffWeeks}w ago`;
  } else {
    return `${diffMonths}mo ago`;
  }
}

/**
 * Formats date as ISO string (e.g., "2026-01-24")
 */
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Formats date for display (e.g., "Jan 24, 2026")
 */
export function formatDateDisplay(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Returns current build time as ISO string
 */
export function getBuildTime(): string {
  return new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
}
