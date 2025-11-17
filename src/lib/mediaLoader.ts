import { MediaDataset, MediaItem, MediaCategory } from '@/types/media';

const DATA_PATH = '/data';

export async function loadMediaData(category: MediaCategory): Promise<MediaDataset | null> {
  try {
    const response = await fetch(`${DATA_PATH}/${category}.full.json`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error(`Failed to load ${category} data:`, error);
    return null;
  }
}

export async function loadAllMedia(): Promise<Map<MediaCategory, MediaDataset>> {
  const categories: MediaCategory[] = ['movies', 'tv', 'radio', 'concerts', 'commercials', 'images'];
  const dataMap = new Map<MediaCategory, MediaDataset>();

  await Promise.all(
    categories.map(async (category) => {
      const data = await loadMediaData(category);
      if (data) {
        dataMap.set(category, data);
      }
    })
  );

  return dataMap;
}

export function extractIAIdentifier(url: string): string | null {
  if (!url) return null;
  const detailsMatch = url.match(/archive\.org\/details\/([^/?#]+)/);
  return detailsMatch ? detailsMatch[1] : null;
}

export function getIAEmbedUrl(identifier: string): string {
  return `https://archive.org/embed/${identifier}`;
}

export function isIASearchUrl(url: string): boolean {
  return url?.includes('archive.org/search') || false;
}

export function formatRuntime(minutes?: number): string {
  if (!minutes) return '';
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

export function getInitials(title: string): string {
  return title
    .split(' ')
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase();
}

export function searchMedia(items: MediaItem[], query: string): MediaItem[] {
  const lowerQuery = query.toLowerCase();
  return items.filter(item => 
    item.title.toLowerCase().includes(lowerQuery) ||
    item.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}
