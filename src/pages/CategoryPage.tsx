import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { MediaGrid } from '@/components/MediaGrid';
import { SEO } from '@/components/SEO';
import { loadMediaData, searchMedia } from '@/lib/mediaLoader';
import { MediaItem, MediaCategory } from '@/types/media';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { SlidersHorizontal, X } from 'lucide-react';

type SortOption = 'title-asc' | 'title-desc' | 'year-desc' | 'year-asc';

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [items, setItems] = useState<MediaItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('title-asc');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);

  useEffect(() => {
    if (category) {
      loadMediaData(category as MediaCategory).then(data => {
        if (data) {
          setItems(data.items);
          setFilteredItems(data.items);
          setGeneratedAt(data.generated_at);
        }
        setLoading(false);
      });
    }
  }, [category]);

  useEffect(() => {
    let result = [...items];

    // Search filter
    if (searchQuery) {
      result = searchMedia(result, searchQuery);
    }

    // Tag filter
    if (selectedTags.length > 0) {
      result = result.filter(item =>
        selectedTags.some(tag => item.tags.includes(tag))
      );
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'year-desc':
        case 'year-asc': {
          const yearA = 'year_released' in a ? a.year_released :
                       'year_broadcast' in a ? a.year_broadcast :
                       'year_composed' in a ? a.year_composed : 0;
          const yearB = 'year_released' in b ? b.year_released :
                       'year_broadcast' in b ? b.year_broadcast :
                       'year_composed' in b ? b.year_composed : 0;
          return sortBy === 'year-desc' ? (yearB || 0) - (yearA || 0) : (yearA || 0) - (yearB || 0);
        }
        default:
          return 0;
      }
    });

    setFilteredItems(result);
  }, [items, searchQuery, sortBy, selectedTags]);

  const allTags = Array.from(new Set(items.flatMap(item => item.tags))).sort();

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const categoryLabels: Record<string, string> = {
    movies: 'Classic Movies',
    tv: 'Classic TV Shows',
    radio: 'Classic Radio Shows',
    concerts: 'Classical Concerts'
  };

  return (
    <Layout>
      <SEO
        title={categoryLabels[category || ''] || 'Media'}
        description={`Browse our collection of ${categoryLabels[category || '']?.toLowerCase() || 'media'} from the golden era.`}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{categoryLabels[category || '']}</h1>
          <p className="text-muted-foreground">
            {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
            {generatedAt && ` • Updated ${new Date(generatedAt).toLocaleDateString()}`}
          </p>
        </div>

        {/* Filters & Sort Bar */}
        <div className="mb-6 space-y-4">
          <div className="flex gap-4 flex-wrap">
            <Input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="max-w-xs"
            />
            <Select value={sortBy} onValueChange={v => setSortBy(v as SortOption)}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title-asc">Title A-Z</SelectItem>
                <SelectItem value="title-desc">Title Z-A</SelectItem>
                <SelectItem value="year-desc">Newest First</SelectItem>
                <SelectItem value="year-asc">Oldest First</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {selectedTags.length > 0 && (
                <Badge variant="secondary">{selectedTags.length}</Badge>
              )}
            </Button>
          </div>

          {/* Tag Filters */}
          {showFilters && allTags.length > 0 && (
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Filter by Tags</h3>
                {selectedTags.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedTags([])}
                  >
                    Clear All
                  </Button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                    className="cursor-pointer hover:bg-primary/10"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                    {selectedTags.includes(tag) && (
                      <X className="w-3 h-3 ml-1" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Active Filters */}
          {selectedTags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {selectedTags.map(tag => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  {tag}
                  <button onClick={() => toggleTag(tag)} className="hover:text-destructive">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Ad Placeholder: Sidebar (Desktop) */}
        <div className="hidden lg:block fixed right-4 top-32 w-64 ad-sidebar bg-muted/50 border border-border rounded p-4">
          <p className="text-xs text-muted-foreground text-center">Ad: Sidebar (300x600)</p>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        ) : (
          <MediaGrid items={filteredItems} />
        )}
      </div>
    </Layout>
  );
}
