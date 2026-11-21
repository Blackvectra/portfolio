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
    // Optional shorter text for the meta description (about 155 characters).
    // The summary is used when it is absent.
    description: z.string().max(160).optional(),
    status: z.enum(['draft', 'published']),
    // case-study: a sanitized write-up with no public repository. It must
    // carry no client or employer identifiers (see docs/decisions/0001).
    kind: z.enum(['article', 'case-study']).default('article'),
  }),
});

export const collections = { writing };
