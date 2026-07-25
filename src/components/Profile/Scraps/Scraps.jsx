import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { createScrap, getScraps } from "../../../services/scraps";

import styles from "./Scraps.module.css";

const demoScraps = [
  {
    id: "demo-marina",
    author: "Marina B.",
    avatar: "/assets/img/mandy.png",
    message:
      "Muito orgulho de acompanhar toda essa evolução! O site ficou lindo e ainda tem muito sucesso pela frente 💜",
    approved: true,
    createdAt: "2026-07-20",
  },
  {
    id: "demo-lucas",
    author: "Lucas M.",
    avatar: "/assets/img/avatar1.png",
    message: "Parabéns pelo projeto! Tá ficando cada vez mais profissional.",
    approved: true,
    createdAt: "2026-07-18",
  },
];

function Scraps() {
  const { t } = useTranslation();

  const [scraps, setScraps] = useState([]);
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const remainingCharacters = 280 - message.length;

  useEffect(() => {
    async function loadScraps() {
      try {
        setIsLoading(true);
        setError("");

        const data = await getScraps();
        const approvedScraps = Array.isArray(data) ? data : [];

        setScraps([...approvedScraps, ...demoScraps]);
      } catch (requestError) {
        console.error("Erro ao carregar recados:", requestError);

        setError(t("profile.scraps.error_loading"));
        setScraps(demoScraps);
      } finally {
        setIsLoading(false);
      }
    }

    loadScraps();
  }, [t]);

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }

    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));
  }

  async function uploadImage(file) {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "lorkut_scraps");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/nea7lj3p/image/upload",
      {
        method: "POST",
        body: formData,
      },
    );

    if (!response.ok) {
      throw new Error("Could not upload image.");
    }

    const data = await response.json();

    return data.secure_url;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedAuthor = author.trim();
    const trimmedMessage = message.trim();

    if (!trimmedAuthor || !trimmedMessage) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");
      setSuccessMessage("");

      let avatar = null;

      if (selectedImage) {
        avatar = await uploadImage(selectedImage);
      }

      await createScrap({
        author: trimmedAuthor,
        message: trimmedMessage,
        avatar,
      });

      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }

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
              accept="image/*"
              hidden
              disabled={isSubmitting}
              onChange={handleImageChange}
            />
          </label>
        </div>

        <input
          type="text"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          placeholder={t("profile.scraps.form.name")}
          maxLength={100}
          disabled={isSubmitting}
          required
        />

        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={t("profile.scraps.form.message")}
          maxLength={280}
          disabled={isSubmitting}
          required
        />

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
        <p className={styles.successMessage}>{successMessage}</p>
      )}

      {error && <p className={styles.errorMessage}>{error}</p>}

      {isLoading ? (
        <p className={styles.status}>{t("profile.scraps.loading")}</p>
      ) : (
        <div className={styles.list}>
          {scraps.map((scrap) => (
            <article key={scrap.id} className={styles.card}>
              <img
                src={scrap.avatar || "/assets/img/default-avatar.png"}
                alt={scrap.author}
              />

              <div>
                <strong>{scrap.author}</strong>

                <p>{scrap.message}</p>

                <small>{formatDate(scrap.createdAt)}</small>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Scraps;
