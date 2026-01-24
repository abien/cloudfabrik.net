import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const til = defineCollection({
  loader: glob({ pattern: '**/*.md', base: "./src/content/til" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(['AI/ML', 'DevOps', 'Systems', 'Web', 'Infra']),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { til };
