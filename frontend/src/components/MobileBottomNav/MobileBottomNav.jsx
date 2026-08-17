import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  HiOutlineHome,
  HiOutlineUser,
  HiOutlinePencilSquare,
  HiOutlineCodeBracket,
  HiOutlineUserGroup,
} from "react-icons/hi2";

import styles from "./MobileBottomNav.module.css";

function MobileBottomNav() {
  const { t } = useTranslation();
  const location = useLocation();

  const [isVisible, setIsVisible] = useState(false);
  const [isScrapsVisible, setIsScrapsVisible] = useState(false);

  const scrollTimeoutRef = useRef(null);

  const isLogin = location.pathname === "/";

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY < 80) {
        setIsVisible(false);
        return;
      }

      setIsVisible(true);

      window.clearTimeout(scrollTimeoutRef.current);

      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsVisible(false);
      }, 1500);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const scrapsSection = document.getElementById("mobile-scraps");

    if (!scrapsSection) {
      setIsScrapsVisible(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrapsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(scrapsSection);

    return () => observer.disconnect();
  }, [location.pathname]);

  if (isLogin) {
    return null;
  }

  const isHome = location.pathname === "/home";

  const isProfile = location.pathname === "/profile" && !isScrapsVisible;

  const isProjects = location.pathname.startsWith("/projects");

  const isCommunities = location.pathname.startsWith("/communities");

  function scrollToScraps() {
    const scrapsSection = document.getElementById("mobile-scraps");

    if (scrapsSection) {
      scrapsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  return (
    <nav
      className={`${styles.nav} ${isVisible ? styles.visible : styles.hidden}`}
      aria-label={t("nav.mobile_navigation")}
    >
      <Link
        to="/home"
        className={`${styles.item} ${isHome ? styles.active : ""}`}
        aria-label={t("nav.home")}
        title={t("nav.home")}
      >
        <HiOutlineHome className={styles.icon} aria-hidden="true" />
      </Link>

      <Link
        to="/profile"
        className={`${styles.item} ${isProfile ? styles.active : ""}`}
        aria-label={t("nav.profile")}
        title={t("nav.profile")}
      >
        <HiOutlineUser className={styles.icon} aria-hidden="true" />
      </Link>

      {location.pathname === "/profile" ? (
        <button
          type="button"
          className={`${styles.item} ${isScrapsVisible ? styles.active : ""}`}
          onClick={scrollToScraps}
          aria-label={t("profile.scraps.title")}
          title={t("profile.scraps.title")}
        >
          <HiOutlinePencilSquare className={styles.icon} aria-hidden="true" />
        </button>
      ) : (
        <Link
          to="/profile#mobile-scraps"
          className={styles.item}
          aria-label={t("profile.scraps.title")}
          title={t("profile.scraps.title")}
        >
          <HiOutlinePencilSquare className={styles.icon} aria-hidden="true" />
        </Link>
      )}

      <Link
        to="/projects"
        className={`${styles.item} ${isProjects ? styles.active : ""}`}
        aria-label={t("nav.projects")}
        title={t("nav.projects")}
      >
        <HiOutlineCodeBracket className={styles.icon} aria-hidden="true" />
      </Link>

      <Link
        to="/communities"
        className={`${styles.item} ${isCommunities ? styles.active : ""}`}
        aria-label={t("nav.communities")}
        title={t("nav.communities")}
      >
        <HiOutlineUserGroup className={styles.icon} aria-hidden="true" />
      </Link>
    </nav>
  );
}

export default MobileBottomNav;
