import MemberAuth from "../../Components/MemberAuth/MemberAuth";
import SEO from "../../Components/SEO/SEO";
import styles from "./MembersPage.module.css";
import { Link } from "react-router-dom";

export default function MembersPage() {
  return (
    <>
      <SEO
        title="The Rebuild — Start Your Health & Fitness Journey | Daniel McIntyre"
        description="The Rebuild by Daniel McIntyre is a free, structured starting point for people beginning fitness for the first time or getting back into it after time away."
        canonical="https://daniel-mcintyre.com/rebuild"
        siteName="The Rebuild by Daniel McIntyre"
        image="https://daniel-mcintyre.com/logo512.png"
        locale="en_GB"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "The Rebuild by Daniel McIntyre",
          url: "https://daniel-mcintyre.com/rebuild",
          description:
            "A free, structured starting point for people beginning fitness for the first time or getting back into it after time away.",
          publisher: {
            "@type": "Person",
            name: "Daniel McIntyre",
          },
          potentialAction: {
            "@type": "RegisterAction",
            target: "https://daniel-mcintyre.com/rebuild#signup",
            name: "Join The Rebuild for free",
          },
        }}
      />

      <main className={styles.pageContainer}>
        <div className={styles.branding}>
          <div className={styles.brandName}>THE REBUILD</div>
          <p>by Daniel McIntyre</p>
        </div>

        <section className={styles.hero}>
          <h1>Thinking about improving your health and fitness?</h1>
          <p>
            Whether you&apos;re starting for the first time or getting back into
            fitness after some time away, The Rebuild will help you start
            properly, build gradually and make progress that lasts.
          </p>

          <div className={styles.vsl} aria-label="The Rebuild introduction video">
            <div className={styles.vslPlaceholder}>
              <span>THE REBUILD</span>
              <small>Video coming soon</small>
            </div>
          </div>

          <a className={styles.primaryCta} href="#signup">
            JOIN THE REBUILD — FREE
          </a>
          <span className={styles.ctaNote}>Free account • No credit card required</span>
        </section>

        <section className={styles.philosophy}>
          <h2>You don&apos;t need to change everything at once.</h2>
          <p>
            I&apos;ve been a personal trainer for 18 years, and I&apos;ve seen people
            fail time and time again.
          </p>
          <p>
            Most of the time, it&apos;s not because they don&apos;t want it enough. It&apos;s
            because they try to do <strong>too much, too soon</strong> without a
            structured plan to follow.
          </p>
          <p>
            They completely change their diet, start training five days a week,
            add cardio, try to hit 10,000 steps every day — and expect
            themselves to maintain all of it.
          </p>
          <p>
            <strong>The Rebuild takes a different approach.</strong>
          </p>
          <p>
            It gives you a structured starting point and helps you gradually
            build your training, nutrition and fitness over time.
          </p>
        </section>

        <section id="signup" className={styles.signup}>
          <div className={styles.signupIntro}>
            <h2>Join The Rebuild</h2>
            <p>Create your free account and start building from where you are now.</p>
          </div>
          <div className={styles.signupBox}>
            <MemberAuth />
          </div>

          <footer className={styles.legalFooter}>
  <span>© 2026 Daniel McIntyre</span>

  <span className={styles.footerDivider}>•</span>

  <Link to="/privacy-policy">
    Privacy Policy
  </Link>

  <span className={styles.footerDivider}>•</span>

  <Link to="/terms">
    Terms &amp; Conditions
  </Link>
</footer>
        </section>
      </main>
    </>
  );
}
