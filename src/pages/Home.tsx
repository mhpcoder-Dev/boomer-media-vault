import { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { MediaGrid } from '@/components/MediaGrid';
import { SEO } from '@/components/SEO';
import { loadAllMedia } from '@/lib/mediaLoader';
import { MediaDataset } from '@/types/media';
import { Film, Tv, Radio, Music } from 'lucide-react';

export default function Home() {
  const [datasets, setDatasets] = useState<Map<string, MediaDataset>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllMedia().then(data => {
      setDatasets(data);
      setLoading(false);
    });
  }, []);

  const getLatestItems = (category: string, count: number = 12) => {
    const dataset = datasets.get(category);
    return dataset?.items.slice(0, count) || [];
  };

  return (
    <Layout>
      <SEO />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Welcome to BoomerPlus
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-6">
              Stream classic public domain media from the golden era of entertainment
            </p>
            <p className="text-foreground/80">
              Discover hundreds of movies, TV shows, radio programs, and concerts from the 1950s-1970s,
              all legally in the public domain and free to enjoy.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Movies Section */}
        {datasets.has('movies') && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Film className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold">Classic Movies</h2>
            </div>
            <MediaGrid items={getLatestItems('movies')} />
          </section>
        )}

        {/* TV Shows Section */}
        {datasets.has('tv') && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Tv className="w-6 h-6 text-secondary" />
              </div>
              <h2 className="text-3xl font-bold">Classic TV Shows</h2>
            </div>
            <MediaGrid items={getLatestItems('tv')} />
          </section>
        )}

        {/* Radio Shows Section */}
        {datasets.has('radio') && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <Radio className="w-6 h-6 text-accent-foreground" />
              </div>
              <h2 className="text-3xl font-bold">Classic Radio</h2>
            </div>
            <MediaGrid items={getLatestItems('radio')} />
          </section>
        )}

        {/* Concerts Section */}
        {datasets.has('concerts') && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Music className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold">Classical Concerts</h2>
            </div>
            <MediaGrid items={getLatestItems('concerts')} />
          </section>
        )}

        {loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading content...</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
