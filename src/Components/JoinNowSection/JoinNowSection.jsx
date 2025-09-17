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
        <Button mode="light"
         href="https://wa.me/971586686574?text=Hi%20Dan,%20I’d%20like%20to%20book%20a%20consultation">Book Your Free Consultation</Button>
      </div>
    </section>
  );
}

