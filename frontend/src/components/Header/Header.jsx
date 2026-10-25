import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import SiteSearch from "./SiteSearch";

import styles from "./Header.module.css";

const languages = ["en", "pt", "es", "fr"];

function Header() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentLanguage = i18n.resolvedLanguage?.split("-")[0] || "en";

  function handleLanguageChange(language) {
    i18n.changeLanguage(language);
  }

  function handleMobileLanguageChange(language) {
    i18n.changeLanguage(language);
    closeMobileMenu();
  }

  function handleLogout() {
    /*
      Depois, quando tivermos autenticação,
      vamos limpar o usuário/token aqui.
    */

    closeMobileMenu();
    navigate("/");
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  return (
    <>
      <header>
        <nav className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <Link className={styles.logoBrand} to="/home" aria-label="Lorkut">
              <div className={styles.logo}>l.orkut</div>
            </Link>

            <ul className={styles.menu}>
              <li>
                <NavLink to="/home">{t("nav.home")}</NavLink>
              </li>

              <li>
                <NavLink to="/profile">{t("nav.profile")}</NavLink>
              </li>

              <li>
                <NavLink to="/scraps">{t("nav.scrapbook")}</NavLink>
              </li>

              <li>
                <NavLink to="/projects">{t("nav.projects")}</NavLink>
              </li>

              <li>
                <NavLink to="/communities">{t("nav.communities")}</NavLink>
              </li>
            </ul>
          </div>

          <div className={styles.topbarRight}>
            <div className={styles.langSwitch} aria-label={t("nav.language")}>
              {languages.map((language) => (
                <button
                  key={language}
                  type="button"
                  className={`${styles.langButton} ${
                    currentLanguage === language ? styles.activeLanguage : ""
                  }`}
                  onClick={() => handleLanguageChange(language)}
                  aria-current={
                    currentLanguage === language ? "true" : undefined
                  }
                >
                  {language.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              type="button"
              className={styles.logoutBtn}
              onClick={handleLogout}
            >
              {t("nav.exit")}
            </button>

            <SiteSearch />

            <button
              className={styles.mobileNavBtn}
              type="button"
              aria-label={t("nav.open_menu")}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              ☰
            </button>
          </div>
        </nav>
      </header>

      {isMobileMenuOpen && (
        <button
          type="button"
          className={styles.mobileNavBackdrop}
          onClick={closeMobileMenu}
          aria-label={t("nav.close_menu")}
        />
      )}

      <aside
        className={`${styles.mobileNavDrawer} ${
          isMobileMenuOpen ? styles.mobileNavDrawerOpen : ""
        }`}
        aria-hidden={!isMobileMenuOpen}
        inert={!isMobileMenuOpen}
      >
        <div className={styles.mobileNavHead}>
          <strong>l.orkut</strong>

          <button
            className={styles.mobileNavClose}
            type="button"
            onClick={closeMobileMenu}
            aria-label={t("nav.close_menu")}
          >
            ✕
          </button>
        </div>

        <nav className={styles.mobileNavLinks}>
          <NavLink to="/home" onClick={closeMobileMenu}>
            {t("nav.home")}
          </NavLink>

          <NavLink to="/profile" onClick={closeMobileMenu}>
            {t("nav.profile")}
          </NavLink>

          <NavLink to="/scraps" onClick={closeMobileMenu}>
            {t("nav.scrapbook")}
          </NavLink>

          <NavLink to="/projects" onClick={closeMobileMenu}>
            {t("nav.projects")}
          </NavLink>

          <NavLink to="/communities" onClick={closeMobileMenu}>
            {t("nav.communities")}
          </NavLink>

          <div className={styles.mobileNavFooter}>
            <div
              className={styles.mobileLangSwitch}
              aria-label={t("nav.language")}
            >
              {languages.map((language) => (
                <button
                  key={language}
                  type="button"
                  className={
                    currentLanguage === language
                      ? styles.activeLanguage
                      : undefined
                  }
                  onClick={() => handleMobileLanguageChange(language)}
                  aria-current={
                    currentLanguage === language ? "true" : undefined
                  }
                >
                  {language.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              type="button"
              className={styles.mobileLogoutBtn}
              onClick={handleLogout}
            >
              {t("nav.exit")}
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}

export default Header;
