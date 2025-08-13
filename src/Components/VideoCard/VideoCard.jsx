import styles from './VideoCard.module.css'

export default function VideoCard({ image, title, description}) {
    return (
        <div className={styles.card}>
            <img src={image} alt={title} className={styles.thumbnail} />
              <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
              </div>
        </div>
    );
};