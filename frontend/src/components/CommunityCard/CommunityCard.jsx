import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styles from "./CommunityCard.module.css";

function getImageUrl(imagePath) {
  if (!imagePath) {
    return "/images/community-placeholder.png";
  }

  if (
    imagePath.startsWith("http://") ||
    imagePath.startsWith("https://") ||
    imagePath.startsWith("/")
  ) {
    return imagePath;
  }

  return `/${imagePath}`;
}

function CommunityCard({ community }) {
  const { t } = useTranslation();

  const translatedTitle = t(`communityDetails.${community.slug}.title`);
  return (
    <Link to={`/communities/${community.slug}`} className={styles.card}>
      <img
        src={getImageUrl(community.thumbnail)}
        alt={translatedTitle}
        className={styles.image}
      />

      <h3 className={styles.title}>{translatedTitle}</h3>
    </Link>
  );
}

export default CommunityCard;
