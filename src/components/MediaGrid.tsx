import { MediaItem } from '@/types/media';
import { MediaCard } from './MediaCard';

interface MediaGridProps {
  items: MediaItem[];
  title?: string;
}

export function MediaGrid({ items, title }: MediaGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No items found</p>
      </div>
    );
  }

  return (
    <div>
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {items.map(item => (
          <MediaCard key={item.slug} item={item} />
        ))}
      </div>
    </div>
  );
}
