import { mergePortfolioProjects, portfolioProjects } from "../data/portfolioProjects";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const API_URL = `${API_BASE}/api`;

export async function getProjects() {
  try {
    const response = await fetch(`${API_URL}/projects`);
    if (!response.ok) {
      throw new Error(`Could not load projects. Status: ${response.status}`);
    }

    return mergePortfolioProjects(await response.json());
  } catch (error) {
    console.warn("Showing local portfolio projects:", error);
    return portfolioProjects;
  }
}

export async function getProjectBySlug(slug, { signal } = {}) {
  const curated = portfolioProjects.find((project) => project.slug === slug);
  try {
    const response = await fetch(
      `${API_URL}/projects/${encodeURIComponent(slug)}`,
      { signal },
    );

    if (response.status === 404) {
      return curated ?? null;
    }

    if (!response.ok) {
      throw new Error(`Could not load project. Status: ${response.status}`);
    }

    const project = await response.json();
    return curated ? { ...project, ...curated } : project;
  } catch (error) {
    if (!curated || signal?.aborted) throw error;
    return curated;
  }
}

export async function getCommunities() {
  const response = await fetch(`${API_URL}/communities`);

  if (!response.ok) {
    throw new Error("Não foi possível carregar as comunidades.");
  }

  return response.json();
}

export async function getCommunityBySlug(slug) {
  const response = await fetch(
    `${API_URL}/communities/${encodeURIComponent(slug)}`,
  );

  if (!response.ok) {
    throw new Error("Comunidade não encontrada.");
  }

  return response.json();
}
