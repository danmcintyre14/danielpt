// Components/VideoLibrary/VideoLibrary.jsx
import { videoData } from '../../data/data';
import VideoCard from '../VideoCard/VideoCard';
import styles from './VideoLibrary.module.css';

export default function VideoLibrary() {
  return (
    <div>
      <h2 className={styles.heading}>Video Tutorials</h2>
      <div className={styles.videoGrid}>
        {videoData.map((video, index) => (
          <VideoCard key={index} {...video} />
        ))}
      </div>
    </div>
  );
}
