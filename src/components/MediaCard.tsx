import { Link } from 'react-router-dom';
import { MediaItem } from '@/types/media';
import { getInitials, formatRuntime } from '@/lib/mediaLoader';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface MediaCardProps {
  item: MediaItem;
}

export function MediaCard({ item }: MediaCardProps) {
  const posterUrl = item.sources.poster_image;
  const year = 
    'year_released' in item ? item.year_released :
    'years_aired' in item ? item.years_aired :
    'year_broadcast' in item ? item.year_broadcast :
    'year_composed' in item ? item.year_composed : null;

  const runtime = 
    'runtime_minutes' in item ? item.runtime_minutes : null;

  return (
    <Link to={`/${item.category}/${item.slug}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
        <div className="aspect-[2/3] overflow-hidden bg-muted relative">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
              <span className="text-6xl font-bold text-primary opacity-50">
                {getInitials(item.title)}
              </span>
            </div>
          )}
          {runtime && (
            <div className="absolute top-2 right-2 bg-background/90 backdrop-blur px-2 py-1 rounded text-xs font-medium">
              {formatRuntime(runtime)}
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold line-clamp-2 mb-1 group-hover:text-primary transition-colors">
            {item.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            {year || 'Date unknown'}
          </p>
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
