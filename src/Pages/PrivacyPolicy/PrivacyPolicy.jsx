// src/pages/PrivacyPolicy/PrivacyPolicy.jsx
import styles from "./PrivacyPolicy.module.css";

export default function PrivacyPolicy() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <h1>Privacy Policy</h1>
        <p>Effective date: October 8, 2025</p>
      </header>

      <section className={styles.section}>
        <p>
          This Privacy Policy explains how <strong>Daniel McIntyre</strong> (“I”, “me”, “my”, or “the Site”) collects,
          uses, and protects your personal information when you visit{" "}
          <a href="https://www.daniel-mcintyre.com">www.daniel-mcintyre.com</a>, use the FitBlueprint Members Area,
          or interact with my online tools and calculators.
        </p>
      </section>

      <section className={styles.section}>
        <h2>1. Information I Collect</h2>
        <ul className={styles.list}>
          <li><strong>Personal information:</strong> name, email address, and login details (via Firebase authentication).</li>
          <li><strong>Usage data:</strong> pages visited, time on page, and actions performed (via Google Analytics).</li>
          <li><strong>Technical data:</strong> browser type, device, and IP address (used for security and analytics).</li>
          <li><strong>Voluntary data:</strong> information you submit via forms, email, or WhatsApp links.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>2. How I Use Your Information</h2>
        <ul className={styles.list}>
          <li>Provide and manage access to the FitBlueprint Members Area.</li>
          <li>Authenticate users and maintain secure login (Firebase).</li>
          <li>Improve website performance and user experience.</li>
          <li>Send account-related notifications (e.g., login confirmations, security notices).</li>
          <li>Maintain site security and troubleshoot issues.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>3. Data Sharing and Third Parties</h2>
        <p>
          I may process data through trusted providers who act as processors in line with their own privacy policies:
        </p>
        <ul className={styles.list}>
          <li><strong>Firebase (Google LLC)</strong> – authentication and secure login</li>
          <li><strong>Google Analytics</strong> – usage analytics</li>
          <li><strong>Netlify</strong> – website hosting and content delivery</li>
        </ul>
        <p>I do <strong>not</strong> sell or rent your personal data to third parties for marketing purposes.</p>
      </section>

      <section className={styles.section}>
        <h2>4. Cookies and Tracking</h2>
        <p>
          This site uses cookies and similar technologies for analytics and essential functionality. You can disable
          non-essential cookies in your browser settings at any time. If required by your jurisdiction, I may display a
          cookie consent banner.
        </p>
      </section>

      <section className={styles.section}>
        <h2>5. Data Storage and Security</h2>
        <p>
          Personal data is stored securely through Firebase and protected by encryption and access controls. While I
          take reasonable safeguards, no online system is entirely risk-free.
        </p>
      </section>

      <section className={styles.section}>
        <h2>6. Data Retention</h2>
        <p>
          I retain personal data only as long as necessary to provide services and comply with legal obligations. You
          can request account deletion or data access by contacting me (see “Contact” below).
        </p>
      </section>

      <section className={styles.section}>
        <h2>7. Your Rights</h2>
        <p>
          Depending on your location (e.g., under the EU/UK GDPR or UAE PDPL), you may have the right to access,
          correct, delete, or restrict processing of your personal data, and to withdraw consent where processing is
          based on consent. You may also have the right to lodge a complaint with your local data protection authority.
        </p>
      </section>

      <section className={styles.section}>
        <h2>8. International Data Transfers</h2>
        <p>
          Services such as Google and Netlify may process data outside your country of residence. I rely on appropriate
          safeguards in line with applicable laws (e.g., standard contractual clauses or equivalent mechanisms).
        </p>
      </section>

      <section className={styles.section}>
        <h2>9. Updates to This Policy</h2>
        <p>
          I may update this Privacy Policy from time to time. The “Effective date” will reflect the latest version. Your
          continued use of the site after updates constitutes acceptance of the revised policy.
        </p>
      </section>

      <section className={styles.section}>
        <h2>10. Contact</h2>
        <p>
          Questions or requests about your data? Contact:<br />
          <strong>Daniel McIntyre</strong><br />
          Email: <a href="mailto:info@daniel-mcintyre.com">info@daniel-mcintyre.com</a><br />
          Location: Dubai, United Arab Emirates
        </p>
      </section>
    </main>
  );
}
