import { Link } from "react-router-dom";

import styles from "./CommunityCard.module.css";

const API_BASE = "http://localhost:8080";

function getImageUrl(imagePath) {
  if (!imagePath) {
    return "/images/community-placeholder.png";
  }

  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  const normalizedPath = imagePath.startsWith("/")
    ? imagePath
    : `/${imagePath}`;

  return `${API_BASE}${normalizedPath}`;
}

function CommunityCard({ community }) {
  return (
    <Link to={`/communities/${community.slug}`} className={styles.card}>
      <img
        src={getImageUrl(community.thumbnail)}
        alt={community.title}
        className={styles.image}
      />

      <h3 className={styles.title}>{community.title}</h3>
    </Link>
  );
}

export default CommunityCard;
