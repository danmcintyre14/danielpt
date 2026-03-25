// src/Components/VideoLibrary/VideoLibrary.jsx
import { useState } from "react";
import VideoCard from "../VideoCard/VideoCard";
import VideoModal from "../VideoPlayer/VideoModal";
import styles from "./VideoLibrary.module.css";

const MAX_VISIBLE = 3;

export default function VideoLibrary({
  title = "Video Tutorials",
  subtitle = "",
  videos = [],
}) {
  const [selected, setSelected] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const visibleVideos = showAll ? videos : videos.slice(0, MAX_VISIBLE);

  if (!videos.length) return null;

  return (
    <div>
      <h2 className={styles.heading}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

      <div className={styles.videoGrid}>
        {visibleVideos.map((video, index) => (
          <VideoCard
            key={`${video.title}-${index}`}
            {...video}
            onClick={() => setSelected(video)}
          />
        ))}
      </div>

      {videos.length > MAX_VISIBLE && (
        <div className={styles.loadMoreWrapper}>
          <button
            type="button"
            className={styles.loadMoreButton}
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Show fewer videos" : "Show more videos"}
          </button>
        </div>
      )}

      <VideoModal video={selected} onClose={() => setSelected(null)} />
    </div>
  );
}



