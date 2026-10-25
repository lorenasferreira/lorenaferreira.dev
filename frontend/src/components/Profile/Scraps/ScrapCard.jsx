import { useId, useState } from "react";
import { useTranslation } from "react-i18next";
import { translateScrap } from "../../../services/scraps";
import styles from "./Scraps.module.css";

export default function ScrapCard({ scrap, formatDate }) {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage?.split("-")[0] || "en";
  const id = useId();
  const [expanded, setExpanded] = useState(false);
  const [translations, setTranslations] = useState({});
  const [showTranslation, setShowTranslation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const translation = translations[language];
  const translated = showTranslation && translation && translation.sourceLanguage?.toLowerCase() !== language;
  const text = translated ? translation.text : scrap.message;
  const long = text.length > 240 || text.split("\n").length > 6;
  async function toggleTranslation() {
    if (translation) { setShowTranslation(!showTranslation); return; }
    setLoading(true); setError(false);
    try {
      const result = await translateScrap(scrap.id, language);
      setTranslations(previous => ({ ...previous, [language]: result }));
      setShowTranslation(true);
    } catch { setError(true); }
    finally { setLoading(false); }
  }
  return <article className={styles.card}>
    <img src={scrap.avatar || "/assets/img/default-avatar.png"} alt={scrap.author}/>
    <div className={styles.cardContent}>
      <strong>{scrap.author}</strong>
      <p id={id} className={long && !expanded ? styles.collapsed : undefined} lang={translated ? language : translation?.sourceLanguage?.toLowerCase()}>{text}</p>
      {long && <button className={`${styles.textAction} ${styles.expand}`} type="button" aria-expanded={expanded} aria-controls={id} onClick={() => setExpanded(!expanded)}>{t(expanded ? "scrap.less" : "scrap.more")}</button>}
      <div className={styles.translationActions}>
        {translation?.sourceLanguage?.toLowerCase() !== language && <button className={styles.textAction} type="button" disabled={loading} onClick={toggleTranslation}>{t(loading ? "scrap.loading" : translated ? "scrap.original" : "scrap.translate")}</button>}
        {translated && translation.sourceLanguage?.toLowerCase() !== language && <small>{t("scrap.automatic")}</small>}
        <span role="status">{error ? t("scrap.error") : loading ? t("scrap.loading") : ""}</span>
      </div>
      <small>{formatDate(scrap.createdAt)}</small>
    </div>
  </article>;
}
