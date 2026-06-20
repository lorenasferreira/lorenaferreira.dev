import "../styles/login.css";
import { useTranslation, Trans } from "react-i18next";

export default function Login() {
  const { t, i18n } = useTranslation();

  const currentYear = new Date().getFullYear();

  const whatsappMessage = encodeURIComponent(t("footer.contact_message"));

  const whatsappLink = `https://wa.me/34662321407?text=${whatsappMessage}`;

  return (
    <main className="shell">
      <div className="lang-switch">
        <button
          onClick={() => i18n.changeLanguage("en")}
          aria-current={i18n.language === "en"}
        >
          EN
        </button>

        <button
          onClick={() => i18n.changeLanguage("pt")}
          aria-current={i18n.language === "pt"}
        >
          PT
        </button>

        <button
          onClick={() => i18n.changeLanguage("es")}
          aria-current={i18n.language === "es"}
        >
          ES
        </button>

        <button
          onClick={() => i18n.changeLanguage("fr")}
          aria-current={i18n.language === "fr"}
        >
          FR
        </button>
      </div>

      <div className="login-grid">
        <section
          className="intro-box orkut-panel"
          aria-labelledby="brand-title"
        >
          <h1 className="logo-word" id="brand-title">
            {t("common.brand")}
          </h1>

          <p className="intro-line">
            <Trans
              i18nKey="login.intro.1"
              components={{ strong: <strong /> }}
            />
          </p>

          <p className="intro-line">
            <Trans
              i18nKey="login.intro.2"
              components={{ strong: <strong /> }}
            />
          </p>

          <p className="intro-line">
            <Trans
              i18nKey="login.intro.3"
              components={{ strong: <strong /> }}
            />
          </p>
        </section>

        <aside className="login-side">
          <section className="login-card" aria-labelledby="signin-title">
            <h2 id="signin-title" className="signin-title">
              <Trans
                i18nKey="login.signin.title"
                components={{ strong: <strong /> }}
              />
            </h2>

            <img
              className="avatar"
              src="/assets/img/avatar.png"
              alt={t("login.avatar.alt")}
            />

            <div className="who">
              <div className="who-name">{t("common.name")}</div>

              <div className="who-role">{t("common.role")}</div>
            </div>
          </section>

          <section className="cta-card">
            <a href="/profile" className="btn-primary">
              {t("login.cta.profile")}
            </a>
          </section>
        </aside>
      </div>

      <footer className="footerbar" role="contentinfo">
        <div className="footer-inner">
          <small className="copy">
            © {currentYear} Lorena Ferreira — {t("footer.inspired")}
          </small>

          <nav className="foot-links" aria-label="Footer">
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
