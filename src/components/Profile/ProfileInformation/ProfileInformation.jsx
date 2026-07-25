import { useTranslation } from "react-i18next";

import styles from "./ProfileInformation.module.css";

function calculateAge(birthDate) {
  const today = new Date();
  const birth = new Date(`${birthDate}T00:00:00`);

  let age = today.getFullYear() - birth.getFullYear();

  const hasNotHadBirthdayYet =
    today.getMonth() < birth.getMonth() ||
    (today.getMonth() === birth.getMonth() &&
      today.getDate() < birth.getDate());

  if (hasNotHadBirthdayYet) {
    age -= 1;
  }

  return age;
}

function ProfileInformation({ birthDate, linkedinUrl, githubUrl }) {
  const { t } = useTranslation();

  const age = calculateAge(birthDate);

  return (
    <div className={styles.profileInformation}>
      <div className={styles.darkBlue}>
        <p>
          <span className={styles.profileTitles}>
            {t("profile.fields.birthday")}
          </span>

          {new Intl.DateTimeFormat("pt-BR").format(
            new Date(`${birthDate}T00:00:00`),
          )}
        </p>
      </div>

      <div className={styles.lightBlue}>
        <p>
          <span className={styles.profileTitles}>{t("profile.fields.age")}</span>

          {age}
        </p>
      </div>

      <div className={styles.darkBlue}>
        <p>
          <span className={styles.profileTitle}>
            {t("profile.fields.interests")}
          </span>

          {t("profile.values.interests")}
        </p>
      </div>

      <div className={styles.lightBlue}>
        <p>
          <span className={styles.profileTitles}>
            {t("profile.fields.who_am_i")}
          </span>

          {t("profile.values.who_am_i")}
        </p>
      </div>

      <div className={styles.darkBlue}>
        <p>
          <span className={styles.profileTitles}>
            {t("profile.fields.hometown")}
          </span>

          {t("profile.values.hometown")}
        </p>
      </div>

      <div className={styles.lightBlue}>
        <p>
          <span className={styles.profileTitles}>
            {t("profile.fields.webpages")}
          </span>

          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
            {t("profile.links.linkedin")}
          </a>

          <span> | </span>

          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            {t("profile.links.github")}
          </a>
        </p>
      </div>
    </div>
  );
}

export default ProfileInformation;
