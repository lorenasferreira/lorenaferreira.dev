import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styles from "./Header.module.css";

const languages = ["en", "pt", "es", "fr"];

function Header() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentLanguage = i18n.resolvedLanguage?.split("-")[0] || "en";

  function handleLanguageChange(language) {
    i18n.changeLanguage(language);
  }

  function handleMobileLanguageChange(language) {
    i18n.changeLanguage(language);
    closeMobileMenu();
  }

  function handleSearch(event) {
    event.preventDefault();

    const trimmedSearchTerm = searchTerm.trim();

    if (!trimmedSearchTerm) {
      return;
    }

    navigate(`/search?q=${encodeURIComponent(trimmedSearchTerm)}`);
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

              <li className={styles.locked}>
                <span className={styles.navLink}>
                  {t("nav.scrapbook")}

                  <span className={styles.lockIcon} aria-hidden="true">
                    🔒
                  </span>
                </span>
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

            <form
              className={styles.search}
              role="search"
              onSubmit={handleSearch}
            >
              <input
                className={styles.searchInput}
                type="search"
                name="q"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder={t("nav.search_placeholder")}
                aria-label={t("nav.search")}
              />

              <button
                type="submit"
                className={styles.searchBtn}
                aria-label={t("nav.search")}
              >
                <svg
                  width="29"
                  height="29"
                  viewBox="0 0 39 39"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M31.85 34.125L21.6125 23.8875C20.8 24.5375 19.8656 25.0521 18.8094 25.4313C17.7531 25.8104 16.6292 26 15.4375 26C12.4854 26 9.98698 24.9776 7.94219 22.9328C5.8974 20.888 4.875 18.3896 4.875 15.4375C4.875 12.4854 5.8974 9.98698 7.94219 7.94219C9.98698 5.8974 12.4854 4.875 15.4375 4.875C18.3896 4.875 20.888 5.8974 22.9328 7.94219C24.9776 9.98698 26 12.4854 26 15.4375C26 16.6292 25.8104 17.7531 25.4313 18.8094C25.0521 19.8656 24.5375 20.8 23.8875 21.6125L34.125 31.85L31.85 34.125Z"
                    fill="#d2cfcf"
                  />
                </svg>
              </button>
            </form>

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

          <span className={styles.locked}>
            <span className={styles.navLink}>
              {t("nav.scrapbook")}

              <span className={styles.lockIcon} aria-hidden="true">
                🔒
              </span>
            </span>
          </span>

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
