/**
 * Calculate estimated reading time from markdown or plain text content
 * Uses 200 words per minute as the standard reading speed
 */
export function calculateReadingTime(content: string): number {
  // Remove markdown syntax while preserving text
  const plainText = content
    .replace(/^#+\s/gm, '')           // Remove headings
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Extract link text
    .replace(/[*_`~\-\[\](){}#]/g, '') // Remove markdown special chars
    .replace(/\n+/g, ' ')              // Replace newlines with spaces
    .trim();
  
  // Count words
  const wordCount = plainText
    .split(/\s+/)
    .filter(word => word.length > 0).length;
  
  // Calculate reading time in minutes (200 WPM)
  const readingTime = Math.ceil(wordCount / 200);
  
  // Return at least 1 minute
  return Math.max(1, readingTime);
}

/**
 * Format reading time as a display string
 */
export function formatReadingTime(minutes: number): string {
  return `~${minutes} min read`;
}
