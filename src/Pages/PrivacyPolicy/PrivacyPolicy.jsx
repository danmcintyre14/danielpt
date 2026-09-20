// src/pages/PrivacyPolicy/PrivacyPolicy.jsx

import styles from "./PrivacyPolicy.module.css";

export default function PrivacyPolicy() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>LEGAL</p>

        <h1>Privacy Policy</h1>

        <p className={styles.effectiveDate}>
          Effective date: September 20, 2026
        </p>
      </header>

      <section className={styles.section}>
        <p>
          This Privacy Policy explains how{" "}
          <strong>Daniel McIntyre</strong> ("I", "me", or "my") collects,
          uses and protects personal information when you visit{" "}
          <a
            href="https://www.daniel-mcintyre.com"
            target="_blank"
            rel="noreferrer"
          >
            www.daniel-mcintyre.com
          </a>
          , create an account for <strong>The Rebuild</strong>, use its
          tools and resources, or contact me through the website.
        </p>
      </section>

      <section className={styles.section}>
        <h2>1. Information I Collect</h2>

        <p>
          Depending on how you use the website and The Rebuild, information
          processed may include:
        </p>

        <ul className={styles.list}>
          <li>
            <strong>Account information:</strong> information such as your
            name and email address when you create or use an account.
          </li>

          <li>
            <strong>Authentication information:</strong> information required
            to create, verify and maintain your account through Firebase
            Authentication.
          </li>

          <li>
            <strong>Usage information:</strong> information about how the
            website is used, such as pages visited and interactions with
            website features, where analytics is enabled.
          </li>

          <li>
            <strong>Technical information:</strong> information such as
            browser type, device information and IP address that may be
            processed for security, hosting and analytics purposes.
          </li>

          <li>
            <strong>Information you provide voluntarily:</strong> information
            you choose to send through email, forms, WhatsApp or other
            communication methods.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>2. Calculator and Tool Information</h2>

        <p>
          The Rebuild includes fitness and nutrition tools that may ask you
          to enter information such as your age, sex, height, weight,
          activity level, goals, calorie target or protein target.
        </p>

        <p>
          Where these calculations take place only within your browser and
          the information is not submitted to or stored by me, that
          information is used only to generate the calculation or result
          shown to you.
        </p>

        <p>
          If the way these tools store or process information changes in the
          future, this Privacy Policy will be updated accordingly.
        </p>
      </section>

      <section className={styles.section}>
        <h2>3. How I Use Your Information</h2>

        <p>I may use personal information to:</p>

        <ul className={styles.list}>
          <li>
            Create and manage access to The Rebuild.
          </li>

          <li>
            Authenticate users and maintain secure account access.
          </li>

          <li>
            Provide account-related communications, including email
            verification and security messages.
          </li>

          <li>
            Operate, maintain and improve the website and The Rebuild.
          </li>

          <li>
            Understand how the website and its resources are being used.
          </li>

          <li>
            Respond to questions, support requests and other communications.
          </li>

          <li>
            Maintain website security, prevent misuse and troubleshoot
            technical problems.
          </li>

          <li>
            Comply with applicable legal obligations.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>4. Third-Party Services</h2>

        <p>
          The website may use third-party services to provide its
          functionality. These providers may process information in
          accordance with their own privacy policies and applicable law.
        </p>

        <ul className={styles.list}>
          <li>
            <strong>Firebase / Google:</strong> account authentication,
            verification and related website functionality.
          </li>

          <li>
            <strong>Google Analytics:</strong> website usage analytics,
            where enabled.
          </li>

          <li>
            <strong>Netlify:</strong> website hosting and content delivery.
          </li>

          <li>
            <strong>YouTube:</strong> video hosting and playback where
            YouTube videos are embedded or linked.
          </li>

          <li>
            <strong>WhatsApp / Meta:</strong> communication when you choose
            to contact me through a WhatsApp link.
          </li>
        </ul>

        <p>
          I do not sell or rent your personal information to third parties
          for their own marketing purposes.
        </p>
      </section>

      <section className={styles.section}>
        <h2>5. WhatsApp and External Communications</h2>

        <p>
          The Rebuild includes links that allow you to contact me through
          WhatsApp. If you choose to use WhatsApp, your communication and
          information will also be processed by WhatsApp and its associated
          service providers in accordance with their own terms and privacy
          practices.
        </p>

        <p>
          You should avoid sending sensitive medical or other highly
          sensitive personal information through WhatsApp unless it is
          necessary and you are comfortable doing so.
        </p>
      </section>

      <section className={styles.section}>
        <h2>6. Cookies and Analytics</h2>

        <p>
          The website may use cookies or similar technologies that are
          necessary for website functionality, security or analytics.
        </p>

        <p>
          Where consent is required by applicable law for non-essential
          cookies or similar technologies, appropriate consent controls
          should be provided before those technologies are used.
        </p>
      </section>

      <section className={styles.section}>
        <h2>7. Data Storage and Security</h2>

        <p>
          I take reasonable technical and organisational measures to protect
          personal information against unauthorised access, loss, misuse or
          disclosure.
        </p>

        <p>
          Account and authentication information may be processed using
          Firebase and other service providers used to operate the website.
          No method of electronic storage or transmission is completely
          secure, so absolute security cannot be guaranteed.
        </p>
      </section>

      <section className={styles.section}>
        <h2>8. Data Retention</h2>

        <p>
          Personal information is retained only for as long as reasonably
          necessary for the purposes for which it was collected, including
          providing access to The Rebuild, maintaining security, resolving
          disputes and meeting applicable legal obligations.
        </p>

        <p>
          You may contact me to request deletion of your account or personal
          information, subject to any information I am required or permitted
          to retain by law.
        </p>
      </section>

      <section className={styles.section}>
        <h2>9. Your Privacy Rights</h2>

        <p>
          Depending on the laws that apply to you and your personal
          information, you may have rights relating to your personal data.
          These may include rights to:
        </p>

        <ul className={styles.list}>
          <li>Request access to personal information held about you.</li>
          <li>Request correction of inaccurate information.</li>
          <li>Request deletion of certain personal information.</li>
          <li>Request restriction of certain processing.</li>
          <li>
            Withdraw consent where processing is based on your consent.
          </li>
          <li>
            Raise a concern with an appropriate data protection authority,
            where applicable.
          </li>
        </ul>

        <p>
          The availability and scope of these rights depend on the
          applicable law and circumstances.
        </p>
      </section>

      <section className={styles.section}>
        <h2>10. International Data Processing</h2>

        <p>
          Some of the service providers used by this website may process
          information in countries other than the country in which you live.
          Where required, personal information should be transferred and
          processed using safeguards required by applicable data protection
          law.
        </p>
      </section>

      <section className={styles.section}>
        <h2>11. Changes to This Privacy Policy</h2>

        <p>
          I may update this Privacy Policy when The Rebuild, the website,
          the services I use or applicable requirements change.
        </p>

        <p>
          The effective date at the top of this page will be updated when
          material changes are made. Where required, additional notice or
          consent will be provided.
        </p>
      </section>

      <section className={styles.section}>
        <h2>12. Contact</h2>

        <p>
          If you have a question about this Privacy Policy, want to exercise
          an applicable privacy right, or want to request deletion of your
          account, contact:
        </p>

        <p className={styles.contact}>
          <strong>Daniel McIntyre</strong>
          <br />
          Email:{" "}
          <a href="mailto:info@daniel-mcintyre.com">
            info@daniel-mcintyre.com
          </a>
          <br />
          Dubai, United Arab Emirates
        </p>
      </section>
    </main>
  );
}
