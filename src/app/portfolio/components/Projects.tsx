import Image from "next/image";
import styles from "./Projects.module.css";
import Link from "next/link";

const skillMap = {
  react: { name: "React", icon: "/icons/reactIcon.png" },
  reactnative: { name: "React Native", icon: "/icons/reactIcon.png" },
  typescript: { name: "TypeScript", icon: "/icons/typescriptIcon.png" },
  recoil: { name: "Recoil", icon: "/icons/recoilIcon.png" },
  reactquery: { name: "React Query", icon: "/icons/reactQueryIcon.png" },
  zustand: { name: "Zustand", icon: "/icons/zustandIcon.png" },
  firebase: { name: "Firebase", icon: "/icons/firebaseIcon.png" },
  animated: { name: "Animated", icon: "/icons/animatedIcon.png" },
  websocket: { name: "WebSocket", icon: "/icons/webSocketIcon.png" },
  redux: { name: "Redux", icon: "/icons/reduxIcon.png" },
  tailwind: { name: "Tailwind", icon: "/icons/tailwindCSSIcon.png" },
  styledcomponents: {
    name: "Styled-Components",
    icon: "/icons/styledComponentsIcon.png",
  },
} as const;

type SkillKey = keyof typeof skillMap;

const projects: {
  id: number;
  logoUrl: string;
  title: string;
  subtitle: string;
  description: string;
  skills: SkillKey[];
}[] = [
  {
    id: 0,
    logoUrl: "/icons/newLearnIcon.png",
    title: "NewLearn",
    subtitle: "뉴스 기반 영어 학습 플랫폼",
    description:
      "React-query와 Recoil을 조합해 상태와 서버 데이터를 분리 관리하고, 사용자 인터랙션 중심 기능 구현",
    skills: ["react", "typescript", "styledcomponents", "recoil", "reactquery"],
  },
  {
    id: 1,
    logoUrl: "/icons/campforestIcon.png",
    title: "CampForest",
    subtitle: "캠핑 장비 거래 SNS",
    description:
      "WebSocket과 SSE를 활용한 실시간 채팅 및 알림, 네이버 지도 API 기반 위치 공유 기능 구현",
    skills: ["react", "typescript", "redux", "tailwind", "websocket"],
  },
  {
    id: 2,
    logoUrl: "/icons/eumIcon.png",
    title: "이음",
    subtitle: "디지털 교과서 학습 보조 플랫폼",
    description:
      "React Native의 Animated로 인터랙티브한 UI 구현, Firebase를 활용한 푸시 알림 및 데이터 연동",
    skills: ["reactnative", "typescript", "zustand", "firebase"],
  },
];

export default function Projects() {
  return (
    <div className={styles.container}>
      {projects.map((project) => (
        <Link
          key={project.id}
          className={styles.projectWrapper}
          href={`/portfolio/${project.id}`}
          scroll={false}
        >
          <div className={styles.projectContent}>
            <Image alt="" src={project.logoUrl} width={32} height={32} />
            <div>
              <h2 className={styles.projectTitle}>{project.title}</h2>
              <h3 className={styles.projectSubtitle}>{project.subtitle}</h3>
              <p className={styles.projectDescription}>{project.description}</p>
            </div>
            {project.skills && (
              <div className={styles.skillContainer}>
                {project.skills.map((key) => {
                  const skill = skillMap[key];
                  return (
                    <div key={key} className={styles.skillWrapper}>
                      <div className={styles.skillIconWrapper}>
                        <Image
                          alt={skill.name}
                          src={skill.icon}
                          width={32}
                          height={32}
                        />
                      </div>
                      <div className={styles.tooltip}>{skill.name}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
