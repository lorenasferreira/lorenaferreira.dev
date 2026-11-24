import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Header from "../../components/Header/Header";
import PageLayout from "../../components/PageLayout/PageLayout";
import SidebarLeft from "../../components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../components/SidebarRight/SidebarRight";
import ProjectCard from "../../components/ProjectCard/ProjectCard";

import { getProjects } from "../../services/api";

import styles from "./Projects.module.css";

function Projects() {
  const { t } = useTranslation();

  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProjects() {
      try {
        setIsLoading(true);
        setError("");

        setProjects(await getProjects());
      } catch (requestError) {
        console.error(requestError);
        setError(t("projects.error"));
      } finally {
        setIsLoading(false);
      }
    }

    loadProjects();
  }, [t]);

  return (
    <>
      <Header />

      <PageLayout left={<SidebarLeft />} right={<SidebarRight />}>
        <section className={styles.projects}>
          <header className={styles.header}>
            <h1 className={styles.title}>{t("projects.title")}</h1>
          </header>

          <hr className={styles.divider} />

          {isLoading && (
            <p className={styles.status}>{t("projects.loading")}</p>
          )}

          {!isLoading && error && <p className={styles.status}>{error}</p>}

          {!isLoading && !error && projects.length === 0 && (
            <p className={styles.status}>{t("projects.empty")}</p>
          )}

          {!isLoading && !error && projects.length > 0 && (
            <div className={styles.grid}>
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          )}
        </section>
      </PageLayout>
    </>
  );
}

export default Projects;
