import { useState } from "react";
import { videoData } from "../../data/data";
import VideoCard from "../VideoCard/VideoCard";
import VideoModal from "../VideoPlayer/VideoModal";
import styles from "./VideoLibrary.module.css";

export default function VideoLibrary() {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <h2 className={styles.heading}>Video Tutorials</h2>

      <div className={styles.videoGrid}>
        {videoData.map((video, index) => (
          <VideoCard
            key={index}
            {...video}
            onClick={() => setSelected(video)}
          />
        ))}
      </div>

      <VideoModal video={selected} onClose={() => setSelected(null)} />
    </div>
  );
}


