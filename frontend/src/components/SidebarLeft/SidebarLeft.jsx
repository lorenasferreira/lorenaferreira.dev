import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styles from "./SidebarLeft.module.css";

const profileNavigation = [
  {
    translationKey: "sidebar.profile",
    icon: "/assets/icons/user.svg",
    to: "/profile",
  },
  {
    translationKey: "sidebar.scrapbook",
    icon: "/assets/icons/book.svg",
    to: "/scraps",
  },
  {
    translationKey: "sidebar.photos",
    icon: "/assets/icons/camera.svg",
  },
  {
    translationKey: "sidebar.videos",
    icon: "/assets/icons/video-camera.svg",
  },
  {
    translationKey: "sidebar.testimonials",
    icon: "/assets/icons/sun.svg",
    to: "/testimonials",
  },
];

const apps = [
  {
    name: "BuddyPoke",
    icon: "/assets/icons/apps.svg",
  },
  {
    name: "Happy Harvest",
    icon: "/assets/icons/apps.svg",
  },
];

function SidebarLeft() {
  const { t } = useTranslation();

  return (
    <aside
      className={styles.sidebarLeft}
      aria-label={t("sidebar.profile_navigation")}
    >
      <img
        src="/assets/img/avatar.png"
        alt={t("sidebar.profile_picture")}
        className={styles.profilePicture}
      />

      <div className={styles.profileCard}>
        <h1 className={styles.profileName}>{t("common.name")}</h1>

        <h2 className={styles.location}>Barcelona, Spain</h2>

        <hr className={styles.divider} />

        <nav
          className={styles.profileNav}
          aria-label={t("sidebar.profile_navigation")}
        >
          <ul>
            {profileNavigation.map((item) => (
              <li key={item.translationKey}>
                <img
                  className={styles.icon}
                  src={item.icon}
                  alt=""
                  aria-hidden="true"
                />

                {item.to ? (
                  <Link to={item.to}>{t(item.translationKey)}</Link>
                ) : (
                  <span>{t(item.translationKey)}</span>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <hr className={styles.divider} />

        <span className={styles.appsTitle}>{t("sidebar.apps")}</span>

        <nav className={styles.appsNav} aria-label={t("sidebar.apps")}>
          <ul>
            {apps.map((app) => (
              <li key={app.name}>
                <img
                  className={styles.icon}
                  src={app.icon}
                  alt=""
                  aria-hidden="true"
                />

                <span>{app.name}</span>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default SidebarLeft;
