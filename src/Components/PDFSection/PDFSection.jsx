import styles from './PDFSection.module.css';

export default function PDFSection({ title, file, description, thumbnail }) {
  return (
    <div className={styles.card}>
      <img src={thumbnail} alt={`${title} thumbnail`} className={styles.thumbnail} />
      <div className={styles.content}>
        <h3>{title}</h3>
        {description && <p>{description}</p>}
        <a href={file} target="_blank" rel="noopener noreferrer" className={styles.viewButton}>
          View PDF
        </a>
      </div>
    </div>
  );
}

