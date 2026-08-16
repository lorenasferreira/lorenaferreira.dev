import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styles from "./ProfileMobile.module.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

function getImageUrl(imagePath) {
  if (!imagePath) {
    return "";
  }

  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  const normalizedPath = imagePath.startsWith("/")
    ? imagePath
    : `/${imagePath}`;

  return `${API_BASE}${normalizedPath}`;
}

function ProfileMobile({ projects = [], communities = [], isLoading = true }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("social");

  return (
    <main className={styles.profileMobile}>
      <section className={styles.mobileHeader}>
        <img
          src="/assets/img/avatar.png"
          className={styles.mobileAvatar}
          alt={t("common.name")}
        />

        <h1 className={styles.mobileName}>{t("common.name")}</h1>

        <p className={styles.mobileLocation}>{t("profile.values.hometown")}</p>

        <div className={styles.mobileActions}>
          <a href="#mobile-projects" className={styles.primaryButton}>
            {t("profile.mobile.view_projects")}
          </a>

          <a href="mailto:you@email.com" className={styles.secondaryButton}>
            {t("profile.mobile.message")}
          </a>
        </div>
      </section>

      <section className={styles.mobileCounters}>
        <div className={styles.mobileCounterItem}>
          <span>{t("profile.counters.scraps")}</span>
          <strong>2</strong>
        </div>

        <div className={styles.mobileCounterItem}>
          <span>{t("profile.counters.photos")}</span>
          <strong>4</strong>
        </div>

        <div className={styles.mobileCounterItem}>
          <span>{t("profile.counters.videos")}</span>
          <strong>2</strong>
        </div>

        <div className={styles.mobileCounterItem}>
          <span>{t("profile.counters.fans")}</span>
          <strong>0</strong>
        </div>
      </section>

      <section className={styles.mobileTabs}>
        <button
          type="button"
          className={`${styles.mobileTab} ${
            activeTab === "social" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("social")}
        >
          {t("profile.mobile.tab_social")}
        </button>

        <button
          type="button"
          className={`${styles.mobileTab} ${
            activeTab === "professional" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("professional")}
        >
          {t("profile.mobile.tab_professional")}
        </button>
      </section>

      {activeTab === "social" && (
        <section className={styles.mobileTabContent}>
          <div className={styles.mobileInformationBlock}>
            <strong>{t("profile.fields.birthday")}</strong>
            <p>10-07-1997</p>
          </div>

          <div className={styles.mobileInformationBlock}>
            <strong>{t("profile.fields.age")}</strong>
            <p>28</p>
          </div>

          <div className={styles.mobileInformationBlock}>
            <strong>{t("profile.fields.interests")}</strong>
            <p>{t("profile.values.interests")}</p>
          </div>

          <div className={styles.mobileInformationBlock}>
            <strong>{t("profile.fields.who_am_i")}</strong>
            <p>{t("profile.values.who_am_i")}</p>
          </div>

          <div className={styles.mobileInformationBlock}>
            <strong>{t("profile.fields.hometown")}</strong>
            <p>{t("profile.values.hometown")}</p>
          </div>
        </section>
      )}

      {activeTab === "professional" && (
        <section className={styles.mobileTabContent}>
          <div className={styles.mobileInformationBlock}>
            <strong>{t("profile.fields.webpages")}</strong>

            <p>
              <a
                href="https://www.linkedin.com/in/lorenasferreira/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("profile.links.linkedin")}
              </a>

              <span> | </span>

              <a
                href="https://github.com/lorenasferreira"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("profile.links.github")}
              </a>
            </p>
          </div>
        </section>
      )}

      <section className={styles.mobileSection} id="mobile-projects">
        <header className={styles.mobileSectionHeader}>
          <h2>{t("profile.mobile.my_projects")}</h2>

          <Link to="/projects">{t("common.view_all")}</Link>
        </header>

        {isLoading ? (
          <p className={styles.mobileStatus}>{t("projects.loading")}</p>
        ) : (
          <div className={styles.mobileHorizontalScroll}>
            {projects.map((project) => (
              <Link
                key={project.id ?? project.slug}
                to={`/projects/${project.slug}`}
                className={styles.mobileProjectCard}
              >
                <img src={getImageUrl(project.thumbnail)} alt={project.title} />

                <p>{project.title}</p>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className={styles.mobileSection}>
        <header className={styles.mobileSectionHeader}>
          <h2>{t("profile.mobile.communities")}</h2>

          <Link to="/communities">{t("common.view_all")}</Link>
        </header>

        {isLoading ? (
          <p className={styles.mobileStatus}>{t("communities.loading")}</p>
        ) : (
          <div className={styles.mobileHorizontalScroll}>
            {communities.map((community) => (
              <Link
                key={community.id ?? community.slug}
                to={`/communities/${community.slug}`}
                className={styles.mobileCommunityCard}
                title={community.title}
              >
                <img
                  src={getImageUrl(community.thumbnail)}
                  alt={community.title}
                />
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default ProfileMobile;