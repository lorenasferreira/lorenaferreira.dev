import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Header from "../../components/Header/Header";
import PageLayout from "../../components/PageLayout/PageLayout";
import SidebarLeft from "../../components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../components/SidebarRight/SidebarRight";

import styles from "./Community.module.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

function getImageUrl(imagePath) {
  if (!imagePath) {
    return "";
  }

  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  const normalizedPath = imagePath.startsWith("/")
    ? imagePath
    : `/${imagePath}`;

  return `${API_BASE}${normalizedPath}`;
}

function Community() {
  const { slug } = useParams();
  const { t } = useTranslation();

  const [community, setCommunity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCommunity() {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(`${API_BASE}/api/communities/${slug}`);

        if (response.status === 404) {
          setCommunity(null);
          return;
        }

        if (!response.ok) {
          throw new Error(
            `Could not load community. Status: ${response.status}`,
          );
        }

        const data = await response.json();
        setCommunity(data);
      } catch (requestError) {
        console.error(requestError);
        setError(t("community.error"));
      } finally {
        setIsLoading(false);
      }
    }

    loadCommunity();
  }, [slug, t]);

  return (
    <>
      <Header />

      <PageLayout left={<SidebarLeft />} right={<SidebarRight />}>
        <section className={styles.community}>
          {!isLoading && error && (
            <div className={styles.state}>
              <p className={styles.status}>{error}</p>

              <Link className={styles.backLink} to="/communities">
                ← {t("community.back_to_communities")}
              </Link>
            </div>
          )}

          {!isLoading && !error && !community && (
            <div className={styles.state}>
              <p className={styles.status}>{t("community.not_found")}</p>

              <Link className={styles.backLink} to="/communities">
                ← {t("community.back_to_communities")}
              </Link>
            </div>
          )}

          {!isLoading && !error && community && (
            <>
              <header className={styles.pageHeader}>
                <div>
                  <Link className={styles.backLink} to="/communities">
                    ← {t("community.back_to_communities")}
                  </Link>

                  <h1 className={styles.title}>{community.title}</h1>
                </div>
              </header>

              <hr className={styles.divider} />

              <div className={styles.content}>
                <img
                  src={getImageUrl(community.thumbnail)}
                  alt={community.title}
                  className={styles.thumbnail}
                />

                <p className={styles.description}>{community.description}</p>
              </div>
            </>
          )}
        </section>
      </PageLayout>
    </>
  );
}

export default Community;
