import styles from "./page.module.css";

interface SearchPageProps {
  searchParams: Promise<{ q?: string | string[] }>;
}

export const metadata = {
  title: "Поиск | MusicShare",
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = Array.isArray(q) ? q[0] : q;

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Поиск</h1>
      <p className={styles.description}>
        {query
          ? `Результаты для «${query}» появятся после подключения поискового API.`
          : "Введите название трека или исполнителя в строке поиска."}
      </p>
    </section>
  );
}
