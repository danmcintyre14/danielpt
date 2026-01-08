// src/Components/CookieBanner/CookieBanner.jsx
import { useEffect, useState } from "react";
import Button from "../Button/Button";
import { grantAnalyticsConsent, denyAnalyticsConsent } from "../../utils/analytics";
import styles from "./CookieBanner.module.css";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show banner only if no decision has been made yet
    const consent = localStorage.getItem("analytics_consent"); // or use getAnalyticsConsent + separate "hasDecision"
    if (!consent) setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.banner}>
      <p className={styles.text}>
        This site uses cookies for analytics to improve your experience.
      </p>

      <div className={styles.actions}>
        <Button
          mode="filled"
          onClick={() => {
            grantAnalyticsConsent(); // ✅ also fires a page_view immediately
            setVisible(false);
          }}
        >
          Accept
        </Button>

        <Button
          mode="outline"
          onClick={() => {
            denyAnalyticsConsent();
            setVisible(false);
          }}
        >
          Decline
        </Button>
      </div>
    </div>
  );
}


