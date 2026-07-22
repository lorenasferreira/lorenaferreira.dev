import styles from "./PageLayout.module.css";

function PageLayout({ left, children, right }) {
  return (
    <main className={styles.layout}>
      <aside className={styles.sidebarLeft}>{left}</aside>

      <section className={styles.centralContent}>{children}</section>

      <aside className={styles.sidebarRight}>{right}</aside>
    </main>
  );
}

export default PageLayout;
