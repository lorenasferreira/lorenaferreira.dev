import { useSyncExternalStore } from "react";
import { useTranslation } from "react-i18next";

import styles from "./ProjectMedia.module.css";

const mobileViewport = "(max-width: 768px)";

function isMobileViewport() {
  return window.matchMedia(mobileViewport).matches;
}

function subscribeToViewport(callback) {
  const query = window.matchMedia(mobileViewport);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

export default function ProjectVideo({ project }) {
  const { t } = useTranslation();
  const mobile = useSyncExternalStore(subscribeToViewport, isMobileViewport);
  const { desktop, mobile: mobileVideo } = project.walkthrough;
  const { file, width, height } = mobile && mobileVideo ? mobileVideo : desktop;

  return (
    <video
      key={file}
      className={styles.video}
      src={`/assets/img/projects/${project.slug}/videos/${file}`}
      poster={project.cover}
      width={width}
      height={height}
      style={{ "--video-ratio": width / height }}
      controls
      playsInline
      preload="none"
      aria-label={t("media.walkthrough", { project: project.title })}
    >
      {t("media.video_unavailable")}
    </video>
  );
}
