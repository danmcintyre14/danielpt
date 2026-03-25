import Button from "../Button/Button";
import styles from './PDFSection.module.css';

export default function PDFSection({ title, file, description, thumbnail }) {
  return (
    <div className={styles.card}>
      <img src={thumbnail} alt={`${title} thumbnail`} className={styles.thumbnail} />

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>

        {description && <p className={styles.description}>{description}</p>}

        <Button href={file} mode="filled small">
          Open Guide
        </Button>
      </div>
    </div>
  );
}

