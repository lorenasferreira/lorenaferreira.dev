import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

import Header from "../../components/Header/Header";
import PageLayout from "../../components/PageLayout/PageLayout";
import SidebarLeft from "../../components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../components/SidebarRight/SidebarRight";

import styles from "./Project.module.css";

const API_URL = "http://localhost:8080/api/projects";

function normalizeImagePath(path) {
  if (!path) {
    return "";
  }

  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("/")
  ) {
    return path;
  }

  return `/${path}`;
}

function Project() {
  const { slug } = useParams();
  const { t } = useTranslation();

  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const technologies = useMemo(() => {
    if (!project?.techStack) {
      return [];
    }

    return project.techStack
      .split(",")
      .map((technology) => technology.trim())
      .filter(Boolean);
  }, [project]);

  useEffect(() => {
    async function loadProject() {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/${encodeURIComponent(slug)}`);

        if (response.status === 404) {
          setError(t("project.not_found"));
          return;
        }

        if (!response.ok) {
          throw new Error(`Could not load project. Status: ${response.status}`);
        }

        const data = await response.json();
        setProject(data);
      } catch (requestError) {
        console.error(requestError);
        setError(t("project.error"));
      } finally {
        setIsLoading(false);
      }
    }

    loadProject();
  }, [slug, t]);

  useEffect(() => {
    if (project?.title) {
      document.title = `${project.title} | L.Orkut`;
    }

    return () => {
      document.title = t("projects.meta.title");
    };
  }, [project, t]);

  return (
    <>
      <Header />

      <PageLayout left={<SidebarLeft />} right={<SidebarRight />}>
        <section className={styles.project}>
          {isLoading && <p className={styles.status}>{t("project.loading")}</p>}

          {!isLoading && error && (
            <div className={styles.state}>
              <p className={styles.status}>{error}</p>

              <Link className={styles.backLink} to="/projects">
                {t("project.back_to_projects")}
              </Link>
            </div>
          )}

          {!isLoading && !error && project && (
            <>
              <header className={styles.pageHeader}>
                <div>
                  <Link className={styles.backLink} to="/projects">
                    ← {t("project.back_to_projects")}
                  </Link>

                  <h1 className={styles.title}>{project.title}</h1>
                </div>
              </header>

              <hr className={styles.divider} />

              <div className={styles.hero}>
                <div className={styles.heroImage}>
                  <img
                    src={normalizeImagePath(project.thumbnail)}
                    alt={project.title}
                  />
                </div>

                <div className={styles.heroContent}>
                  {project.shortDescription && (
                    <p className={styles.shortDescription}>
                      {project.shortDescription}
                    </p>
                  )}

                  {project.fullDescription && (
                    <p className={styles.description}>
                      {project.fullDescription}
                    </p>
                  )}

                  <div className={styles.buttons}>
                    {project.githubUrl && (
                      <a
                        className={styles.primaryButton}
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {t("project.github_repository")}
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        className={styles.secondaryButton}
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {t("project.live_demo")}
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {technologies.length > 0 && (
                <section className={styles.section}>
                  <h2 className={styles.sectionTitle}>
                    {t("project.tech_stack")}
                  </h2>

                  <div className={styles.techStack}>
                    {technologies.map((technology) => (
                      <span className={styles.techChip} key={technology}>
                        {technology}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>{t("project.photos")}</h2>

                <p className={styles.muted}>{t("project.no_photos")}</p>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>{t("project.videos")}</h2>

                <p className={styles.muted}>{t("project.no_videos")}</p>
              </section>
            </>
          )}
        </section>
      </PageLayout>
    </>
  );
}

export default Project;
