import { useTranslation } from "react-i18next";

import styles from "./ProfileCounters.module.css";

const counters = [
  {
    translationKey: "profile.counters.scraps",
    valueKey: "scraps",
    icon: "/assets/icons/book.svg",
  },
  {
    translationKey: "profile.counters.photos",
    valueKey: "photos",
    icon: "/assets/icons/camera.svg",
  },
  {
    translationKey: "profile.counters.videos",
    valueKey: "videos",
    icon: "/assets/icons/video-camera.svg",
  },
  {
    translationKey: "profile.counters.fans",
    valueKey: "fans",
    icon: "/assets/icons/star.svg",
  },
];

function ProfileCounters({ scraps = 0, photos = 0, videos = 0, fans = 0 }) {
  const { t } = useTranslation();

  const values = {
    scraps,
    photos,
    videos,
    fans,
  };

  return (
    <div className={styles.container}>
      <ul className={styles.counters}>
        {counters.map((counter) => (
          <li key={counter.translationKey} className={styles.stat}>
            <span className={styles.label}>{t(counter.translationKey)}</span>

            <span className={styles.value}>
              <img
                src={counter.icon}
                className={styles.icon}
                alt=""
                aria-hidden="true"
              />

              <strong>{values[counter.valueKey]}</strong>
            </span>
          </li>
        ))}

        <li className={styles.stat}>
          <span className={styles.label}>{t("profile.counters.trustful")}</span>

          <span className={styles.value}>
            {[1, 2, 3].map((star) => (
              <img
                key={star}
                src="/assets/icons/star.svg"
                className={styles.icon}
                alt=""
                aria-hidden="true"
              />
            ))}
          </span>
        </li>

        <li className={styles.stat}>
          <span className={styles.label}>{t("profile.counters.cool")}</span>

          <span className={styles.value}>
            {[1, 2, 3].map((item) => (
              <img
                key={item}
                src="/assets/icons/cool.svg"
                className={styles.icon}
                alt=""
                aria-hidden="true"
              />
            ))}
          </span>
        </li>
      </ul>
    </div>
  );
}

export default ProfileCounters;
