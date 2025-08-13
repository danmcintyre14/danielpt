// src/pages/Homepage/Homepage.jsx
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
      {/* === HERO SECTION === */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Defy Age. Redefine Life. Transform Into a Fitter, Stronger, Healthier You!</h1>
          <p>
            Expert coaching designed for those who want to regain mobility,
            rebuild strength and rediscover peak fitness.
          </p>
          <div className={styles.heroBtns}>
            <Button mode="filled">Book a Consultation</Button>
            <Button mode="outline" href="/membersPage">
              Join Fit Foundations – Free Access
            </Button>
          </div>
        </div>
        <div className={styles.heroImage}>
          <img src={heroImage} alt="Fitness Transformation" />
        </div>
      </section>

      {/* === STEP CALCULATOR SECTION === */}
      <section className={styles.calculatorSection}>
        <h2>Calculate Your Calories</h2>
        <StepCalculator />
      </section>

      {/* === BENEFITS SECTION === */}
      <section className={styles.benefits}>
        <div className={styles.benefitCard}>
          <FaDumbbell className={styles.icon} />
          <h3>Strength Training</h3>
          <p>Build lean muscle and improve performance with science-backed workouts.</p>
        </div>
        <div className={styles.benefitCard}>
          <FaAppleAlt className={styles.icon} />
          <h3>Nutrition Coaching</h3>
          <p>Learn sustainable eating habits to fuel your training and lifestyle.</p>
        </div>
        <div className={styles.benefitCard}>
          <FaHeartbeat className={styles.icon} />
          <h3>Wellness Guidance</h3>
          <p>Enhance recovery, reduce injury risk, and optimise health markers.</p>
        </div>
      </section>

      {/* === GOOGLE REVIEWS === */}
      <GoogleReviews />

      {/* === JOIN NOW === */}
      <JoinNow />
    </div>
  );
}

