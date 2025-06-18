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
  nextjs: { name: "Next.js", icon: "/icons/nextjsIcon.png" },
  supabase: { name: "Supabase", icon: "/icons/supabaseIcon.png" },
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
      "국내 뉴스를 활용하여 실제적이고 효과적인 영어 학습을 제공하는 서비스입니다.",
    skills: ["react", "typescript", "styledcomponents", "recoil", "reactquery"],
  },
  {
    id: 1,
    logoUrl: "/icons/campforestIcon.png",
    title: "CampForest",
    subtitle: "캠핑 장비 거래 SNS",
    description:
      "캠핑 장비 거래를 촉진하고 사용자 간의 활발한 소통을 지원하는 소셜 네트워크 서비스입니다.",
    skills: ["react", "typescript", "redux", "tailwind", "websocket"],
  },
  {
    id: 2,
    logoUrl: "/icons/eumIcon.png",
    title: "이음",
    subtitle: "디지털 교과서 학습 보조 플랫폼",
    description:
      "디지털 교과서 시대에 발맞춰 선생님의 효과적인 수업 진행을 돕는 서비스입니다.",
    skills: ["reactnative", "typescript", "zustand", "firebase"],
  },
  {
    id: 3,
    logoUrl: "/icons/rakBlogIcon.png",
    title: "락 블로그",
    subtitle: "개인 블로그 개발",
    description:
      "Next.js를 활용하여 DB와 API 설계를 포함한 풀스택 개발을 진행했습니다.",
    skills: ["nextjs", "supabase"],
  },
];

export function Projects() {
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
