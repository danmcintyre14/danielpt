// src/pages/Terms/Terms.jsx
import styles from "./Terms.module.css";

export default function Terms() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <h1>Terms &amp; Conditions</h1>
        <p>Effective date: October 8, 2025</p>
      </header>

      <section className={styles.section}>
        <p>
          Welcome to <a href="https://www.daniel-mcintyre.com">www.daniel-mcintyre.com</a> (the “Site”), operated by{" "}
          <strong>Daniel McIntyre</strong> (“I”, “me”, or “my”). By accessing or using this Site, you agree to these
          Terms &amp; Conditions.
        </p>
      </section>

      <section className={styles.section}>
        <h2>1. Purpose of the Site</h2>
        <p>
          This Site provides educational content, calculators, guides, and resources for fitness, nutrition, and
          lifestyle improvement. Access to certain features (e.g., the FitBlueprint Members Area) requires user
          registration via Firebase authentication.
        </p>
      </section>

      <section className={styles.section}>
        <h2>2. Use of Content</h2>
        <p>
          All content on this Site — including videos, PDFs, calculators, and written materials — is owned by
          <strong> Daniel McIntyre</strong> and protected by applicable intellectual property laws. You may view,
          download, and use content for personal, non-commercial purposes only. Reproduction, redistribution, or
          commercial use without written permission is prohibited.
        </p>
      </section>

      <section className={styles.section}>
        <h2>3. Health &amp; Fitness Disclaimer</h2>
        <p>
          The information on this Site is provided <strong>for educational purposes only</strong> and does not constitute
          medical, dietary, or health advice. Always consult a qualified healthcare professional before making major
          changes to your diet, exercise, or lifestyle. By using this Site, you acknowledge that I am not responsible
          for any injury, illness, or outcome resulting from the use of information or tools provided.
        </p>
      </section>

      <section className={styles.section}>
        <h2>4. User Accounts</h2>
        <p>
          To access the Members Area, you must create an account through Firebase and keep your credentials confidential.
          I may suspend or terminate accounts that violate these Terms or are used improperly.
        </p>
      </section>

      <section className={styles.section}>
        <h2>5. Limitation of Liability</h2>
        <p>
          While I strive for accuracy and availability, I make no guarantees regarding completeness, reliability, or
          uninterrupted access. To the maximum extent permitted by law, I am not liable for any direct, indirect,
          incidental, or consequential damages arising from your use of the Site.
        </p>
      </section>

      <section className={styles.section}>
        <h2>6. Links to Other Sites</h2>
        <p>
          The Site may contain links to third-party websites. I am not responsible for their content, policies, or
          practices. You access third-party sites at your own risk.
        </p>
      </section>

      <section className={styles.section}>
        <h2>7. Modifications</h2>
        <p>
          I may modify these Terms at any time. Changes will be effective when posted on this page. Your continued use
          of the Site after changes are posted constitutes acceptance of the revised Terms.
        </p>
      </section>

      <section className={styles.section}>
        <h2>8. Governing Law</h2>
        <p>
          These Terms are governed by the laws of the United Arab Emirates. Any disputes shall be subject to the
          exclusive jurisdiction of the Dubai courts.
        </p>
      </section>

      <section className={styles.section}>
        <h2>9. Contact</h2>
        <p>
          For questions about these Terms, contact:<br />
          <strong>Daniel McIntyre</strong><br />
          Email: <a href="mailto:info@daniel-mcintyre.com">info@daniel-mcintyre.com</a><br />
          Location: Dubai, United Arab Emirates
        </p>
      </section>
    </main>
  );
}
