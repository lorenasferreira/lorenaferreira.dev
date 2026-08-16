import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "./ActivityFeed.module.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const API_URL = `${API_BASE}/api/feed`;
const PROJECTS_API_URL = `${API_BASE}/api/projects`;

const LOCALES = {
  en: "en-US",
  pt: "pt-BR",
  es: "es-ES",
  fr: "fr-FR",
};

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

function parsePayload(payload) {
  if (payload && typeof payload === "object") {
    return payload;
  }

  try {
    return JSON.parse(payload);
  } catch (error) {
    console.error("Could not parse feed payload:", error);
    return {};
  }
}

function ActivityFeed() {
  const { t, i18n } = useTranslation();

  const [activities, setActivities] = useState([]);
  const [projectsBySlug, setProjectsBySlug] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  function formatDate(dateValue) {
    if (!dateValue) {
      return "";
    }

    const activityDate = new Date(dateValue);
    const today = new Date();

    const activityDay = new Date(
      activityDate.getFullYear(),
      activityDate.getMonth(),
      activityDate.getDate(),
    );

    const currentDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );

    const differenceInDays = Math.round(
      (currentDay - activityDay) / (1000 * 60 * 60 * 24),
    );

    const language = i18n.resolvedLanguage || i18n.language || "en";
    const locale = LOCALES[language] || "en-US";

    const formattedTime = new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
    }).format(activityDate);

    if (differenceInDays === 0) {
      return `${t("feed.time.today")} · ${formattedTime}`;
    }

    if (differenceInDays === 1) {
      return `${t("feed.time.yesterday")} · ${formattedTime}`;
    }

    return new Intl.DateTimeFormat(locale, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(activityDate);
  }

  useEffect(() => {
    async function loadFeed() {
      try {
        setIsLoading(true);
        setError("");

        const [feedResponse, projectsResponse] = await Promise.all([
          fetch(API_URL),
          fetch(PROJECTS_API_URL),
        ]);

        if (!feedResponse.ok) {
          throw new Error(
            `Could not load feed. Status: ${feedResponse.status}`,
          );
        }

        if (!projectsResponse.ok) {
          throw new Error(
            `Could not load projects. Status: ${projectsResponse.status}`,
          );
        }

        const feedData = await feedResponse.json();
        const projectsData = await projectsResponse.json();

        const projectsMap = Object.fromEntries(
          projectsData.map((project) => [project.slug, project]),
        );

        setActivities(feedData);
        setProjectsBySlug(projectsMap);
      } catch (requestError) {
        console.error(requestError);
        setError(t("feed.error"));
      } finally {
        setIsLoading(false);
      }
    }

    loadFeed();
  }, [t]);

  if (isLoading) {
    return (
      <section className={styles.feed}>
        <p>{t("feed.loading")}</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.feed}>
        <p>{error}</p>
      </section>
    );
  }

  if (activities.length === 0) {
    return (
      <section className={styles.feed}>
        <p>{t("feed.empty")}</p>
      </section>
    );
  }

  return (
    <section className={styles.feed}>
      {activities.map((activity) => {
        const payload = parsePayload(activity.payload);

        if (activity.type === "new_project") {
          const project = projectsBySlug[payload.slug] || payload;

          return (
            <article className={styles.item} key={activity.id}>
              <header className={styles.header}>
                <img
                  className={styles.avatar}
                  src="/assets/img/avatar.png"
                  alt={t("login.avatar.alt")}
                />

                <div>
                  <p className={styles.title}>
                    <strong>{t("common.name")}</strong>{" "}
                    {t("feed.new_project.title")}
                  </p>

                  <time className={styles.meta} dateTime={activity.createdAt}>
                    {formatDate(activity.createdAt)}
                  </time>
                </div>
              </header>

              <div className={styles.body}>
                <div className={styles.thumbnail}>
                  <img
                    src={normalizeImagePath(project.thumbnail)}
                    alt={project.title}
                  />
                </div>

                <div>
                  <p className={styles.text}>
                    <strong>{project.title}</strong>
                  </p>

                  {payload.slug && (
                    <p className={styles.text}>
                      {t(`projectDetails.${payload.slug}.shortDescription`)}
                    </p>
                  )}

                  {project.techStack && (
                    <p className={styles.stack}>{project.techStack}</p>
                  )}

                  {project.liveUrl && (
                    <a
                      className={styles.link}
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t("feed.view_project")}
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        }

        if (activity.type === "new_community") {
          return (
            <article className={styles.item} key={activity.id}>
              <header className={styles.header}>
                <img
                  className={styles.avatar}
                  src="/assets/img/avatar.png"
                  alt={t("login.avatar.alt")}
                />

                <div>
                  <p className={styles.title}>
                    <strong>{t("common.name")}</strong>{" "}
                    {t("feed.new_community.title")}
                  </p>

                  <time className={styles.meta} dateTime={activity.createdAt}>
                    {formatDate(activity.createdAt)}
                  </time>
                </div>
              </header>

              <div className={styles.body}>
                <div className={styles.thumbnail}>
                  <img
                    src={normalizeImagePath(payload.thumbnail)}
                    alt={payload.title}
                  />
                </div>

                <div>
                  <p className={styles.text}>
                    <strong>{payload.title}</strong>
                  </p>

                  {payload.description && (
                    <p className={styles.text}>{payload.description}</p>
                  )}
                </div>
              </div>
            </article>
          );
        }

        return null;
      })}
    </section>
  );
}

export default ActivityFeed;
