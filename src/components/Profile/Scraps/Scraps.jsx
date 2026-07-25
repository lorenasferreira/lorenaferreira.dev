import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "./Scraps.module.css";

const fakeScraps = [
  {
    id: 1,
    author: "Marina B.",
    avatar: "/assets/img/mandy.png",
    message:
      "Muito orgulho de acompanhar toda essa evolução! O site ficou lindo e ainda tem muito sucesso pela frente 💜",
    approved: true,
    createdAt: "2026-07-20",
  },
  {
    id: 2,
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

  const remainingCharacters = 280 - message.length;

  useEffect(() => {
    loadScraps();
  }, []);

  async function loadScraps() {
    /*
      Depois será:

      const response = await fetch("/api/scraps");
      const data = await response.json();

      setScraps(data);
    */

    setScraps(fakeScraps);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedAuthor = author.trim();
    const trimmedMessage = message.trim();

    if (!trimmedAuthor || !trimmedMessage) {
      return;
    }

    const newScrap = {
      id: Date.now(),
      author: trimmedAuthor,
      avatar: `https://i.pravatar.cc/80?u=${Date.now()}`,
      message: trimmedMessage,
      approved: true,
      createdAt: new Date().toISOString(),
    };

    setScraps((current) => [newScrap, ...current]);

    setAuthor("");
    setMessage("");
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
        <input
          type="text"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          placeholder={t("profile.scraps.form.name")}
          required
        />

        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={t("profile.scraps.form.message")}
          maxLength={280}
          required
        />

        <div className={styles.actions}>
          <small>{remainingCharacters}</small>

          <button type="submit">{t("profile.scraps.form.post")}</button>
        </div>
      </form>

      <div className={styles.list}>
        {scraps
          .filter((scrap) => scrap.approved)
          .map((scrap) => (
            <article key={scrap.id} className={styles.card}>
              <img src={scrap.avatar} alt={scrap.author} />

              <div>
                <strong>{scrap.author}</strong>

                <p>{scrap.message}</p>

                <small>{scrap.createdAt}</small>
              </div>
            </article>
          ))}
      </div>
    </section>
  );
}

export default Scraps;
