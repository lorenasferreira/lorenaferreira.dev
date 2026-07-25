import { useEffect, useState } from "react";

import Header from "../../components/Header/Header";
import ProfileDesktop from "../../components/Profile/ProfileDesktop/ProfileDesktop";
import ProfileMobile from "../../components/Profile/ProfileMobile/ProfileMobile";

import { getCommunities, getProjects } from "../../services/api";

function Profile() {
  const [projects, setProjects] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [isMobileContentLoading, setIsMobileContentLoading] = useState(true);

  useEffect(() => {
    async function loadMobileContent() {
      try {
        const [projectsData, communitiesData] = await Promise.all([
          getProjects(),
          getCommunities(),
        ]);

        setProjects(Array.isArray(projectsData) ? projectsData : []);
        setCommunities(Array.isArray(communitiesData) ? communitiesData : []);
      } catch (error) {
        console.error("Erro ao carregar conteúdo do perfil:", error);

        setProjects([]);
        setCommunities([]);
      } finally {
        setIsMobileContentLoading(false);
      }
    }

    loadMobileContent();
  }, []);

  return (
    <>
      <Header />

      <ProfileDesktop />

      <ProfileMobile
        projects={projects}
        communities={communities}
        isLoading={isMobileContentLoading}
      />
    </>
  );
}

export default Profile;
