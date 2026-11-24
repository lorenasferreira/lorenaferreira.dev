import { useTranslation } from "react-i18next";

import Header from "../../components/Header/Header";
import { contactUrl } from "../../services/contact";

import styles from "./Privacy.module.css";

function Privacy() {
  const { t, i18n } = useTranslation();

  return (
    <>
      <title>{t("privacy.meta.title")}</title>
      <Header />
      <main className={styles.policy} lang={i18n.resolvedLanguage}>
        <h1>{t("privacy.title")}</h1>
        {["scraps", "photos", "translation", "services", "storage", "requests"].map((section) => (
          <section key={section}>
            <h2>{t(`privacy.${section}.title`)}</h2>
            <p>{t(`privacy.${section}.text`)}</p>
          </section>
        ))}
        <a href={contactUrl(t("privacy.contact_message"))} target="_blank" rel="noreferrer">
          {t("privacy.contact")}
        </a>
      </main>
    </>
  );
}

export default Privacy;
