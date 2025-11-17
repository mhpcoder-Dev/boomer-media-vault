import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  schemaData?: object;
}

export function SEO({ 
  title = 'BoomerPlus - Classic Public Domain Media',
  description = 'Stream classic public domain movies, TV shows, radio programs, and concerts from the golden era of entertainment.',
  image = '/opengraph-default.png',
  type = 'website',
  schemaData
}: SEOProps) {
  const fullTitle = title.includes('BoomerPlus') ? title : `${title} | BoomerPlus`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* OpenGraph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Schema.org */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
}
