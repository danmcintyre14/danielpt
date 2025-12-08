import styles from "./VideoModal.module.css";

export default function VideoModal({ video, onClose }) {
  if (!video) return null;

  const { youtubeId, videoUrl } = video;
  const hasYouTube = Boolean(youtubeId);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        {/* Close button */}
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>

        <div className={styles.playerWrapper}>
          {hasYouTube ? (
            <iframe
              className={styles.player}
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video controls className={styles.player}>
              <source src={videoUrl} type="video/mp4" />
            </video>
          )}
        </div>
      </div>
    </div>
  );
}



