import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const allTils = await getCollection('til', ({ data }) => {
    return data.draft !== true;
  });

  const sortedTils = allTils.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: 'cloudfabrik.net - TIL',
    description: 'Today I Learned - Technische Erkenntnisse und Best Practices',
    site: context.site || 'https://cloudfabrik.net',
    items: sortedTils.map((til) => ({
      title: til.data.title,
      description: til.data.description,
      link: `/til/${til.id}/`,
      pubDate: til.data.pubDate,
      categories: [til.data.category, ...til.data.tags],
    })),
    customData: '<language>de-de</language>',
  });
}
