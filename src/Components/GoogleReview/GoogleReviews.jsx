import styles from './GoogleReviews.module.css';
import review1 from '../../assets/reviews/review1.png';
import review2 from '../../assets/reviews/review2.png';
import review3 from '../../assets/reviews/review3.png';

export default function GoogleReviews() {
  const reviews = [review1, review2, review3];

  return (
    <section className={styles.reviewsBanner}>
      <h2>What New Members Are Saying</h2>
      <div className={styles.reviews}>
        {reviews.map((img, index) => (
          <img key={index} src={img} alt={`Google Review ${index + 1}`} />
        ))}
      </div>
    </section>
  );
}
