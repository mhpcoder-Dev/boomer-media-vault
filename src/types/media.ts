export type MediaCategory = 'movies' | 'tv' | 'radio' | 'concerts' | 'commercials' | 'images';

export interface MediaSource {
  video_primary?: string;
  video_backup?: string;
  audio_primary?: string;
  audio_backup?: string;
  poster_image?: string;
  metadata_note?: string;
}

export interface License {
  film_pd?: boolean;
  broadcast_pd?: boolean;
  recording_pd?: boolean;
  work_pd?: boolean;
  license_notes?: string;
}

export interface PDaudit {
  [key: string]: any;
}

export interface Ingestion {
  fetched_at: string | null;
}

export interface BaseMediaItem {
  slug: string;
  category: MediaCategory;
  title: string;
  description: string;
  sources: MediaSource;
  license: License;
  tags: string[];
  pd_audit: PDaudit;
  ingestion: Ingestion;
}

export interface MovieItem extends BaseMediaItem {
  category: 'movies';
  year_released?: number;
  country?: string;
  runtime_minutes?: number;
  work_type?: string;
  speaker_or_host?: string;
}

export interface TVItem extends BaseMediaItem {
  category: 'tv';
  years_aired?: string;
  country?: string;
  runtime_minutes?: number;
  work_type?: string;
}

export interface RadioItem extends BaseMediaItem {
  category: 'radio';
  year_broadcast?: number;
  years?: string;
  speaker_or_host?: string;
  country?: string;
}

export interface ConcertItem extends BaseMediaItem {
  category: 'concerts';
  composer_or_artist?: string;
  year_composed?: number;
  catalog_number?: string;
  instrumentation?: string[];
}

export type MediaItem = MovieItem | TVItem | RadioItem | ConcertItem;

export interface MediaDataset {
  version: number;
  generated_at: string | null;
  items: MediaItem[];
}
