const API_URL = "http://localhost:8080/api/scraps";

export async function getScraps() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Could not load scraps.");
  }

  return response.json();
}

export async function createScrap(scrap) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(scrap),
  });

  if (!response.ok) {
    throw new Error("Could not create scrap.");
  }

  return response.json();
}
