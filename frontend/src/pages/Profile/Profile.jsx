import { useEffect, useState } from "react";

import Header from "../../components/Header/Header";
import ProfileDesktop from "../../components/Profile/ProfileDesktop/ProfileDesktop";
import ProfileMobile from "../../components/Profile/ProfileMobile/ProfileMobile";

import { getProjectPhotos, portfolioProjects } from "../../data/portfolioProjects";
import { getCommunities, getProjects } from "../../services/api";
import { getScraps } from "../../services/scraps";

function Profile() {
  const [projects, setProjects] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [scraps, setScraps] = useState([]);
  const [isContentLoading, setIsContentLoading] = useState(true);

  useEffect(() => {
    async function loadProfileContent() {
      try {
        const [projectsData, communitiesData, scrapsData] = await Promise.all([
          getProjects(),
          getCommunities(),
          getScraps(),
        ]);

        setProjects(Array.isArray(projectsData) ? projectsData : []);
        setCommunities(Array.isArray(communitiesData) ? communitiesData : []);
        setScraps(Array.isArray(scrapsData) ? scrapsData : []);
      } catch (error) {
        console.error("Erro ao carregar conteúdo do perfil:", error);

        setProjects([]);
        setCommunities([]);
        setScraps([]);
      } finally {
        setIsContentLoading(false);
      }
    }

    loadProfileContent();
  }, []);

  const counters = {
    scraps: scraps.length,
    photos: portfolioProjects.reduce((total, project) => total + getProjectPhotos(project, true).length, 0),
    videos: portfolioProjects.filter((project) => project.walkthrough).length,
    fans: 0,
  };

  return (
    <>
      <Header />

      <ProfileDesktop counters={counters} />

      <ProfileMobile
        projects={projects}
        communities={communities}
        counters={counters}
        isLoading={isContentLoading}
      />
    </>
  );
}

export default Profile;
