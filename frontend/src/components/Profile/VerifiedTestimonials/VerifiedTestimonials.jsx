import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styles from "./VerifiedTestimonials.module.css";

const testimonials = [
  {
    id: 1,

    clientName: "Marina Rodrigues",
    clientRole:
      "Content Creator · Social Media Specialist · Photographer · Videomaker",

    clientAvatar: "/assets/img/mari-rodrigues.webp",

    rating: 5,
    verified: true,

    originalLanguage: "en",

    originalMessage:
      "I am extremely satisfied with the website Lorena developed for me. Not only has it helped increase my sales, but the design also turned out exactly the way I had imagined.\n\nAnother great aspect of her service is that she keeps me updated on every change and improvement she makes to the website throughout the process. She also helped me purchase my domain by providing clear step-by-step instructions on how to buy it and complete the setup.\n\nI am truly grateful for all the work she has done. Thank you so much, Lorena!\n\nI highly recommend her services to anyone looking for a dedicated professional who meets deadlines and is always willing to align her work with your ideas and business needs.",

    translations: {
      pt: "Estou extremamente satisfeita com o site que a Lorena desenvolveu para mim. Além de ter me ajudado a aumentar minhas vendas, o design ficou exatamente como eu havia imaginado.\n\nOutro ponto muito positivo do serviço dela é que ela me mantém atualizada sobre cada alteração e melhoria realizada no site durante todo o processo. Ela também me ajudou na compra do meu domínio, fornecendo instruções claras e passo a passo sobre como comprá-lo e concluir toda a configuração.\n\nSou realmente muito grata por todo o trabalho que ela fez. Muito obrigada, Lorena!\n\nRecomendo muito os serviços dela para qualquer pessoa que esteja procurando uma profissional dedicada, que cumpra prazos e esteja sempre disposta a alinhar seu trabalho às suas ideias e às necessidades do seu negócio.",

      es: "Estoy extremadamente satisfecha con el sitio web que Lorena desarrolló para mí. No solo me ha ayudado a aumentar mis ventas, sino que el diseño también quedó exactamente como lo había imaginado.\n\nOtro aspecto muy positivo de su servicio es que me mantiene informada sobre cada cambio y mejora que realiza en el sitio web durante todo el proceso. También me ayudó a comprar mi dominio, proporcionándome instrucciones claras paso a paso sobre cómo adquirirlo y completar toda la configuración.\n\nEstoy realmente muy agradecida por todo el trabajo que ha realizado. ¡Muchísimas gracias, Lorena!\n\nRecomiendo ampliamente sus servicios a cualquier persona que busque una profesional dedicada, que cumpla los plazos y que esté siempre dispuesta a adaptar su trabajo a tus ideas y a las necesidades de tu negocio.",

      fr: "Je suis extrêmement satisfaite du site web que Lorena a développé pour moi. Non seulement il m'a aidée à augmenter mes ventes, mais le design correspond également exactement à ce que j'avais imaginé.\n\nUn autre aspect très positif de son service est qu'elle me tient informée de chaque modification et amélioration apportée au site tout au long du processus. Elle m'a également aidée à acheter mon nom de domaine en me fournissant des instructions claires, étape par étape, pour effectuer l'achat et finaliser la configuration.\n\nJe suis vraiment très reconnaissante pour tout le travail qu'elle a réalisé. Merci beaucoup, Lorena !\n\nJe recommande vivement ses services à toute personne à la recherche d'une professionnelle dévouée, respectueuse des délais et toujours prête à adapter son travail à vos idées et aux besoins de votre activité.",
    },

    projectName: "MarinaRodriiPhoto",
    projectSlug: "marinarodriiphoto",

    recommendationSource: "LinkedIn",
    linkedinUrl:
      "https://www.linkedin.com/in/lorenasferreira/details/recommendations/?detailScreenTabIndex=0",
    websiteUrl: "https://www.marinarodriiphoto.com",
  },
];

function VerifiedTestimonials() {
  const { t, i18n } = useTranslation();

  const [translatedTestimonials, setTranslatedTestimonials] = useState({});

  const currentLanguage = i18n.resolvedLanguage?.split("-")[0] || "en";

  function toggleTranslation(testimonialId) {
    setTranslatedTestimonials((current) => ({
      ...current,
      [testimonialId]: !current[testimonialId],
    }));
  }

  function getDisplayedMessage(testimonial) {
    const shouldTranslate = translatedTestimonials[testimonial.id];

    if (!shouldTranslate) {
      return testimonial.originalMessage;
    }

    return (
      testimonial.translations[currentLanguage] ?? testimonial.originalMessage
    );
  }

  function canTranslate(testimonial) {
    return (
      currentLanguage !== testimonial.originalLanguage &&
      Boolean(testimonial.translations[currentLanguage])
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
        {testimonials.map((testimonial) => {
          const isTranslated = translatedTestimonials[testimonial.id] || false;

          return (
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

                    <p className={styles.clientRole}>
                      {testimonial.clientRole}
                    </p>
                  </div>

                  {testimonial.verified && (
                    <span className={styles.verifiedBadge}>
                      ✓ {t("profile.verified_testimonials.verified_client")}
                    </span>
                  )}
                </div>

                <div
                  className={styles.stars}
                  aria-label={`${testimonial.rating} / 5`}
                >
                  {Array.from({
                    length: testimonial.rating,
                  }).map((_, index) => (
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
                    {isTranslated
                      ? t(
                          "profile.verified_testimonials.translated_from_english",
                        )
                      : t("profile.verified_testimonials.original_in_english")}
                  </small>

                  {canTranslate(testimonial) && (
                    <button
                      type="button"
                      className={styles.translateButton}
                      onClick={() => toggleTranslation(testimonial.id)}
                    >
                      {isTranslated
                        ? t("profile.verified_testimonials.view_original")
                        : t("profile.verified_testimonials.translate")}
                    </button>
                  )}
                </div>

                <div className={styles.verification}>
                  <span>
                    {t("profile.verified_testimonials.published_on")}{" "}
                    {testimonial.recommendationSource}
                  </span>

                  <a
                    href={testimonial.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("profile.verified_testimonials.view_source")} ↗
                  </a>
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
                  <a
                    href={testimonial.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("profile.verified_testimonials.visit_website")} ↗
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default VerifiedTestimonials;
