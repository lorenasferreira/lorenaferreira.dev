import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { getCommunities, getProjects } from "../../services/api";

import styles from "./SidebarRight.module.css";

function normalizeImagePath(imagePath) {
  if (!imagePath) {
    return "";
  }

  if (
    imagePath.startsWith("http://") ||
    imagePath.startsWith("https://") ||
    imagePath.startsWith("/")
  ) {
    return imagePath;
  }

  return `/${imagePath}`;
}

function SidebarRight() {
  const { t } = useTranslation();

  const [projects, setProjects] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSidebarData() {
      try {
        const [projectsData, communitiesData] = await Promise.all([
          getProjects(),
          getCommunities(),
        ]);

        setProjects(Array.isArray(projectsData) ? projectsData : []);
        setCommunities(Array.isArray(communitiesData) ? communitiesData : []);
      } catch (error) {
        console.error("Erro ao carregar a sidebar:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadSidebarData();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.sidebar}>
        <p className={styles.loading}>{t("sidebar.loading")}</p>
      </div>
    );
  }

  return (
    <div className={styles.sidebar}>
      <section className={styles.section}>
        <header className={styles.sectionHeader}>
          <Link to="/projects" className={styles.sectionTitle}>
            {t("nav.projects")}
          </Link>

          <span className={styles.quantity}>({projects.length})</span>
        </header>

        <div className={styles.thumbnails}>
          {projects.map((project) => (
            <Link
              key={project.id ?? project.slug}
              to={`/projects/${project.slug}`}
              className={styles.thumbnailLink}
              title={project.title}
            >
              <img
                src={normalizeImagePath(project.thumbnail)}
                alt={project.title}
                className={styles.thumbnail}
              />
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <header className={styles.sectionHeader}>
          <Link to="/communities" className={styles.sectionTitle}>
            {t("nav.communities")}
          </Link>

          <span className={styles.quantity}>({communities.length})</span>
        </header>

        <div className={styles.thumbnails}>
          {communities.map((community) => {
            const translatedTitle = t(
              `communityDetails.${community.slug}.title`,
            );

            return (
              <Link
                key={community.id ?? community.slug}
                to={`/communities/${community.slug}`}
                className={styles.thumbnailLink}
                title={translatedTitle}
              >
                <img
                  src={normalizeImagePath(community.thumbnail)}
                  alt={translatedTitle}
                  className={styles.thumbnail}
                />
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default SidebarRight;
