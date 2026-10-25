import { useEffect, useId, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getProjects } from "../../services/api";
import styles from "./Header.module.css";

const normalize = (value) => String(value).normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
export default function SiteSearch() {
  const { t, i18n } = useTranslation();
  const id = useId();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let active = true;
    getProjects().then(data => { if (active) setProjects(Array.isArray(data) ? data : []); })
      .catch(() => { if (active) setFailed(true); });
    return () => { active = false; };
  }, []);
  const details = i18n.getResourceBundle(i18n.resolvedLanguage?.split("-")[0] || "en", "translation")?.projectDetails || {};
  const communityDetails = i18n.getResourceBundle(i18n.resolvedLanguage?.split("-")[0] || "en", "translation")?.communityDetails || {};
  const entries = [
    ...Object.entries(communityDetails).map(([slug, content]) => ({ to: `/communities/${encodeURIComponent(slug)}`, title: content.title, text: content.description, priority: 0 })),
    ...Object.entries(details).map(([slug, content]) => {
      const project = projects.find(item => item.slug === slug);
      return { to: `/projects/${encodeURIComponent(slug)}`, title: project?.title || slug.replaceAll("-", " "), text: `${Object.values(content).join(" ")} ${project?.techStack || ""}`, priority: 2 };
    }),
    ...projects.filter(project => !details[project.slug]).map(project => ({ to: `/projects/${encodeURIComponent(project.slug)}`, title: project.title, text: `${project.description || ""} ${project.techStack || ""}`, priority: 2 })),
    ...[ ["/profile", "nav.profile", "profile.values.who_am_i"], ["/projects", "nav.projects", "projects.title"], ["/scraps", "nav.scrapbook", "scraps.page.description"], ["/testimonials", "testimonials.page.title", "testimonials.page.description"], ["/home", "nav.home", "about.paragraph.1"], ["/communities", "nav.communities", "communities.title"] ].map(([to, title, text]) => ({ to, title: t(title), text: t(text), priority: 1 })),
  ];
  const terms = normalize(query.trim()).split(/\s+/).filter(Boolean);
  const results = terms.length ? entries.filter(entry => terms.every(term => normalize(`${entry.title} ${entry.text}`).includes(term))).sort((a,b) => (Number(normalize(b.title).includes(normalize(query.trim()))) * 10 + b.priority) - (Number(normalize(a.title).includes(normalize(query.trim()))) * 10 + a.priority)).slice(0, 8) : [];
  return <form className={styles.search} role="search" onSubmit={event => { event.preventDefault(); setOpen(true); }} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }} onKeyDown={event => {
    if (event.key === "Escape") { setOpen(false); event.currentTarget.querySelector("input").focus(); }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      const links = [...event.currentTarget.querySelectorAll("input, ." + styles.results + " a")];
      const index = links.indexOf(document.activeElement);
      if (links.length > 1) { event.preventDefault(); links[(index + (event.key === "ArrowDown" ? 1 : links.length - 1)) % links.length].focus(); }
    }
  }}>
    <input className={styles.searchInput} type="search" value={query} onChange={event => { setQuery(event.target.value); setOpen(true); }} onFocus={() => setOpen(true)} placeholder={t("nav.search_placeholder")} aria-label={t("nav.search")} aria-expanded={open && terms.length > 0} aria-controls={id} />
    <button className={styles.searchBtn} type="submit" aria-label={t("nav.search")}><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg></button>
    {open && terms.length > 0 && <div id={id} className={styles.results}><p role="status">{results.length ? `${t("nav.search")}: ${results.length}` : t("search.empty")}</p>{failed && <p>{t("search.error")}</p>}<ul>{results.map(result => <li key={result.to}><Link to={result.to} onClick={() => { setOpen(false); setQuery(""); }}>{result.title}</Link></li>)}</ul></div>}
  </form>;
}
