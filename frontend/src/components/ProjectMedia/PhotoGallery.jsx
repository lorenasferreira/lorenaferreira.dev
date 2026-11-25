import { useTranslation } from "react-i18next";

import styles from "./ProjectMedia.module.css";

export default function PhotoGallery({ photos, title }) {
  const { t } = useTranslation();

  return (
    <div className={styles.gallery}>
      {photos.map(({ src, captionKey }) => {
        const caption = t(captionKey, { defaultValue: title });

        return (
          <figure key={src}>
            <a href={src}>
              <img src={src} alt={caption} loading="lazy" decoding="async" />
            </a>
            <figcaption>{caption}</figcaption>
          </figure>
        );
      })}
    </div>
  );
}
