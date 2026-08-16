import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import styles from "./Fortune.module.css";

const fortunes = {
  en: [
    "Good things take time — but some start today.",
    "A small step today unlocks a big moment tomorrow.",
    "You’re closer than you think.",
    "Someone is grateful for you today — even if you don’t know it yet.",
    "Your energy is attracting the right people.",
    "A memory from your past will make you smile soon.",
    "Trust the timing — it’s working in your favor.",
    "Something beautiful is forming quietly behind the scenes.",
    "You will receive clarity today.",
    "Today is a good day to begin again.",
  ],

  pt: [
    "Coisas boas levam tempo — mas algumas começam hoje.",
    "Um pequeno passo hoje desbloqueia um grande momento amanhã.",
    "Você está mais perto do que imagina.",
    "Alguém é grato por você hoje — mesmo que você não saiba.",
    "Sua energia está atraindo as pessoas certas.",
    "Uma lembrança do passado vai te fazer sorrir em breve.",
    "Confie no tempo — ele está trabalhando a seu favor.",
    "Algo lindo está se formando silenciosamente nos bastidores.",
    "Você receberá clareza hoje.",
    "Hoje é um bom dia para recomeçar.",
  ],

  es: [
    "Las cosas buenas toman tiempo — pero algunas empiezan hoy.",
    "Un pequeño paso hoy desbloquea un gran momento mañana.",
    "Estás más cerca de lo que crees.",
    "Alguien está agradecido por ti hoy — aunque no lo sepas.",
    "Tu energía está atrayendo a las personas correctas.",
    "Un recuerdo del pasado te hará sonreír pronto.",
    "Confía en el tiempo — está trabajando a tu favor.",
    "Algo hermoso se está formando en silencio.",
    "Recibirás claridad hoy.",
    "Hoy es un buen día para empezar de nuevo.",
  ],

  fr: [
    "Les bonnes choses prennent du temps — mais certaines commencent aujourd’hui.",
    "Un petit pas aujourd’hui ouvrira la voie à un grand moment demain.",
    "Vous êtes plus proche que vous ne le pensez.",
    "Quelqu’un vous est reconnaissant aujourd’hui — même si vous ne le savez pas encore.",
    "Votre énergie attire les bonnes personnes.",
    "Un souvenir du passé vous fera bientôt sourire.",
    "Faites confiance au bon moment — il joue en votre faveur.",
    "Quelque chose de beau se prépare discrètement en coulisses.",
    "Vous y verrez plus clair aujourd’hui.",
    "Aujourd’hui est un bon jour pour recommencer.",
  ],
};

function getLanguage(language) {
  const shortLanguage = language?.split("-")[0];

  if (fortunes[shortLanguage]) {
    return shortLanguage;
  }

  return "en";
}

function getDailyIndex(date, totalFortunes) {
  const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

  let hash = 0;

  for (let index = 0; index < dateKey.length; index += 1) {
    hash = (hash * 31 + dateKey.charCodeAt(index)) >>> 0;
  }

  return hash % totalFortunes;
}

function Fortune() {
  const { t, i18n } = useTranslation();

  const fortuneData = useMemo(() => {
    const today = new Date();
    const language = getLanguage(i18n.resolvedLanguage || i18n.language);
    const languageFortunes = fortunes[language];

    const fortuneIndex = getDailyIndex(today, languageFortunes.length);

    const formattedDate = new Intl.DateTimeFormat(language, {
      month: "short",
      day: "numeric",
    }).format(today);

    return {
      date: formattedDate,
      text: languageFortunes[fortuneIndex],
    };
  }, [i18n.language, i18n.resolvedLanguage]);

 return (
   <section className={styles.fortune}>
     <img
       src="/assets/icons/sorte-do-dia.png"
       alt=""
       aria-hidden="true"
       className={styles.icon}
     />

     <div>
       <h2 className={styles.title}>
         {t("home.fortune.title_with_date", {
           date: fortuneData.date,
         })}
       </h2>

       <p className={styles.text}>{fortuneData.text}</p>
     </div>
   </section>
 );
}

export default Fortune;
