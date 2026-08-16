import { useTranslation } from "react-i18next";

import PageLayout from "../../PageLayout/PageLayout";
import SidebarLeft from "../../SidebarLeft/SidebarLeft";
import SidebarRight from "../../SidebarRight/SidebarRight";

import ProfileCounters from "../ProfileCounters/ProfileCounters";
import ProfileInformation from "../ProfileInformation/ProfileInformation";
import Scraps from "../Scraps/Scraps";
import VerifiedTestimonials from "../VerifiedTestimonials/VerifiedTestimonials";

import styles from "./ProfileDesktop.module.css";

function ProfileDesktop({ counters }) {
  const { t } = useTranslation();

  return (
    <div className={styles.desktopProfile}>
      <PageLayout left={<SidebarLeft />} right={<SidebarRight />}>
        <section className={styles.centralProfile}>
          <div className={styles.profileContent}>
            <header>
              <p className={styles.profileNameCentral}>{t("common.name")}</p>
            </header>

            <hr className={styles.dividerMain} />

            <ProfileCounters
              scraps={counters.scraps}
              photos={counters.photos}
              videos={counters.videos}
              fans={counters.fans}
            />

            <hr className={styles.dividerMain} />

            <div className={styles.profileStats}>
              <p>
                <strong>{t("profile.views.total")}</strong> 120,{" "}
                <strong>{t("profile.views.last_week")}</strong> 18,{" "}
                <strong>{t("profile.views.yesterday")}</strong> 4
              </p>
            </div>

            <hr className={styles.dividerMain} />

            <ProfileInformation
              birthDate="1997-10-07"
              linkedinUrl="https://www.linkedin.com/in/lorenasferreira/"
              githubUrl="https://github.com/lorenasferreira"
            />

            <Scraps />

            <VerifiedTestimonials />
          </div>
        </section>
      </PageLayout>
    </div>
  );
}

export default ProfileDesktop;
