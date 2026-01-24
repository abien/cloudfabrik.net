export type Category = 'AI/ML' | 'DevOps' | 'Systems' | 'Web' | 'Infra';

/**
 * Returns the CSS class for a category badge
 */
export function getCategoryClass(category: Category): string {
  const classes: Record<Category, string> = {
    'AI/ML': 'category-ai-ml',
    'DevOps': 'category-devops',
    'Systems': 'category-systems',
    'Web': 'category-web',
    'Infra': 'category-infra',
  };
  return classes[category] || 'category-ai-ml';
}

/**
 * Returns the icon name for a category
 */
export function getCategoryIcon(category: Category): string {
  const icons: Record<Category, string> = {
    'AI/ML': 'brain',
    'DevOps': 'git-branch',
    'Systems': 'cpu',
    'Web': 'globe',
    'Infra': 'server',
  };
  return icons[category] || 'file-text';
}
