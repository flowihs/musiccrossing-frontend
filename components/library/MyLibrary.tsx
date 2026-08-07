import { MyLibraryCard } from "@/components/library/MyLibraryCard";
import styles from "./library.module.css";

interface props {
  title: string;
}

export function MyLibrary({ title }: props) {
  return (
    <div className={styles.MyLibrary}>
      <p className={styles.MyLibraryTitle}>{title}</p>
      <div className={styles.MyLibraryContainer}>
        <MyLibraryCard title={"Sport music"} href={"sport"} />
        <MyLibraryCard title={"My Music"} href={"sport"} />
        <MyLibraryCard title={"Sport music"} href={"sport"} />
        <MyLibraryCard title={"My Music"} href={"sport"} />
      </div>
    </div>
  );
}
