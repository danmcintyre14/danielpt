// src/pages/MembersPage/MembersPage.jsx
import MemberAuth from "../../Components/MemberAuth/MemberAuth";
import GoogleReviews from "../../Components/GoogleReview/GoogleReviews";
import JoinNow from "../../Components/JoinNowSection/JoinNowSection";
import styles from "./MembersPage.module.css";
import { FiVideo, FiBarChart2, FiCalendar, FiBookOpen } from "react-icons/fi";

export default function MembersPage() {
  return (
    <div className={styles.pageContainer}>
      {/* Hero */}
      <section className={styles.hero}>
        <h1>
          Start Your Journey with <span>Fit Foundations</span>
        </h1>
        <p>
          Build confidence, learn the fundamentals, and create a strong base for long-term fitness success.
        </p>
      </section>

      {/* Benefits */}
      <section className={styles.benefits}>
        <h2>What You’ll Get Inside</h2>
        <div className={styles.benefitsGrid}>
          <div className={styles.benefitCard}>
            <FiVideo className={styles.icon} />
            <p>Beginner-friendly workout videos</p>
          </div>
          <div className={styles.benefitCard}>
            <FiBarChart2 className={styles.icon} />
            <p>Step-by-step nutrition & calorie calculator</p>
          </div>
          <div className={styles.benefitCard}>
            <FiCalendar className={styles.icon} />
            <p>A free starter training plan</p>
          </div>
          <div className={styles.benefitCard}>
            <FiBookOpen className={styles.icon} />
            <p>Exclusive fitness & nutrition guides</p>
          </div>
        </div>
      </section>

      <GoogleReviews />
      <JoinNow />

      {/* Auth */}
      <section id="signup" className={styles.signup}>
        <div className={styles.signupBox}>
          <h2>Access Fit Foundations</h2>
          <p>Sign up to get instant access. Verify your email and start today.</p>
          {/* MemberAuth handles redirect to /membersArea internally */}
          <MemberAuth />
        </div>
      </section>
    </div>
  );
}
