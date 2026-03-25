import styles from "./VideoCard.module.css";

export default function VideoCard({
  image,
  title,
  description,
  youtubeId,
  onClick,
}) {
  const thumbnailSrc = youtubeId
    ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
    : image;

  return (
    <button type="button" className={styles.card} onClick={onClick}>
      {thumbnailSrc && (
        <img src={thumbnailSrc} alt={title} className={styles.thumbnail} />
      )}

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </button>
  );
}

