const professionalWhatsApp = "https://wa.me/34662321407";

export function contactUrl(message) {
  return `${professionalWhatsApp}?text=${encodeURIComponent(message)}`;
}
