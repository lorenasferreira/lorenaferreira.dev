import { useTranslation } from "react-i18next";

import Header from "../../components/Header/Header";
import PageLayout from "../../components/PageLayout/PageLayout";
import SidebarLeft from "../../components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../components/SidebarRight/SidebarRight";
import VerifiedTestimonials from "../../components/Profile/VerifiedTestimonials/VerifiedTestimonials";

import styles from "./TestimonialsPage.module.css";

function TestimonialsPage() {
  const { t } = useTranslation();

  return (
    <>
      <Header />

      <div className={styles.desktopPage}>
        <PageLayout left={<SidebarLeft />} right={<SidebarRight />}>
          <main className={styles.content}>
            <header className={styles.pageHeader}>
              <h1>{t("testimonials.page.title")}</h1>

              <p>{t("testimonials.page.description")}</p>
            </header>

            <VerifiedTestimonials />
          </main>
        </PageLayout>
      </div>

      <main className={styles.mobilePage}>
        <header className={styles.pageHeader}>
          <h1>{t("testimonials.page.title")}</h1>

          <p>{t("testimonials.page.description")}</p>
        </header>

        <VerifiedTestimonials />
      </main>
    </>
  );
}

export default TestimonialsPage;
