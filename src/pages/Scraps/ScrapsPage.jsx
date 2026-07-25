import { useTranslation } from "react-i18next";

import Header from "../../components/Header/Header";
import PageLayout from "../../components/PageLayout/PageLayout";
import SidebarLeft from "../../components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../components/SidebarRight/SidebarRight";
import Scraps from "../../components/Profile/Scraps/Scraps";

import styles from "./ScrapsPage.module.css";

function ScrapsPage() {
  const { t } = useTranslation();

  return (
    <>
      <Header />

      <div className={styles.desktopPage}>
        <PageLayout left={<SidebarLeft />} right={<SidebarRight />}>
          <main className={styles.content}>
            <header className={styles.pageHeader}>
              <h1>{t("scraps.page.title")}</h1>

              <p>{t("scraps.page.description")}</p>
            </header>

            <Scraps />
          </main>
        </PageLayout>
      </div>

      <main className={styles.mobilePage}>
        <header className={styles.pageHeader}>
          <h1>{t("scraps.page.title")}</h1>

          <p>{t("scraps.page.description")}</p>
        </header>

        <Scraps />
      </main>
    </>
  );
}

export default ScrapsPage;
