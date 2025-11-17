import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { MediaGrid } from '@/components/MediaGrid';
import { SEO } from '@/components/SEO';
import { loadAllMedia, searchMedia } from '@/lib/mediaLoader';
import { MediaItem } from '@/types/media';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [allResults, setAllResults] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllMedia().then(dataMap => {
      const allItems: MediaItem[] = [];
      dataMap.forEach(dataset => {
        allItems.push(...dataset.items);
      });
      
      if (query) {
        setAllResults(searchMedia(allItems, query));
      } else {
        setAllResults([]);
      }
      setLoading(false);
    });
  }, [query]);

  const movieResults = allResults.filter(item => item.category === 'movies');
  const tvResults = allResults.filter(item => item.category === 'tv');
  const radioResults = allResults.filter(item => item.category === 'radio');
  const concertResults = allResults.filter(item => item.category === 'concerts');

  return (
    <Layout>
      <SEO
        title={`Search: ${query}`}
        description={`Search results for "${query}"`}
      />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-2">Search Results</h1>
        <p className="text-muted-foreground mb-8">
          Found {allResults.length} results for "{query}"
        </p>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Searching...</p>
          </div>
        ) : allResults.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No results found. Try a different search term.</p>
          </div>
        ) : (
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All ({allResults.length})</TabsTrigger>
              {movieResults.length > 0 && (
                <TabsTrigger value="movies">Movies ({movieResults.length})</TabsTrigger>
              )}
              {tvResults.length > 0 && (
                <TabsTrigger value="tv">TV ({tvResults.length})</TabsTrigger>
              )}
              {radioResults.length > 0 && (
                <TabsTrigger value="radio">Radio ({radioResults.length})</TabsTrigger>
              )}
              {concertResults.length > 0 && (
                <TabsTrigger value="concerts">Concerts ({concertResults.length})</TabsTrigger>
              )}
            </TabsList>

            <div className="mt-6">
              <TabsContent value="all">
                <MediaGrid items={allResults} />
              </TabsContent>
              <TabsContent value="movies">
                <MediaGrid items={movieResults} />
              </TabsContent>
              <TabsContent value="tv">
                <MediaGrid items={tvResults} />
              </TabsContent>
              <TabsContent value="radio">
                <MediaGrid items={radioResults} />
              </TabsContent>
              <TabsContent value="concerts">
                <MediaGrid items={concertResults} />
              </TabsContent>
            </div>
          </Tabs>
        )}
      </div>
    </Layout>
  );
}
