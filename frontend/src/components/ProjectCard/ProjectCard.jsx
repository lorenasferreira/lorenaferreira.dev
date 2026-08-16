import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styles from "./ProjectCard.module.css";

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

function ProjectCard({ project }) {
  const { t } = useTranslation();

  return (
    <article className={styles.card}>
      <img
        className={styles.image}
        src={normalizeImagePath(project.thumbnail)}
        alt={project.title}
      />

      <h2 className={styles.title}>{project.title}</h2>

      {project.shortDescription && (
        <p className={styles.description}>{project.shortDescription}</p>
      )}

      {project.techStack && <p className={styles.stack}>{project.techStack}</p>}

      <Link className={styles.link} to={`/projects/${project.slug}`}>
        {t("projects.view_project")}
      </Link>
    </article>
  );
}

export default ProjectCard;
