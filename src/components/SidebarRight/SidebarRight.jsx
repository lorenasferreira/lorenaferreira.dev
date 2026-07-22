import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { getCommunities, getProjects } from "../../services/api";

import styles from "./SidebarRight.module.css";

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
        <p className={styles.loading}>Carregando...</p>
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
                src={project.thumbnail}
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
          {communities.map((community) => (
            <Link
              key={community.id ?? community.slug}
              to={`/communities/${community.slug}`}
              className={styles.thumbnailLink}
              title={community.title}
            >
              <img
                src={community.thumbnail}
                alt={community.title}
                className={styles.thumbnail}
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default SidebarRight;
