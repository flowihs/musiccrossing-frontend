import ImageS from "@/public/rectangle.png";
import Image from "next/image";
import Link from "next/link";
import styles from "./library.module.css";

interface props {
  title: string;
  href: string;
}

export function MyLibraryCard({ title, href }: props) {
  return (
    <Link className={styles.LibraryLink} href={href}>
      <div className={styles.MyLibraryCard}>
        <Image alt={title} src={ImageS} className={styles.MyLibraryCardImage} />
        <p className={styles.MyLibraryCardTitle}>{title}</p>
      </div>
    </Link>
  );
}
