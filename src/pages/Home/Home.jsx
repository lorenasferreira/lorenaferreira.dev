import { useTranslation } from "react-i18next";

import PageLayout from "../../components/PageLayout/PageLayout";
import SidebarLeft from "../../components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../components/SidebarRight/SidebarRight";
import Fortune from "../../components/Fortune/Fortune";
import ActivityFeed from "../../components/ActivityFeed/ActivityFeed";

import styles from "./Home.module.css";

function Home() {
  const { t } = useTranslation();

  return (
    <PageLayout left={<SidebarLeft />} right={<SidebarRight />}>
      <section className={styles.home}>
        <header className={styles.header}>
          <p className={styles.title}>
            {t("home.updates_from")} {t("common.name")}
          </p>
        </header>

        <hr className={styles.divider} />

        <div className={styles.content}>
          <Fortune />
          <ActivityFeed />
        </div>
      </section>
    </PageLayout>
  );
}

export default Home;
