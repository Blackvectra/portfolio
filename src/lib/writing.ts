import { getCollection, type CollectionEntry } from 'astro:content';

export type WritingEntry = CollectionEntry<'writing'>;

/** Published entries only, newest first. Drafts never leave this function. */
export async function getPublishedWriting(): Promise<WritingEntry[]> {
  const entries = await getCollection('writing', ({ data }) => data.status === 'published');
  return entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function formatDate(date: Date): string {
  // Dates in frontmatter are calendar dates; format in UTC so the day does not shift.
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
