import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { portfolioProjects } from "../../data/portfolioProjects";
import { getCommunities, getProjects } from "../../services/api";

import ProjectThumbnail from "../ProjectThumbnail/ProjectThumbnail";

import styles from "./ActivityFeed.module.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const API_URL = `${API_BASE}/api/feed`;
const catalogBySlug = Object.fromEntries(
  portfolioProjects.map((project) => [project.slug, project]),
);

const LOCALES = {
  en: "en-US",
  pt: "pt-BR",
  es: "es-ES",
  fr: "fr-FR",
};

function normalizeImagePath(path) {
  if (!path) {
    return undefined;
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

async function getActivities() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Could not load feed. Status: ${response.status}`);
  }
  return response.json();
}

function ActivityFeed() {
  const { t, i18n } = useTranslation();

  const [activities, setActivities] = useState([]);
  const [projectsBySlug, setProjectsBySlug] = useState({});
  const [communitiesBySlug, setCommunitiesBySlug] = useState({});

  const language = i18n.resolvedLanguage || i18n.language || "en";
  const locale = LOCALES[language] || "en-US";
  const projectDateFormatter = new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeZone: "UTC",
  });

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
    let active = true;

    getActivities()
      .then((feed) => {
        if (active && Array.isArray(feed)) setActivities(feed);
      })
      .catch((error) => console.warn("Could not load feed activities:", error));

    getProjects().then((projects) => {
      if (active) {
        setProjectsBySlug(Object.fromEntries(
          projects.map((project) => [project.slug, project]),
        ));
      }
    });

    getCommunities()
      .then((communities) => {
        if (active && Array.isArray(communities)) {
          setCommunitiesBySlug(Object.fromEntries(
            communities.map((community) => [community.slug, community]),
          ));
        }
      })
      .catch((error) => console.warn("Could not load feed communities:", error));

    return () => { active = false; };
  }, []);

  const projectSlugs = new Set();
  const featuredActivities = new Map();
  const history = activities
    .map((activity) => ({ ...activity, payload: parsePayload(activity.payload) || {} }))
    .filter((activity) => {
      const { type, payload: { slug } } = activity;
      if (type !== "new_project" || !slug) return true;
      if (projectSlugs.has(slug)) return false;
      projectSlugs.add(slug);

      if (Object.hasOwn(catalogBySlug, slug)) {
        featuredActivities.set(slug, activity);
        return false;
      }

      return true;
    });

  const feedItems = [
    ...portfolioProjects.map((project) => featuredActivities.get(project.slug) ?? {
      id: `portfolio-${project.slug}`,
      type: "new_project",
      payload: project,
    }),
    ...history,
  ].map((activity) => {
    if (activity.type !== "new_project") return activity;

    const { slug } = activity.payload;
    const project = {
      ...activity.payload,
      ...catalogBySlug[slug],
      ...projectsBySlug[slug],
    };

    return {
      ...activity,
      project,
      description: t(`projectDetails.${slug}.shortDescription`, {
        defaultValue: project.description || "",
      }),
      date: activity.createdAt ?? project.completedAt,
    };
  });

  return (
    <section className={styles.feed}>
      {feedItems.map((activity) => {
        const { payload } = activity;

        if (activity.type === "new_project") {
          const { project, description, date } = activity;

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

                  {date && (
                    <time className={styles.meta} dateTime={date}>
                      {projectDateFormatter.format(new Date(date.slice(0, 10)))}
                    </time>
                  )}
                </div>
              </header>

              <div className={styles.body}>
                <div className={styles.thumbnail}>
                  <ProjectThumbnail
                    project={project}
                    alt={project.title}
                  />
                </div>

                <div>
                  <p className={styles.text}>
                    <strong>{project.title}</strong>
                  </p>

                  {description && <p className={styles.text}>{description}</p>}

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
          const community = communitiesBySlug[payload.slug] || payload;

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
                    src={normalizeImagePath(community.thumbnail)}
                    alt={community.title}
                  />
                </div>

                <div>
                  <p className={styles.text}>
                    <strong>
                      {t(`communityDetails.${community.slug}.title`)}
                    </strong>
                  </p>

                  {payload.slug && (
                    <p className={styles.text}>
                      {t(`communityDetails.${payload.slug}.description`)}
                    </p>
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
