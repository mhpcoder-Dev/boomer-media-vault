import { MediaSource } from '@/types/media';
import { extractIAIdentifier, getIAEmbedUrl, isIASearchUrl } from '@/lib/mediaLoader';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface MediaPlayerProps {
  sources: MediaSource;
  title: string;
}

export function MediaPlayer({ sources, title }: MediaPlayerProps) {
  const primarySource = sources.video_primary || sources.audio_primary;
  const backupSource = sources.video_backup || sources.audio_backup;
  const isAudio = !!sources.audio_primary;

  if (!primarySource) {
    return (
      <div className="w-full aspect-video bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">No media source available</p>
      </div>
    );
  }

  // Check if it's an IA details URL that can be embedded
  const iaIdentifier = extractIAIdentifier(primarySource);
  if (iaIdentifier) {
    const embedUrl = getIAEmbedUrl(iaIdentifier);
    return (
      <div className="space-y-4">
        <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
          <iframe
            src={embedUrl}
            className="w-full h-full"
            frameBorder="0"
            allowFullScreen
            allow="fullscreen"
            title={title}
          />
        </div>
      </div>
    );
  }

  // If it's an IA search URL
  if (isIASearchUrl(primarySource)) {
    return (
      <div className="space-y-4">
        <div className="w-full aspect-video bg-muted rounded-lg flex items-center justify-center p-8">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              This content is available on Internet Archive
            </p>
            <Button asChild>
              <a href={primarySource} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                View on Internet Archive
              </a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Direct file URL - use HTML5 player
  const isVideo = primarySource.match(/\.(mp4|webm|ogg)$/i);
  const isAudioFile = primarySource.match(/\.(mp3|wav|ogg|m4a)$/i);

  if (isVideo || (isAudio && isAudioFile)) {
    return (
      <div className="space-y-4">
        {isVideo ? (
          <video
            controls
            className="w-full aspect-video bg-black rounded-lg"
            src={primarySource}
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <audio
            controls
            className="w-full"
            src={primarySource}
          >
            Your browser does not support the audio tag.
          </audio>
        )}
      </div>
    );
  }

  // Fallback: just show link
  return (
    <div className="w-full aspect-video bg-muted rounded-lg flex items-center justify-center p-8">
      <div className="text-center">
        <p className="text-muted-foreground mb-4">Media available at external source</p>
        <Button asChild>
          <a href={primarySource} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4 mr-2" />
            Open Media Source
          </a>
        </Button>
      </div>
    </div>
  );
}
