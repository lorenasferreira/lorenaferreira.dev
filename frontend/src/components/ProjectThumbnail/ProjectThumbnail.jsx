import { useState } from "react";

import styles from "./ProjectThumbnail.module.css";

function ProjectThumbnail({ project, className, alt = "", loading }) {
  const [failedThumbnail, setFailedThumbnail] = useState(null);
  const useLogo = Boolean(project.cover && project.thumbnail !== failedThumbnail);
  const path = project.cover && !useLogo ? project.cover : project.thumbnail;
  if (!path) return null;

  const src = /^(https?:\/\/|\/)/.test(path) ? path : `/${path}`;

  return (
    <img
      className={[className, useLogo && styles.logo].filter(Boolean).join(" ")}
      src={src}
      alt={alt}
      loading={loading}
      onError={useLogo ? () => setFailedThumbnail(project.thumbnail) : undefined}
    />
  );
}

export default ProjectThumbnail;
