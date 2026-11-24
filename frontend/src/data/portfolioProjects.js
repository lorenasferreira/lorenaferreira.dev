// Curated portfolio entries are versioned with their translations and screenshots.
const imageRoot = "/assets/img/projects";

export const portfolioProjects = [
  {
    slug: "bmv-makeup",
    title: "BMV Makeup",
    status: "completed",
    techStack: "React, Vite, JavaScript, CSS Modules, i18next, Vercel Functions, Playwright",
    liveUrl: "https://www.bmvmakeup.com/",
    thumbnail: `${imageRoot}/bmv-makeup/bmv-mark.svg`,
    cover: `${imageRoot}/bmv-makeup/home-desktop.webp`,
    screenshots: ["portfolio-desktop.webp", "weddings-mobile.webp"],
  },
  {
    slug: "portuguese-with-thais",
    title: "Portuguese with Thais",
    completedAt: "2026-11-19", // Website finalization in the project repository (f3dac24).
    status: "completed",
    techStack: "React, Vite, JavaScript, CSS Modules, Cal.com, Playwright",
    liveUrl: "https://portuguesewiththais.com/",
    thumbnail: `${imageRoot}/portuguese-with-thais/thais-logo.svg`,
    cover: `${imageRoot}/portuguese-with-thais/home-desktop.webp`,
    screenshots: ["brazilian-soul-desktop.webp", "booking-mobile.webp"],
  },
  {
    slug: "marinarodriiphoto",
    title: "Marina Rodrigues Photography",
    status: "in_development",
    techStack: "React, Vite, i18next, Java 21, Spring Boot, MySQL, Flyway, Cloudinary",
    liveUrl: "https://www.marinarodriiphoto.com/",
    thumbnail: `${imageRoot}/mari-rodrigues/thumb.png`,
  },
  {
    slug: "aupairnaespanha",
    title: "Au Pair na Espanha",
    status: "maintained",
    techStack: "React, Vite, JavaScript, React Router, CSS, Brevo, Node.js",
    liveUrl: "https://www.aupairnaespanha.com.br/",
    thumbnail: `${imageRoot}/aupairnaespanha/au-pair-logo.webp`,
    cover: `${imageRoot}/aupairnaespanha/home.webp`,
    screenshots: ["resources.webp", "host-family-guide.webp"],
  },
];

export function mergePortfolioProjects(projects) {
  const curatedSlugs = new Set(portfolioProjects.map(({ slug }) => slug));
  const existingBySlug = new Map(projects.map((project) => [project.slug, project]));

  return [
    ...portfolioProjects.map((project) => ({ ...existingBySlug.get(project.slug), ...project })),
    ...projects.filter(({ slug }) => !curatedSlugs.has(slug)),
  ];
}
