import styles from "./Homepage.module.css";
import Button from "../../Components/Button/Button";
import GoogleReviews from "../../Components/GoogleReview/GoogleReviews";
import JoinNow from "../../Components/JoinNowSection/JoinNowSection";
import StepCalculator from "../../Components/StepCalculator/StepCalculator";
import WhatsAppContact from "../../Components/WhatsAppContact/WhatsAppContact";
import heroImage from "../../assets/Images/smallBanner.png";
import { FaDumbbell, FaAppleAlt, FaHeartbeat } from "react-icons/fa";

export default function Homepage() {
  return (
    <div className={styles.pageContainer}>
      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Redefine Life. Transform Into a Fitter, Stronger, Healthier You!</h1>
          <p>
            Step-by-step personal training to help you take control of your health,
             build strength, and create lasting change - without feeling lost.
          </p>
          <div className={styles.heroBtns}>
            <Button mode="filled">Book a Consultation</Button>
            <Button mode="outline" to="/fitblueprint">
              Join The FitBlueprint – Free Access
            </Button>
          </div>
        </div>

        {/* Optional right-side hero media */}
        <img
          className={styles.heroMedia}
          src={heroImage}
          alt="Coach-led training and nutrition support"
          loading="eager"
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
        <div className={styles.twoCol}>
          <div className={styles.card}>
            <h2 className="sr-only">Calculate Your Calories</h2>
            <p className={styles.mb3}>
              Not sure where to start? Use the quick calculator below to estimate your daily calories. Takes less than 60 seconds.
            </p>
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

      {/* ===== CTA (WhatsappContact) ===== */}
      <section className={styles.section}>
        <div className={styles.container}>
            <WhatsAppContact
        phone="9715XXXXXXXX"
        message="Hey Dan! I’d like to learn more about coaching."
        headline="Need quick help?"
        subhead="Message me on WhatsApp and I’ll reply as soon as possible."
        buttonText="Chat on WhatsApp"
      />
       <JoinNow />
        </div>
      </section>
    </div>
  );
}


