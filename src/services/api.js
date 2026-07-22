const API_URL = "http://localhost:8080/api";

export async function getProjects() {
  const response = await fetch(`${API_URL}/projects`);

  if (!response.ok) {
    throw new Error("Não foi possível carregar os projetos.");
  }

  return response.json();
}

export async function getProjectBySlug(slug) {
  const response = await fetch(
    `${API_URL}/projects/${encodeURIComponent(slug)}`,
  );

  if (!response.ok) {
    throw new Error("Projeto não encontrado.");
  }

  return response.json();
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
