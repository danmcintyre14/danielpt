// src/lib/SEO.jsx
// React 19: head tags declared in components are hoisted into <head>

// ---- helpers -------------------------------------------------------------
function safeJson(obj) {
  try {
    if (!obj) return "";
    return typeof obj === "string" ? obj : JSON.stringify(obj);
  } catch {
    return "";
  }
}

// Force absolute URL, remove tracking params, and normalize trailing slash
function normalizeUrl(url, { keepTrailingSlashOnRoot = true } = {}) {
  if (!url) return "";
  try {
    const u = new URL(url, "https://daniel-mcintyre.com"); // fallback base
    // strip common tracking params
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid", "ref"].forEach(k =>
      u.searchParams.delete(k)
    );
    // trailing slash policy: keep only on root
    if (u.pathname !== "/") {
      u.pathname = u.pathname.replace(/\/+$/, ""); // remove trailing slashes
    } else if (keepTrailingSlashOnRoot) {
      u.pathname = "/";
    }
    // force preferred host (non-www)
    u.protocol = "https:";
    u.hostname = "daniel-mcintyre.com";
    return u.toString();
  } catch {
    return url; // fall back to raw
  }
}

function isPreviewEnv() {
  // Netlify Deploy Previews expose NETLIFY/DEPLOY_PRIME_URL vars at build time.
  // You can also pass a prop to override if needed.
  return (
    import.meta?.env?.VITE_DEPLOY_CONTEXT === "deploy-preview" ||
    import.meta?.env?.NETLIFY === "true" && import.meta?.env?.VITE_DEPLOY_CONTEXT !== "production"
  );
}

// ---- component -----------------------------------------------------------
/**
 * <SEO />
 * Props:
 * - title, description, canonical, robots, image, siteName, type, twitterCard, locale
 * - jsonLd (object|string), meta ([{ name, content }]), links ([{ rel, href }])
 * - imageWidth, imageHeight (optional OG dimensions)
 * - forceNoIndex (boolean) override
 */
export default function SEO({
  title,
  description,
  canonical,
  robots = "index,follow",
  image,
  imageWidth,
  imageHeight,
  siteName,
  type = "website",
  twitterCard = "summary_large_image",
  locale,
  jsonLd,
  meta = [],
  links = [],
  forceNoIndex = false,
}) {
  const canonicalUrl = canonical ? normalizeUrl(canonical) : "";
  const ogImage = image ? normalizeUrl(image) : "";

  // Auto noindex on previews unless overridden
  const robotsFinal = forceNoIndex || isPreviewEnv() ? "noindex,nofollow" : robots || "index,follow";

  const jsonLdText = safeJson(jsonLd);

  return (
    <>
      {title && <title>{title}</title>}

      {description && <meta name="description" content={description} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {robotsFinal && <meta name="robots" content={robotsFinal} />}

      {/* Open Graph */}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      {imageWidth && <meta property="og:image:width" content={String(imageWidth)} />}
      {imageHeight && <meta property="og:image:height" content={String(imageHeight)} />}
      <meta property="og:type" content={type} />
      {siteName && <meta property="og:site_name" content={siteName} />}
      {locale && <meta property="og:locale" content={locale} />}

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      {/* Optional: set your handle if you want */}
      {/* <meta name="twitter:site" content="@yourhandle" /> */}

      {/* Optional extras */}
      {meta.map((m, i) => <meta key={i} {...m} />)}
      {links.map((l, i) => <link key={i} {...l} />)}

      {/* JSON-LD */}
      {!!jsonLdText && (
        <script type="application/ld+json">{jsonLdText}</script>
      )}
    </>
  );
}

