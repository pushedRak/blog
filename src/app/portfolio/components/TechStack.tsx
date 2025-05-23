import styles from "./TechStack.module.css";
import Image from "next/image";

const techStacks = [
  {
    title: "언어",
    skills: [
      { name: "JavaScript", url: "/icons/javascriptIcon.png" },
      { name: "TypeScript", url: "/icons/typescriptIcon.png" },
      { name: "Java", url: "/icons/javaIcon.png" },
      { name: "C++", url: "/icons/cppIcon.png" },
      { name: "Python", url: "/icons/pythonIcon.png" },
    ],
  },
  {
    title: "프론트엔드",
    skills: [
      { name: "React", url: "/icons/reactIcon.png" },
      { name: "Next.js", url: "/icons/nextjsIcon.png" },
      { name: "Styled Components", url: "/icons/styledComponentsIcon.png" },
      { name: "Tailwind", url: "/icons/tailwindCSSIcon.png" },
      { name: "Emotion", url: "/icons/emotionCSSIcon.png" },
      { name: "Redux", url: "/icons/reduxIcon.png" },
      { name: "Recoil", url: "/icons/recoilIcon.png" },
      { name: "Zustand", url: "/icons/zustandIcon.png" },
      { name: "React query", url: "/icons/reactQueryIcon.png" },
    ],
  },
  {
    title: "기타",
    skills: [
      { name: "Git", url: "/icons/githubIcon.png" },
      { name: "Jira", url: "/icons/jiraIcon.png" },
      { name: "Figma", url: "/icons/figmaIcon.png" },
      { name: "Notion", url: "/icons/notionIcon.png" },
      { name: "WebSocket", url: "/icons/webSocketIcon.png" },
    ],
  },
];

export default function TechStack() {
  return (
    <div className={styles.container}>
      {techStacks.map((techStack, techStackIndex) => (
        <div key={techStackIndex}>
          {techStackIndex > 0 && <div className={styles.divider} />}
          <div className={styles.category}>{techStack.title}</div>
          <div className={styles.techStackContainer}>
            {techStack.skills.map((skill, skillIndex) => (
              <div key={skillIndex} className={styles.techStack}>
                <div className={styles.imageWrapper}>
                  <Image alt="" src={skill.url} width={48} height={48} />
                </div>
                <p className={styles.skillName}>{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
