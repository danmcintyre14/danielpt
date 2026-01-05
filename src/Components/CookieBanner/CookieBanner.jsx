// src/Components/CookieBanner/CookieBanner.jsx
import { useState, useEffect } from "react";
import Button from "../Button/Button";
import {
  grantAnalyticsConsent,
  denyAnalyticsConsent,
} from "../../utils/analytics";
import styles from "./CookieBanner.module.css";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("analytics_consent");
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
            grantAnalyticsConsent();
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

