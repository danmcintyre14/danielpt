// src/lib/SEO.jsx
// React 19: head tags declared in components are hoisted into <head>

function json(textOrObj) {
  try { return typeof textOrObj === "string" ? textOrObj : JSON.stringify(textOrObj); }
  catch { return ""; }
}

/**
 * <SEO />
 * Props:
 * - title                string
 * - description          string
 * - canonical            absolute URL (https://your.site/route)
 * - robots               e.g. "index,follow" or "noindex,nofollow"
 * - image                absolute URL for og/twitter image
 * - siteName             for og:site_name
 * - type                 og:type (default "website")
 * - twitterCard          default "summary_large_image"
 * - locale               e.g. "en_GB" (optional)
 * - jsonLd               object or string (JSON-LD schema)
 * - meta                 [{ name, content }]  (extra meta)
 * - links                [{ rel, href }]      (extra link tags)
 */
export default function SEO({
  title,
  description,
  canonical,
  robots = "index,follow",
  image,
  siteName,
  type = "website",
  twitterCard = "summary_large_image",
  locale,
  jsonLd,
  meta = [],
  links = [],
}) {
  return (
    <>
      {title && <title>{title}</title>}

      {description && <meta name="description" content={description} />}
      {canonical && <link rel="canonical" href={canonical} />}
      {robots && <meta name="robots" content={robots} />}

      {/* Open Graph */}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {canonical && <meta property="og:url" content={canonical} />}
      {image && <meta property="og:image" content={image} />}
      <meta property="og:type" content={type} />
      {siteName && <meta property="og:site_name" content={siteName} />}
      {locale && <meta property="og:locale" content={locale} />}

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={image} />}

      {/* Optional extras */}
      {meta.map((m, i) => <meta key={i} {...m} />)}
      {links.map((l, i) => <link key={i} {...l} />)}

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">{json(jsonLd)}</script>
      )}
    </>
  );
}
