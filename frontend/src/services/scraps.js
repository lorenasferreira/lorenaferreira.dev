const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const API_URL = `${API_BASE}/api/scraps`;

export async function getScraps() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Could not load scraps.");
  }

  return response.json();
}

export async function createScrap({ author, message, confirmed, photo }) {
  const body = new FormData();
  body.set("author", author);
  body.set("message", message);
  body.set("confirmed", String(confirmed));
  if (photo) body.set("photo", photo, photo.type === "image/png" ? "avatar.png" : "avatar.jpg");

  const response = await fetch(API_URL, { method: "POST", body });
  if (!response.ok) throw new Error("Could not create scrap.");
}

const translations = new Map();
export async function translateScrap(id, language) {
  const key = `${id}:${language}`;
  if (!translations.has(key)) {
    const request = fetch(`${API_URL}/${encodeURIComponent(id)}/translations/${encodeURIComponent(language)}`, { method: "POST" })
      .then(response => { if (!response.ok) throw new Error("Translation unavailable"); return response.json(); })
      .catch(error => { translations.delete(key); throw error; });
    translations.set(key, request);
  }
  return translations.get(key);
}
