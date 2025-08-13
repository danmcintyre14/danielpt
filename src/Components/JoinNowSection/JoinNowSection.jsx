import Button from "../Button/Button";
import styles from "./JoinNowSection.module.css";

export default function JoinNowSection() {
  return (
    <section className={styles.joinNow}>
      <div className={styles.content}>
        <h2>Ready to Transform Your Fitness?</h2>
        <p>
          Join our coaching program today and take the first step towards a
          stronger, healthier you.
        </p>
        <Button mode="filled">Book Your Free Consultation</Button>
      </div>
    </section>
  );
}

