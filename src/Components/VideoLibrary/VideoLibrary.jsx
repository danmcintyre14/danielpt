// src/Components/VideoLibrary/VideoLibrary.jsx
import { useState } from "react";
import { videoData } from "../../data/data";
import VideoCard from "../VideoCard/VideoCard";
import VideoModal from "../VideoPlayer/VideoModal";
import styles from "./VideoLibrary.module.css";

const MAX_VISIBLE = 3; // how many cards to show before "Show more"

export default function VideoLibrary() {
  const [selected, setSelected] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const visibleVideos = showAll
    ? videoData
    : videoData.slice(0, MAX_VISIBLE);

  return (
    <div>
      <h2 className={styles.heading}>Video Tutorials</h2>

      <div className={styles.videoGrid}>
        {visibleVideos.map((video, index) => (
          <VideoCard
            key={`${video.title}-${index}`}
            {...video}
            onClick={() => setSelected(video)}
          />
        ))}
      </div>

      {videoData.length > MAX_VISIBLE && (
        <div className={styles.loadMoreWrapper}>
          <button
            type="button"
            className={styles.loadMoreButton}
            onClick={() => setShowAll(prev => !prev)}
          >
            {showAll ? "Show fewer videos" : "Show more videos"}
          </button>
        </div>
      )}

      <VideoModal video={selected} onClose={() => setSelected(null)} />
    </div>
  );
}



