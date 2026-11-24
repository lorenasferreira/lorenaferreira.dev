import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

import Header from "../../components/Header/Header";
import PageLayout from "../../components/PageLayout/PageLayout";
import SidebarLeft from "../../components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../components/SidebarRight/SidebarRight";

import { getProjectBySlug } from "../../services/api";

import styles from "./Project.module.css";

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
    const controller = new AbortController();

    async function loadProject() {
      try {
        setIsLoading(true);
        setError("");
        setProject(null);

        const data = await getProjectBySlug(slug, { signal: controller.signal });
        if (controller.signal.aborted) return;

        if (!data) {
          setError(t("project.not_found"));
          return;
        }

        setProject(data);
      } catch (requestError) {
        if (controller.signal.aborted) return;
        console.error(requestError);
        setError(t("project.error"));
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    loadProject();
    return () => controller.abort();
  }, [slug, t]);

  useEffect(() => {
    if (project?.title) {
      document.title = `${project.title} | L.Orkut`;
    }

    return () => {
      document.title = t("projects.meta.title");
    };
  }, [project, t]);

  const details = project ? `projectDetails.${project.slug}` : "";
  const shortDescription = project
    ? t(`${details}.shortDescription`, { defaultValue: project.description || "" })
    : "";
  const fullDescription = project
    ? t(`${details}.fullDescription`, { defaultValue: "" })
    : "";
  const features = project && t(`${details}.features`, { returnObjects: true });

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
                {(project.cover || project.thumbnail) && (
                  <div className={styles.heroImage}>
                    <img
                      src={normalizeImagePath(project.cover || project.thumbnail)}
                      alt={t(`${details}.coverAlt`, { defaultValue: project.title })}
                    />
                  </div>
                )}

                <div className={styles.heroContent}>
                  {project.status && (
                    <span className={styles.techChip}>
                      {t(`project.status.${project.status}`)}
                    </span>
                  )}
                  {shortDescription && (
                    <p className={styles.shortDescription}>{shortDescription}</p>
                  )}
                  {fullDescription && (
                    <p className={styles.description}>{fullDescription}</p>
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

              {Array.isArray(features) && features.length > 0 && (
                <section className={styles.section}>
                  <h2 className={styles.sectionTitle}>{t("project.features")}</h2>
                  <ul className={styles.features}>
                    {features.map((feature) => <li key={feature}>{feature}</li>)}
                  </ul>
                </section>
              )}

              {project.screenshots?.length > 0 && (
                <section className={styles.section}>
                  <h2 className={styles.sectionTitle}>{t("project.screenshots")}</h2>
                  <div className={styles.gallery}>
                    {project.screenshots.map((filename, index) => {
                      const src = `/assets/img/projects/${project.slug}/${filename}`;
                      const caption = t(`${details}.screenshotCaptions.${index}`);

                      return (
                        <figure key={filename}>
                          <a href={src}>
                            <img src={src} alt={caption} loading="lazy" decoding="async" />
                          </a>
                          <figcaption>{caption}</figcaption>
                        </figure>
                      );
                    })}
                  </div>
                </section>
              )}
            </>
          )}
        </section>
      </PageLayout>
    </>
  );
}

export default Project;
