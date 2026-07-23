import { useEffect, useState } from "react";

import styles from "./ActivityFeed.module.css";

const API_URL = "http://localhost:8080/api/feed";

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
  if (typeof payload === "object") {
    return payload;
  }

  try {
    return JSON.parse(payload);
  } catch (error) {
    console.error("Erro ao interpretar o payload do feed:", error);
    return {};
  }
}

function formatDate(dateValue) {
  if (!dateValue) {
    return "";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(dateValue));
}

function ActivityFeed() {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadFeed() {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`Erro ao carregar o feed: ${response.status}`);
        }

        const data = await response.json();
        setActivities(data);
      } catch (requestError) {
        console.error(requestError);
        setError("Não foi possível carregar as atualizações.");
      } finally {
        setIsLoading(false);
      }
    }

    loadFeed();
  }, []);

  if (isLoading) {
    return (
      <section className={styles.feed}>
        <p>Carregando atualizações...</p>
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
        <p>Nenhuma atualização publicada ainda.</p>
      </section>
    );
  }

  return (
    <section className={styles.feed}>
      {activities.map((activity) => {
        const payload = parsePayload(activity.payload);

        if (activity.type === "new_project") {
          return (
            <article className={styles.item} key={activity.id}>
              <header className={styles.header}>
                <img
                  className={styles.avatar}
                  src="/assets/img/avatar.png"
                  alt="Lorena"
                />

                <div>
                  <p className={styles.title}>
                    <strong>Lorena</strong> publicou um novo projeto
                  </p>

                  <time className={styles.meta}>
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

                  {payload.shortDescription && (
                    <p className={styles.text}>{payload.shortDescription}</p>
                  )}

                  {payload.techStack && (
                    <p className={styles.stack}>{payload.techStack}</p>
                  )}

                  {payload.liveUrl && (
                    <a
                      className={styles.link}
                      href={payload.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Ver projeto
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
                  alt="Lorena"
                />

                <div>
                  <p className={styles.title}>
                    <strong>Lorena</strong> entrou em uma nova comunidade
                  </p>

                  <time className={styles.meta}>
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
