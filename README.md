# BoomerPlus - Classic Public Domain Media Streaming

A fast, accessible streaming catalog showcasing public-domain media from the baby-boomer era.

## Features

- 📺 Stream classic movies, TV shows, radio programs, and concerts
- 🎨 Retro-inspired design with modern UX
- 🔍 Global search and category filtering
- 📱 Fully responsive and accessible
- 🎯 Internet Archive integration with auto-embedding
- 🔖 SEO-optimized with schema.org markup
- 💬 Comment system integration ready
- 📊 Ad placement support

## Data Structure

Place JSON data files in `./data/`:
- `movies.full.json`
- `tvshows.full.json`
- `radioshows.full.json`
- `concerts.full.json`

Future support for:
- `commercials.full.json`
- `images.full.json`

Each JSON follows this schema:
```json
{
  "version": 1,
  "generated_at": "ISO8601 | null",
  "items": [...]
}
```

## Configuration

### Ad Integration
Update ad placeholders in `Layout.tsx` and page components:
- Leaderboard: Top of page (728x90)
- Sidebar: Desktop right column (300x600)
- In-content: Below media player
- Footer: Above footer links

To enable AdSense:
1. Add your AdSense client ID and slot IDs
2. Replace placeholder divs with actual ad code
3. Ensure proper noscript fallbacks

### Comment System
The site includes placeholder for Giscus comments. To enable:
1. Set up Giscus on your GitHub repo
2. Update the comment placeholder in `ItemPage.tsx`
3. Add Giscus configuration

### Site Settings
Key configuration variables to customize:
- Brand name and logo (in `Layout.tsx`)
- Primary/secondary colors (in `index.css`)
- Data directory path (default: `./data`)
- AdSense IDs
- Comment system on/off

## Development

```sh
npm install
npm run dev
```

## Deployment

```sh
npm run build
```

The site is optimized for static hosting. All data is loaded client-side from JSON files in the `/data` directory.

## SEO & Performance

- Semantic HTML with proper heading hierarchy
- Meta tags and OpenGraph/Twitter cards
- Schema.org structured data for media items
- Image lazy loading
- Responsive design
- Core Web Vitals optimized

## Public Domain Compliance

All media items include:
- PD audit information
- License status flags
- Verification notes
- Clear attribution to Internet Archive sources

## Browser Support

Modern browsers with ES6+ support:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

## License

MIT License - See LICENSE file

## Data Sources

All content is sourced from Internet Archive and verified for public domain status.
