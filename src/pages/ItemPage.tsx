import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { MediaPlayer } from '@/components/MediaPlayer';
import { SEO } from '@/components/SEO';
import { loadMediaData, formatRuntime } from '@/lib/mediaLoader';
import { MediaItem } from '@/types/media';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Share2, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

export default function ItemPage() {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const [item, setItem] = useState<MediaItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (category && slug) {
      loadMediaData(category as any).then(data => {
        if (data) {
          const found = data.items.find(i => i.slug === slug);
          setItem(found || null);
        }
        setLoading(false);
      });
    }
  }, [category, slug]);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: item?.title, url });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!item) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Item Not Found</h1>
          <Button asChild>
            <Link to={`/${category}`}>Back to {category}</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const year =
    'year_released' in item ? item.year_released :
    'years_aired' in item ? item.years_aired :
    'year_broadcast' in item ? item.year_broadcast :
    'year_composed' in item ? item.year_composed : null;

  const runtime = 'runtime_minutes' in item ? item.runtime_minutes : null;
  const country = 'country' in item ? item.country : null;


  return (
    <Layout>
      <SEO
        title={item.title}
        description={item.description}
        image={item.sources.poster_image}
        type="video.other"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <MediaPlayer sources={item.sources} title={item.title} />

            {/* Ad Placeholder: Below Player */}
            <div className="ad-in-content bg-muted/50 border border-border rounded p-4">
              <p className="text-xs text-muted-foreground text-center">Ad: In-Content (728x90)</p>
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{item.title}</h1>
              <p className="text-foreground/80 leading-relaxed">{item.description}</p>
            </div>

            {/* Metadata Note */}
            {item.sources.metadata_note && (
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    Source Notes
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm">{item.sources.metadata_note}</p>
                </CollapsibleContent>
              </Collapsible>
            )}


            {/* Comments Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Comments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Comments are powered by Giscus. Enable in site settings to activate.
                </p>
                <div className="p-8 bg-muted/50 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground">Comment widget placeholder</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Poster */}
            {item.sources.poster_image && (
              <div className="aspect-[2/3] rounded-lg overflow-hidden">
                <img
                  src={item.sources.poster_image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Metadata Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {year && (
                  <div>
                    <span className="font-semibold">Year:</span> {year}
                  </div>
                )}
                {country && (
                  <div>
                    <span className="font-semibold">Country:</span> {country}
                  </div>
                )}
                {runtime && (
                  <div>
                    <span className="font-semibold">Runtime:</span> {formatRuntime(runtime)}
                  </div>
                )}
                {'composer_or_artist' in item && item.composer_or_artist && (
                  <div>
                    <span className="font-semibold">Artist:</span> {item.composer_or_artist}
                  </div>
                )}
                {'speaker_or_host' in item && item.speaker_or_host && (
                  <div>
                    <span className="font-semibold">Host:</span> {item.speaker_or_host}
                  </div>
                )}
                {'work_type' in item && item.work_type && (
                  <div>
                    <span className="font-semibold">Type:</span> {item.work_type}
                  </div>
                )}
                {'instrumentation' in item && item.instrumentation && item.instrumentation.length > 0 && (
                  <div>
                    <span className="font-semibold">Instrumentation:</span> {item.instrumentation.join(', ')}
                  </div>
                )}
              </CardContent>
            </Card>


            {/* Tags */}
            {item.tags.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                      <Link key={tag} to={`/${category}`}>
                        <Badge variant="outline" className="hover:bg-primary/10 cursor-pointer">
                          {tag}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Share */}
            <Button onClick={handleShare} variant="outline" className="w-full gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </Button>


            {/* Ad Placeholder: Sidebar */}
            <div className="ad-sidebar bg-muted/50 border border-border rounded p-4 sticky top-4">
              <p className="text-xs text-muted-foreground text-center">Ad: Sidebar (300x250)</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
