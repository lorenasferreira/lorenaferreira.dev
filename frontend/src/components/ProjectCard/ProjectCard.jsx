import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ProjectThumbnail from "../ProjectThumbnail/ProjectThumbnail";

import styles from "./ProjectCard.module.css";

function ProjectCard({ project }) {
  const { t } = useTranslation();

  const description = t(`projectDetails.${project.slug}.shortDescription`, {
    defaultValue: project.description || "",
  });

  return (
    <article className={styles.card}>
      {project.thumbnail && (
        <ProjectThumbnail
          className={styles.image}
          project={project}
          alt=""
          loading="lazy"
        />
      )}

      <h2 className={styles.title}>{project.title}</h2>

      {project.status && (
        <p className={styles.status}>{t(`project.status.${project.status}`)}</p>
      )}
      {description && <p className={styles.description}>{description}</p>}

      {project.techStack && <p className={styles.stack}>{project.techStack}</p>}

      <Link className={styles.link} to={`/projects/${project.slug}`}>
        {t("projects.view_project")}
      </Link>
    </article>
  );
}

export default ProjectCard;
