import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styles from "./VerifiedTestimonials.module.css";

const testimonials = [
  {
    id: 1,
    clientName: "Mari Rodrigues",
    clientRole: "Fotógrafa",
    clientAvatar: "/assets/img/mari-rodrigues.webp",

    rating: 5,
    verified: true,
    isDemo: true,

    originalLanguage: "pt",
    originalMessage:
      "A Lorena entendeu exatamente o que eu queria para o meu site e conseguiu transformar minhas ideias em uma página linda, profissional e com a minha identidade. Durante todo o processo, ela foi muito atenciosa, explicou cada etapa e teve muito cuidado com todos os detalhes. Fiquei muito feliz com o resultado!",

    translations: {
      en: null,
      es: null,
      fr: null,
    },

    projectName: "Mari Rodrigues Fotografia",
    projectSlug: "mari-rodrigues-fotografia",

    instagramUrl: "",
    websiteUrl: "",
  },
];

function VerifiedTestimonials() {
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.resolvedLanguage?.split("-")[0] || "en";

  function getDisplayedMessage(testimonial) {
    if (currentLanguage === testimonial.originalLanguage) {
      return testimonial.originalMessage;
    }

    return (
      testimonial.translations[currentLanguage] ?? testimonial.originalMessage
    );
  }

  return (
    <section className={styles.testimonials} id="verified-testimonials">
      <header className={styles.header}>
        <h3>{t("profile.verified_testimonials.title")}</h3>

        <small className={styles.total}>
          {testimonials.length} {t("profile.verified_testimonials.total")}
        </small>
      </header>

      <div className={styles.list}>
        {testimonials.map((testimonial) => (
          <article key={testimonial.id} className={styles.card}>
            <img
              className={styles.avatar}
              src={testimonial.clientAvatar}
              alt={testimonial.clientName}
            />

            <div className={styles.content}>
              <div className={styles.clientHeader}>
                <div>
                  <strong className={styles.clientName}>
                    {testimonial.clientName}
                  </strong>

                  <p className={styles.clientRole}>{testimonial.clientRole}</p>
                </div>

                {testimonial.verified && (
                  <span className={styles.verifiedBadge}>
                    💖 {t("profile.verified_testimonials.verified_client")}
                  </span>
                )}
              </div>

              <div
                className={styles.stars}
                aria-label={`${testimonial.rating} de 5 estrelas`}
              >
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <span key={index} aria-hidden="true">
                    ★
                  </span>
                ))}
              </div>

              <p className={styles.message}>
                “{getDisplayedMessage(testimonial)}”
              </p>

              <div className={styles.languageInformation}>
                <small>
                  {t("profile.verified_testimonials.original_language")}
                </small>

                {testimonial.isDemo && (
                  <small className={styles.demoBadge}>
                    {t("profile.verified_testimonials.demo")}
                  </small>
                )}
              </div>

              <div className={styles.projectInformation}>
                <span>
                  {t("profile.verified_testimonials.published_project")}
                </span>

                <Link to={`/projects/${testimonial.projectSlug}`}>
                  {testimonial.projectName}
                </Link>
              </div>

              <div className={styles.externalLinks}>
                {testimonial.instagramUrl && (
                  <a
                    href={testimonial.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                )}

                {testimonial.instagramUrl && testimonial.websiteUrl && (
                  <span>·</span>
                )}

                {testimonial.websiteUrl && (
                  <a
                    href={testimonial.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("profile.verified_testimonials.visit_website")}
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default VerifiedTestimonials;
