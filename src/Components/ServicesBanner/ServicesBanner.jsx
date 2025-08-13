import styles from './ServiceBanner.module.css'

export default function ServiceBanner({ image, title, description}) {
    return (
        <div className={styles.serviceBanner}>
          <img src={image} alt={title} className={styles.image} />
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
    );
};