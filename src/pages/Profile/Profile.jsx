import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Header from "../../components/Header/Header";
import PageLayout from "../../components/PageLayout/PageLayout";
import SidebarLeft from "../../components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../components/SidebarRight/SidebarRight";

import { getCommunities, getProjects } from "../../services/api";

import styles from "./Profile.module.css";

const API_BASE = "http://localhost:8080";

const profileCounters = [
  {
    translationKey: "profile.counters.scraps",
    value: 3,
    icon: "/assets/icons/book.svg",
  },
  {
    translationKey: "profile.counters.photos",
    value: 4,
    icon: "/assets/icons/camera.svg",
  },
  {
    translationKey: "profile.counters.videos",
    value: 2,
    icon: "/assets/icons/video-camera.svg",
  },
  {
    translationKey: "profile.counters.fans",
    value: 0,
    icon: "/assets/icons/star.svg",
  },
];

const initialTestimonials = [
  {
    id: 1,
    author: "Marina B.",
    messageKey: "profile.fake_testimonials.0.message",
    avatar: "/assets/img/mandy.png",
  },
  {
    id: 2,
    author: "Lucas M.",
    messageKey: "profile.fake_testimonials.1.message",
    avatar: "/assets/img/avatar1.png",
  },
];

function getImageUrl(imagePath) {
  if (!imagePath) {
    return "";
  }

  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  const normalizedPath = imagePath.startsWith("/")
    ? imagePath
    : `/${imagePath}`;

  return `${API_BASE}${normalizedPath}`;
}

function Profile() {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState("social");

  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [testimonials, setTestimonials] = useState(initialTestimonials);

  const [projects, setProjects] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [isMobileContentLoading, setIsMobileContentLoading] = useState(true);

  const remainingCharacters = 280 - message.length;

  useEffect(() => {
    async function loadMobileContent() {
      try {
        const [projectsData, communitiesData] = await Promise.all([
          getProjects(),
          getCommunities(),
        ]);

        setProjects(Array.isArray(projectsData) ? projectsData : []);
        setCommunities(Array.isArray(communitiesData) ? communitiesData : []);
      } catch (error) {
        console.error("Erro ao carregar conteúdo do perfil:", error);

        setProjects([]);
        setCommunities([]);
      } finally {
        setIsMobileContentLoading(false);
      }
    }

    loadMobileContent();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedAuthor = author.trim();
    const trimmedMessage = message.trim();

    if (!trimmedAuthor || !trimmedMessage) {
      return;
    }

    const newTestimonial = {
      id: Date.now(),
      author: trimmedAuthor,
      message: trimmedMessage,
      avatar: `https://i.pravatar.cc/80?u=${Date.now()}`,
    };

    setTestimonials((currentTestimonials) => [
      newTestimonial,
      ...currentTestimonials,
    ]);

    setAuthor("");
    setMessage("");
  }

  return (
    <>
      <Header />

      <div className={styles.desktopProfile}>
        <PageLayout left={<SidebarLeft />} right={<SidebarRight />}>
          <section className={styles.centralProfile}>
            <div className={styles.profileContent}>
              <header>
                <p className={styles.profileNameCentral}>{t("common.name")}</p>
              </header>

              <hr className={styles.dividerMain} />

              <div className={styles.containerCentral}>
                <ul className={styles.profileCounters}>
                  {profileCounters.map((counter) => (
                    <li key={counter.translationKey} className={styles.stat}>
                      <span className={styles.label}>
                        {t(counter.translationKey)}
                      </span>

                      <span className={styles.value}>
                        <img
                          src={counter.icon}
                          className={styles.icon}
                          alt=""
                        />

                        <strong>{counter.value}</strong>
                      </span>
                    </li>
                  ))}

                  <li className={styles.stat}>
                    <span className={styles.label}>
                      {t("profile.counters.trustful")}
                    </span>

                    <span className={styles.value}>
                      {[1, 2, 3].map((star) => (
                        <img
                          key={star}
                          src="/assets/icons/star.svg"
                          className={styles.icon}
                          alt=""
                        />
                      ))}
                    </span>
                  </li>

                  <li className={styles.stat}>
                    <span className={styles.label}>
                      {t("profile.counters.cool")}
                    </span>

                    <span className={styles.value}>
                      {[1, 2, 3].map((item) => (
                        <img
                          key={item}
                          src="/assets/icons/cool.svg"
                          className={styles.icon}
                          alt=""
                        />
                      ))}
                    </span>
                  </li>
                </ul>
              </div>

              <hr className={styles.dividerMain} />

              <div className={styles.profileStats}>
                <p>
                  <strong>{t("profile.views.total")}</strong> 120,{" "}
                  <strong>{t("profile.views.last_week")}</strong> 18,{" "}
                  <strong>{t("profile.views.yesterday")}</strong> 4
                </p>
              </div>

              <hr className={styles.dividerMain} />

              <div className={styles.profileInformation}>
                <div className={styles.darkBlue}>
                  <p>
                    <span className={styles.profileTitles}>
                      {t("profile.fields.birthday")}
                    </span>
                    10-07-1997
                  </p>
                </div>

                <div className={styles.lightBlue}>
                  <p>
                    <span className={styles.profileTitles}>
                      {t("profile.fields.age")}
                    </span>
                    28
                  </p>
                </div>

                <div className={styles.darkBlue}>
                  <p>
                    <span className={styles.profileTitles}>
                      {t("profile.fields.interests")}
                    </span>

                    {t("profile.values.interests")}
                  </p>
                </div>

                <div className={styles.lightBlue}>
                  <p>
                    <span className={styles.profileTitles}>
                      {t("profile.fields.who_am_i")}
                    </span>

                    {t("profile.values.who_am_i")}
                  </p>
                </div>

                <div className={styles.darkBlue}>
                  <p>
                    <span className={styles.profileTitles}>
                      {t("profile.fields.hometown")}
                    </span>

                    {t("profile.values.hometown")}
                  </p>
                </div>

                <div className={styles.lightBlue}>
                  <p>
                    <span className={styles.profileTitles}>
                      {t("profile.fields.webpages")}
                    </span>

                    <a
                      href="https://www.linkedin.com/in/lorenasferreira/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("profile.links.linkedin")}
                    </a>

                    <span> | </span>

                    <a
                      href="https://github.com/lorenasferreira"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("profile.links.github")}
                    </a>
                  </p>
                </div>
              </div>

              <section
                className={`${styles.card} ${styles.testimonies}`}
                id="testimonies"
              >
                <header className={styles.cardHeader}>
                  <h3>{t("profile.testimonials.title")}</h3>

                  <small className={styles.muted}>
                    {testimonials.length} {t("profile.testimonials.total")}
                  </small>
                </header>

                <form
                  className={styles.testimonialForm}
                  onSubmit={handleSubmit}
                >
                  <input
                    type="text"
                    value={author}
                    onChange={(event) => setAuthor(event.target.value)}
                    placeholder={t("profile.testimonials.form.name")}
                    required
                  />

                  <textarea
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder={t("profile.testimonials.form.message")}
                    maxLength={280}
                    required
                  />

                  <div className={styles.testimonialActions}>
                    <small>{remainingCharacters}</small>

                    <button className={styles.primaryButton} type="submit">
                      {t("profile.testimonials.form.post")}
                    </button>
                  </div>
                </form>

                <div className={styles.testimonialList}>
                  {testimonials.map((testimonial) => (
                    <article
                      key={testimonial.id}
                      className={styles.testimonialCard}
                    >
                      <img
                        className={styles.testimonialAvatar}
                        src={testimonial.avatar}
                        alt=""
                      />

                      <div>
                        <strong>{testimonial.author}</strong>

                        <p>
                          {testimonial.message ?? t(testimonial.messageKey)}
                        </p>

                        <small className={styles.muted}>
                          {t("profile.testimonials.fake_time")}
                        </small>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </section>
        </PageLayout>
      </div>

      <main className={styles.profileMobile}>
        <section className={styles.mobileHeader}>
          <img
            src="/assets/img/avatar.png"
            className={styles.mobileAvatar}
            alt={t("common.name")}
          />

          <h1 className={styles.mobileName}>{t("common.name")}</h1>

          <p className={styles.mobileLocation}>
            {t("profile.values.hometown")}
          </p>

          <div className={styles.mobileActions}>
            <a href="#mobile-projects" className={styles.primaryButton}>
              {t("profile.mobile.view_projects")}
            </a>

            <a href="mailto:you@email.com" className={styles.secondaryButton}>
              {t("profile.mobile.message")}
            </a>
          </div>
        </section>

        <section className={styles.mobileCounters}>
          {profileCounters.map((counter) => (
            <div
              key={counter.translationKey}
              className={styles.mobileCounterItem}
            >
              <span>{t(counter.translationKey)}</span>
              <strong>{counter.value}</strong>
            </div>
          ))}
        </section>

        <section className={styles.mobileTabs}>
          <button
            type="button"
            className={`${styles.mobileTab} ${
              activeTab === "social" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("social")}
          >
            {t("profile.mobile.tab_social")}
          </button>

          <button
            type="button"
            className={`${styles.mobileTab} ${
              activeTab === "professional" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("professional")}
          >
            {t("profile.mobile.tab_professional")}
          </button>
        </section>

        {activeTab === "social" && (
          <section className={styles.mobileTabContent}>
            <div className={styles.mobileInformationBlock}>
              <strong>{t("profile.fields.birthday")}</strong>
              <p>10-07-1997</p>
            </div>

            <div className={styles.mobileInformationBlock}>
              <strong>{t("profile.fields.age")}</strong>
              <p>28</p>
            </div>

            <div className={styles.mobileInformationBlock}>
              <strong>{t("profile.fields.interests")}</strong>
              <p>{t("profile.values.interests")}</p>
            </div>

            <div className={styles.mobileInformationBlock}>
              <strong>{t("profile.fields.who_am_i")}</strong>
              <p>{t("profile.values.who_am_i")}</p>
            </div>

            <div className={styles.mobileInformationBlock}>
              <strong>{t("profile.fields.hometown")}</strong>
              <p>{t("profile.values.hometown")}</p>
            </div>
          </section>
        )}

        {activeTab === "professional" && (
          <section className={styles.mobileTabContent}>
            <div className={styles.mobileInformationBlock}>
              <strong>{t("profile.fields.webpages")}</strong>

              <p>
                <a
                  href="https://www.linkedin.com/in/lorenasferreira/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("profile.links.linkedin")}
                </a>

                <span> | </span>

                <a
                  href="https://github.com/lorenasferreira"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("profile.links.github")}
                </a>
              </p>
            </div>
          </section>
        )}

        <section className={styles.mobileSection} id="mobile-projects">
          <header className={styles.mobileSectionHeader}>
            <h2>{t("profile.mobile.my_projects")}</h2>

            <Link to="/projects">{t("common.view_all")}</Link>
          </header>

          {isMobileContentLoading ? (
            <p className={styles.mobileStatus}>{t("projects.loading")}</p>
          ) : (
            <div className={styles.mobileHorizontalScroll}>
              {projects.map((project) => (
                <Link
                  key={project.id ?? project.slug}
                  to={`/projects/${project.slug}`}
                  className={styles.mobileProjectCard}
                >
                  <img
                    src={getImageUrl(project.thumbnail)}
                    alt={project.title}
                  />

                  <p>{project.title}</p>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className={styles.mobileSection}>
          <header className={styles.mobileSectionHeader}>
            <h2>{t("profile.mobile.communities")}</h2>

            <Link to="/communities">{t("common.view_all")}</Link>
          </header>

          {isMobileContentLoading ? (
            <p className={styles.mobileStatus}>{t("communities.loading")}</p>
          ) : (
            <div className={styles.mobileHorizontalScroll}>
              {communities.map((community) => (
                <Link
                  key={community.id ?? community.slug}
                  to={`/communities/${community.slug}`}
                  className={styles.mobileCommunityCard}
                  title={community.title}
                >
                  <img
                    src={getImageUrl(community.thumbnail)}
                    alt={community.title}
                  />
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default Profile;
