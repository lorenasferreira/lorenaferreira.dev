import styles from "./Login.module.css";
import { useTranslation, Trans } from "react-i18next";

export default function Login() {
  const { t, i18n } = useTranslation();

  const currentYear = new Date().getFullYear();
  const currentLanguage = i18n.resolvedLanguage || i18n.language;

  const whatsappMessage = encodeURIComponent(t("footer.contact_message"));

  const whatsappLink = `https://wa.me/34662321407?text=${whatsappMessage}`;

  return (
    <main className={styles.shell}>
      <div className={styles.langSwitch}>
        <button
          type="button"
          onClick={() => i18n.changeLanguage("en")}
          aria-current={currentLanguage === "en" ? "true" : undefined}
        >
          EN
        </button>

        <button
          type="button"
          onClick={() => i18n.changeLanguage("pt")}
          aria-current={currentLanguage === "pt" ? "true" : undefined}
        >
          PT
        </button>

        <button
          type="button"
          onClick={() => i18n.changeLanguage("es")}
          aria-current={currentLanguage === "es" ? "true" : undefined}
        >
          ES
        </button>

        <button
          type="button"
          onClick={() => i18n.changeLanguage("fr")}
          aria-current={currentLanguage === "fr" ? "true" : undefined}
        >
          FR
        </button>
      </div>

      <div className={styles.loginGrid}>
        <section
          className={`${styles.introBox} ${styles.orkutPanel}`}
          aria-labelledby="brand-title"
        >
          <h1 className={styles.logoWord} id="brand-title">
            {t("common.brand")}
          </h1>

          <p className={styles.introLine}>
            <Trans
              i18nKey="login.intro.1"
              components={{ strong: <strong /> }}
            />
          </p>

          <p className={styles.introLine}>
            <Trans
              i18nKey="login.intro.2"
              components={{ strong: <strong /> }}
            />
          </p>

          <p className={styles.introLine}>
            <Trans
              i18nKey="login.intro.3"
              components={{ strong: <strong /> }}
            />
          </p>
        </section>

        <aside className={styles.loginSide}>
          <section className={styles.loginCard} aria-labelledby="signin-title">
            <h2 id="signin-title" className={styles.signinTitle}>
              <Trans
                i18nKey="login.signin.title"
                components={{ strong: <strong /> }}
              />
            </h2>

            <img
              className={styles.avatar}
              src="/assets/img/avatar.png"
              alt={t("login.avatar.alt")}
            />

            <div className={styles.who}>
              <div className={styles.whoName}>{t("common.name")}</div>

              <div className={styles.whoRole}>{t("common.role")}</div>
            </div>
          </section>

          <section className={styles.ctaCard}>
            <a href="/profile" className={styles.btnPrimary}>
              {t("login.cta.profile")}
            </a>
          </section>
        </aside>
      </div>

      <footer className={styles.footerbar} role="contentinfo">
        <div className={styles.footerInner}>
          <small className={styles.copy}>
            © {currentYear} Lorena Ferreira — {t("footer.inspired")}
          </small>

          <nav className={styles.footLinks} aria-label="Footer">
            <a href="/about">{t("footer.about")}</a>

            <span aria-hidden="true">—</span>

            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              {t("footer.contact")}
            </a>

            <span aria-hidden="true">—</span>

            <a href="/privacy">{t("footer.privacy")}</a>

            <span aria-hidden="true">—</span>

            <a href="/terms">{t("footer.terms")}</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
