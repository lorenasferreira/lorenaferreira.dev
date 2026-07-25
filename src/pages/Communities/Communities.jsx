import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Header from "../../components/Header/Header";
import PageLayout from "../../components/PageLayout/PageLayout";
import SidebarLeft from "../../components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../components/SidebarRight/SidebarRight";
import CommunityCard from "../../components/CommunityCard/CommunityCard";

import styles from "./Communities.module.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const API_URL = `${API_BASE}/api/communities`;

function Communities() {
  const { t } = useTranslation();

  const [communities, setCommunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCommunities() {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();
        setCommunities(data);
      } catch (err) {
        console.error(err);
        setError(t("communities.error"));
      } finally {
        setIsLoading(false);
      }
    }

    loadCommunities();
  }, [t]);

  return (
    <>
      <Header />

      <PageLayout left={<SidebarLeft />} right={<SidebarRight />}>
        <section className={styles.communities}>
          <header className={styles.header}>
            <h1 className={styles.title}>{t("communities.title")}</h1>
          </header>

          <hr className={styles.divider} />

          {isLoading && (
            <p className={styles.status}>{t("communities.loading")}</p>
          )}

          {!isLoading && error && <p className={styles.status}>{error}</p>}

          {!isLoading && !error && communities.length === 0 && (
            <p className={styles.status}>{t("communities.empty")}</p>
          )}

          {!isLoading && !error && communities.length > 0 && (
            <div className={styles.grid}>
              {communities.map((community) => (
                <CommunityCard key={community.id} community={community} />
              ))}
            </div>
          )}
        </section>
      </PageLayout>
    </>
  );
}

export default Communities;
