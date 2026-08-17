import styles from "./main-shell.module.css";

interface MainShellProps {
  header: React.ReactNode;
  sidebar: React.ReactNode;
  modal: React.ReactNode;
  children: React.ReactNode;
}

export function MainShell({
  header,
  sidebar,
  modal,
  children,
}: MainShellProps) {
  return (
    <div className={styles.shell}>
      {header}
      <div className={styles.container}>
        {sidebar}
        <div className={styles.main}>
          <main className={styles.content}>{children}</main>
        </div>
      </div>
      {modal}
    </div>
  );
}
