// src/utils/analytics.js
export function initGA(measurementId) {
  if (!measurementId || import.meta.env.DEV || window.gtag) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(){ window.dataLayer.push(arguments); };

  // Default consent (deny until user accepts)
  window.gtag('consent', 'default', {
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    ad_storage: 'denied',
    analytics_storage: 'denied',
  });

  // Load GA4 script
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(s);

  window.gtag('js', new Date());
  window.gtag('config', measurementId, { send_page_view: false });
}

// Call this when user accepts cookies
export function grantAnalyticsConsent() {
  if (!window.gtag) return;
  window.gtag('consent', 'update', { analytics_storage: 'granted' });
}

// Track SPA page views
export function trackPageView(path, measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID) {
  if (!window.gtag || import.meta.env.DEV) return;
  window.gtag('event', 'page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: path,
    send_to: measurementId,
  });
}

// Track custom events
export function trackEvent(action, params = {}) {
  if (!window.gtag || import.meta.env.DEV) return;
  window.gtag('event', action, params);
}


