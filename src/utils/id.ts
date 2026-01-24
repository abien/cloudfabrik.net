/**
 * Generates a hex ID based on index (e.g., "0x4F2")
 */
export function generateHexId(index: number, offset: number = 0x4F0): string {
  return `0x${(offset - index).toString(16).toUpperCase()}`;
}
