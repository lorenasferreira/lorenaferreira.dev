import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { createScrap, getScraps } from "../../../services/scraps";

import ScrapCard from "./ScrapCard";

import styles from "./Scraps.module.css";

function Scraps({ onScrapsCountChange }) {
  const { t } = useTranslation();

  const [scraps, setScraps] = useState([]);
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const remainingCharacters = 780 - message.length;

  useEffect(() => {
    async function loadScraps() {
      try {
        setIsLoading(true);
        setError("");

        const data = await getScraps();
        const approvedScraps = Array.isArray(data) ? data : [];

        setScraps(approvedScraps);
      } catch (requestError) {
        console.error("Erro ao carregar recados:", requestError);

        setError(t("profile.scraps.error_loading"));
        setScraps([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadScraps();
  }, [t]);

  useEffect(() => {
    onScrapsCountChange?.(scraps.length);
  }, [scraps.length, onScrapsCountChange]);

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");
    if (!["image/jpeg", "image/png"].includes(file.type) || file.size > 5 * 1024 * 1024) {
      event.target.value = "";
      setSelectedImage(null);
      setPreviewImage(null);
      setError(t("privacy.photo_error"));
      return;
    }

    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;

    const trimmedAuthor = author.trim();
    const trimmedMessage = message.trim();

    if (!trimmedAuthor || !trimmedMessage || !confirmed) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");
      setSuccessMessage("");

      await createScrap({
        author: trimmedAuthor,
        message: trimmedMessage,
        confirmed,
        photo: selectedImage,
      });

      form.reset();
      setConfirmed(false);
      setAuthor("");
      setMessage("");
      setSelectedImage(null);
      setPreviewImage(null);

      setSuccessMessage(t("profile.scraps.success"));
    } catch (requestError) {
      console.error("Erro ao enviar recado:", requestError);
      setError(t("profile.scraps.error_sending"));
    } finally {
      setIsSubmitting(false);
    }
  }

  function formatDate(date) {
    if (!date) {
      return "";
    }

    const normalizedDate = date.split("T")[0];

    return new Intl.DateTimeFormat("pt-BR").format(
      new Date(`${normalizedDate}T00:00:00`),
    );
  }

  return (
    <section className={styles.scraps}>
      <header className={styles.header}>
        <h3>{t("profile.scraps.title")}</h3>

        <small>
          {scraps.length} {t("profile.scraps.total")}
        </small>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.imagePicker}>
          {previewImage ? (
            <img
              src={previewImage}
              alt={t("profile.scraps.form.image_preview")}
              className={styles.previewImage}
            />
          ) : (
            <div className={styles.emptyAvatar} aria-hidden="true">
              📷
            </div>
          )}

          <label className={styles.imageButton}>
            {previewImage
              ? t("profile.scraps.form.change_photo")
              : t("profile.scraps.form.add_photo")}

            <input
              type="file"
              accept="image/jpeg,image/png"
              className={styles.fileInput}
              disabled={isSubmitting}
              onChange={handleImageChange}
            />
          </label>
        </div>

        <input
          type="text"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          aria-label={t("profile.scraps.form.name")}
          placeholder={t("profile.scraps.form.name")}
          maxLength={100}
          disabled={isSubmitting}
          required
        />

        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          aria-label={t("profile.scraps.form.message")}
          placeholder={t("profile.scraps.form.message")}
          maxLength={780}
          disabled={isSubmitting}
          required
        />

        <label className={styles.confirmation}>
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(event) => setConfirmed(event.target.checked)}
            disabled={isSubmitting}
            required
          />
          <span>{t("privacy.confirmation")}</span>
        </label>

        <Link className={styles.privacyLink} to="/privacy">{t("footer.privacy")}</Link>

        <div className={styles.actions}>
          <small>{remainingCharacters}</small>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? t("profile.scraps.form.sending")
              : t("profile.scraps.form.post")}
          </button>
        </div>
      </form>

      {successMessage && (
        <p className={styles.successMessage} role="status">{successMessage}</p>
      )}

      {error && <p className={styles.errorMessage} role="alert">{error}</p>}

      {isLoading ? (
        <p className={styles.status}>{t("profile.scraps.loading")}</p>
      ) : (
        <>
          <p className={styles.swipeHint}>{t("scrap.swipe")}</p>
          <div className={styles.list} tabIndex={0} role="region" aria-label={t("profile.scraps.title")} onKeyDown={event => {
            if (event.target !== event.currentTarget || !window.matchMedia("(max-width: 600px)").matches) return;
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
              event.preventDefault();
              event.currentTarget.scrollBy({ left: event.currentTarget.clientWidth * .88 * (event.key === "ArrowRight" ? 1 : -1), behavior: "auto" });
            }
          }}>
            {scraps.map(scrap => <ScrapCard key={scrap.id} scrap={scrap} formatDate={formatDate} />)}
          </div>
        </>
      )}
    </section>
  );
}

export default Scraps;
