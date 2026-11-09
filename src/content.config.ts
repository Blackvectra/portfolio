import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Writing: Markdown files in src/content/writing/.
// Entries with status "draft" are filtered out by every page that reads this
// collection (see src/lib/writing.ts), so they get no page, no index entry,
// and no sitemap entry.
const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    status: z.enum(['draft', 'published']),
  }),
});

export const collections = { writing };
