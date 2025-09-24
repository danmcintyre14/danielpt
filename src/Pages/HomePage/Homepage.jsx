import styles from "./Homepage.module.css";
import Button from "../../Components/Button/Button";
import GoogleReviews from "../../Components/GoogleReview/GoogleReviews";
import StepCalculator from "../../Components/StepCalculator/StepCalculator";
import WhatsAppContact from "../../Components/WhatsAppContact/WhatsAppContact";
import heroImage from "../../assets/images/smallBanner.png";
import { FaDumbbell, FaAppleAlt, FaHeartbeat } from "react-icons/fa";
import WhatsAppIcon from "../../Components/WhatsAppContact/WhatsAppIcon";
import SEO from "../../Components/SEO/SEO";

export default function Homepage() {
  return (
    <>
      <SEO
        title="Personal Trainer Dubai | Daniel McIntyre"
        description="1:1 coaching in Dubai—smart training, simple nutrition, real accountability. Start your FitBlueprint free."
        canonical="https://daniel-mcintyre.com/"
        siteName="Daniel McIntyre Personal Training"
        image="https://daniel-mcintyre.com/logo512.png"
        locale="en_GB"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "ExerciseGym",
            "name": "Daniel McIntyre Personal Training",
            "url": "https://daniel-mcintyre.com/",
            "image": "https://daniel-mcintyre.com/logo512.png",
            "telephone": "+971526497126",
            "address": { "@type": "PostalAddress", "addressLocality": "Dubai", "addressCountry": "AE" },
            "areaServed": "Dubai"
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Daniel McIntyre Personal Training",
            "url": "https://daniel-mcintyre.com/",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://daniel-mcintyre.com/?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
        ]}
      />

      <div className={styles.pageContainer}>
        {/* ===== HERO ===== */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Redefine Your Life. Transform Into a Fitter, Stronger, Healthier You!</h1>
            <p>
              Step-by-step personal training to help you take control of your health,
              build strength, and create lasting change — without feeling lost.
            </p>
            <div className={styles.heroBtns}>
              <Button
                href="https://wa.me/971526497126?text=Hi%20Dan!%20I%27d%20like%20to%20learn%20more%20about%20coaching."
                mode="whatsapp"
                onClick={() => console.log("User clicked WhatsApp from hero section")}
              >
                <WhatsAppIcon className={styles.inlineIcon} />
                Chat on WhatsApp
              </Button>
              <Button mode="outline" to="/fitblueprint">
                Join The FitBlueprint – Free Access
              </Button>
            </div>
          </div>

          {/* Optional right-side hero media */}
          <img
            className={styles.heroMedia}
            src={heroImage}
            alt="Personal trainer in Dubai providing coaching and nutrition support"
            loading="eager"
            width="640"
            height="640"
          />
        </section>

        {/* ===== QUICK VALUE PROPS / FEATURES ===== */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>How I'll Help You Succeed</h2>
            <p>Simple, effective coaching tools to help you build momentum fast.</p>
          </div>

          <div className={styles.features}>
            <div className={`${styles.card} ${styles.feature}`}>
              <div className={styles.featureIcon}><FaDumbbell size={20} /></div>
              <h3>Smart Training</h3>
              <p>Workouts designed for your body, goals, and lifestyle—so you always know exactly what to do.</p>
            </div>

            <div className={`${styles.card} ${styles.feature}`}>
              <div className={styles.featureIcon}><FaAppleAlt size={20} /></div>
              <h3>Nutrition Made Easy</h3>
              <p>Simple nutrition guidance with flexible meal options—no fad diets, just real food that fits your life.</p>
            </div>

            <div className={`${styles.card} ${styles.feature}`}>
              <div className={styles.featureIcon}><FaHeartbeat size={20} /></div>
              <h3>Accountability</h3>
              <p>Stay consistent with check-ins, progress tracking, and the accountability you need to keep moving forward.</p>
            </div>
          </div>
        </section>

        {/* ===== STEP CALCULATOR ===== */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Start By Calculating Your Calorie Needs!</h2>
            <p>Takes less than 60 seconds. Just click the calculator to start.</p>
          </div>
          <div className={styles.twoCol}>
            <div className={styles.card}>
              <div className={styles.calculatorWrap}>
                <StepCalculator />
              </div>
            </div>
          </div>
        </section>

        {/* ===== SOCIAL PROOF / REVIEWS ===== */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Client Results & Reviews</h2>
            <p>Real stories from clients who built strength, lost fat, and gained confidence.</p>
          </div>
          <div className={`${styles.reviews} ${styles.card}`}>
            <GoogleReviews />
          </div>
        </section>

        {/* ===== CTA (WhatsAppContact) ===== */}
        <section className={styles.section}>
          <div className={styles.container}>
            <WhatsAppContact
              phone="971526497126"
              message="Hey Dan! I’d like to learn more about coaching."
              headline="Need quick help?"
              subhead="Message me on WhatsApp and I’ll reply as soon as possible."
              buttonText="Chat on WhatsApp"
            />
          </div>
        </section>
      </div>
    </>
  );
}


