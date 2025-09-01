import styles from "./Homepage.module.css";
import Button from "../../Components/Button/Button";
import GoogleReviews from "../../Components/GoogleReview/GoogleReviews";
import JoinNow from "../../Components/JoinNowSection/JoinNowSection";
import StepCalculator from "../../Components/StepCalculator/StepCalculator";
import heroImage from "../../assets/Images/smallBanner.png";
import { FaDumbbell, FaAppleAlt, FaHeartbeat } from "react-icons/fa";

export default function Homepage() {
  return (
    <div className={styles.pageContainer}>
      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Defy Age. Redefine Life. Transform Into a Fitter, Stronger, Healthier You!</h1>
          <p>
            Expert coaching designed for those who want to regain mobility, rebuild strength,
            and rediscover peak fitness.
          </p>
          <div className={styles.heroBtns}>
            <Button mode="filled">Book a Consultation</Button>
            <Button mode="outline" to="/fitblueprint">
              Join Fit Foundations – Free Access
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
          <h2>What You’ll Get</h2>
          <p>Simple, effective coaching tools to help you build momentum fast.</p>
        </div>

        <div className={styles.features}>
          <div className={`${styles.card} ${styles.feature}`}>
            <div className={styles.featureIcon}><FaDumbbell size={20} /></div>
            <h3>Smart Training</h3>
            <p>Progressive workouts tailored to your ability and equipment.</p>
          </div>

          <div className={`${styles.card} ${styles.feature}`}>
            <div className={styles.featureIcon}><FaAppleAlt size={20} /></div>
            <h3>Nutrition Made Easy</h3>
            <p>Calorie & macro targets with flexible, real‑world food guidance.</p>
          </div>

          <div className={`${styles.card} ${styles.feature}`}>
            <div className={styles.featureIcon}><FaHeartbeat size={20} /></div>
            <h3>Accountability</h3>
            <p>Check‑ins, tracking, and nudges to keep you consistent.</p>
          </div>
        </div>
      </section>

      {/* ===== STEP CALCULATOR ===== */}
      <section className={styles.section}>
        <div className={styles.twoCol}>
          <div className={styles.card}>
            <h2 className="sr-only">Calculate Your Calories</h2>
            <p className={styles.mb3}>
              Not sure where to start? Use the quick calculator below to estimate your daily calories.
            </p>
            <div className={styles.calculatorWrap}>
              <StepCalculator />
            </div>
          </div>

          <div className={styles.card}>
            <h3 className={styles.mt2}>Why this works</h3>
            <p className={styles.mt2}>
              Simple inputs, smart outputs. Get a realistic target you can actually stick to,
              then adjust based on weekly progress.
            </p>
            <div className={`${styles.mt3} ${styles.heroBtns}`}>
              <Button mode="filled">Start Coaching</Button>
              <Button mode="outline" to="/membersPage">Access Members Area</Button>
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

      {/* ===== CTA BAND ===== */}
      <section className={styles.section}>
        <div className={styles.ctaBand}>
          <h3 className={styles.ctaTitle}>Ready to build momentum?</h3>
          <p className={styles.ctaText}>
            Get instant access to the Members Area with starter resources, then book a consult if you
            want a personalised plan.
          </p>
          <div className={styles.ctaActions}>
            <Button mode="filled">Book a Consultation</Button>
            <Button mode="outline" to="/membersPage">Join Fit Foundations – Free</Button>
          </div>
        </div>
      </section>

      {/* ===== Secondary CTA (your existing JoinNow section) ===== */}
      <section className={styles.section}>
        <div className={styles.container}>
          <JoinNow />
        </div>
      </section>
    </div>
  );
}


