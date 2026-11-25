import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Header from "../../components/Header/Header";
import PageLayout from "../../components/PageLayout/PageLayout";
import SidebarLeft from "../../components/SidebarLeft/SidebarLeft";
import SidebarRight from "../../components/SidebarRight/SidebarRight";
import PhotoGallery from "../../components/ProjectMedia/PhotoGallery";
import ProjectVideo from "../../components/ProjectMedia/ProjectVideo";
import { getProjectPhotos, portfolioProjects } from "../../data/portfolioProjects";

import styles from "./ProfileMedia.module.css";

const albums = portfolioProjects
  .map((project) => ({
    slug: project.slug,
    title: project.title,
    photos: getProjectPhotos(project, true),
  }))
  .filter(({ photos }) => photos.length > 0);

const walkthroughs = portfolioProjects.filter((project) => project.walkthrough);

function ProfileMedia({ kind }) {
  const { slug } = useParams();
  const { t } = useTranslation();
  const album = albums.find((item) => item.slug === slug);

  return (
    <>
      <Header />
      <PageLayout left={<SidebarLeft />} right={<SidebarRight />}>
        <div className={styles.panel}>
          <nav className={styles.links} aria-label={t("media.navigation")}>
            <Link to="/profile">{t("nav.profile")}</Link>
            <Link to="/photos" aria-current={kind === "photos" ? "page" : undefined}>{t("media.photos")}</Link>
            <Link to="/videos" aria-current={kind === "videos" ? "page" : undefined}>{t("media.videos")}</Link>
          </nav>
          <h1>{album?.title ?? t(kind === "videos" ? "media.videos" : "media.photos")}</h1>
          {kind === "videos" ? (
            <div className={styles.walkthroughs}>
              {walkthroughs.map((project) => (
                <section className={styles.videoCard} key={project.slug}>
                  <h2><Link to={`/projects/${project.slug}`}>{project.title}</Link></h2>
                  <ProjectVideo project={project} />
                </section>
              ))}
            </div>
          ) : album ? (
            <PhotoGallery photos={album.photos} title={album.title} />
          ) : slug ? (
            <p>{t("media.album_not_found")}</p>
          ) : (
            <>
              <h2>{t("media.albums")}</h2>
              <ul className={styles.albums}>
                {albums.map((item) => (
                  <li key={item.slug}>
                    <Link className={styles.album} to={`/photos/${item.slug}`}>
                      <img src={item.photos[0].src} alt="" loading="lazy" decoding="async" />
                      <strong>{item.title}</strong>
                      <small>{t("media.photo_count", { count: item.photos.length })}</small>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </PageLayout>
    </>
  );
}

export default ProfileMedia;
