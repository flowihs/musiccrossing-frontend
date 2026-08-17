import { LibraryPreview } from "@/widgets/library-preview";
import { TrackCarousel } from "@/widgets/track-carousel";

import { HOME_TRACK_SECTIONS } from "./_data/home.data";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <LibraryPreview />
      {HOME_TRACK_SECTIONS.map((section) => (
        <TrackCarousel
          key={section.title}
          title={section.title}
          tracks={section.tracks}
        />
      ))}
    </div>
  );
}
