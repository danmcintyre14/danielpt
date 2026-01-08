// src/utils/analytics.js
// GA4 for Vite + React Router SPA with Consent Mode (Option B)
// - Default: denied until user accepts
// - Persists consent in localStorage
// - Manual SPA page_view tracking
// - Safe guards: no tracking in dev, no double init

const CONSENT_KEY = "analytics_consent"; // "granted" | "denied"

function hasConsentGranted() {
  return localStorage.getItem(CONSENT_KEY) === "granted";
}

export function initGA(measurementId) {
  // Don’t run without an ID, in dev, or if already initialized
  if (!measurementId || import.meta.env.DEV || window.gtag) return;

  // Create dataLayer + gtag shim
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  // Apply stored consent (default deny if not granted)
  const analyticsStorage = hasConsentGranted() ? "granted" : "denied";

  window.gtag("consent", "default", {
    ad_user_data: "denied",
    ad_personalization: "denied",
    ad_storage: "denied",
    analytics_storage: analyticsStorage,
  });

  // Load GA4 script
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(s);

  // Init GA (disable auto page view; we send manually for SPA)
  window.gtag("js", new Date());
  window.gtag("config", measurementId, { send_page_view: false });
}

export function grantAnalyticsConsent() {
  localStorage.setItem(CONSENT_KEY, "granted");
  if (!window.gtag) return;

  // Update consent
  window.gtag("consent", "update", { analytics_storage: "granted" });

  // IMPORTANT: send a pageview after granting consent
  // (otherwise first visit may not appear in Realtime until next navigation)
  window.gtag("event", "page_view", {
    page_title: document.title,
    page_location: window.location.href,
    page_path: window.location.pathname + window.location.search,
  });
}

export function denyAnalyticsConsent() {
  localStorage.setItem(CONSENT_KEY, "denied");
  if (!window.gtag) return;

  // Update consent to denied
  window.gtag("consent", "update", { analytics_storage: "denied" });
}

export function resetAnalyticsConsent() {
  localStorage.removeItem(CONSENT_KEY);
}

export function getAnalyticsConsent() {
  return hasConsentGranted() ? "granted" : "denied";
}

export function trackPageView(path, measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID) {
  // Don’t track if GA isn’t ready, in dev, or no consent
  if (!window.gtag || import.meta.env.DEV || !hasConsentGranted()) return;

  window.gtag("event", "page_view", {
    page_title: document.title,
    page_location: window.location.href,
    page_path: path,
    send_to: measurementId,
  });
}

export function trackEvent(action, params = {}) {
  // Don’t track if GA isn’t ready, in dev, or no consent
  if (!window.gtag || import.meta.env.DEV || !hasConsentGranted()) return;

  window.gtag("event", action, params);
}




