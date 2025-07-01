import Education from "./components/Education";
import SectionIndicator from "./components/SectionIndicator";
import TechStack from "./components/TechStack";
import styles from "./page.module.css";
import { Metadata } from "next";
import { Intro, Section, Competency, Projects } from "./components";
import DarkModeBtn from "@shared/components/DarkModeBtn";

export const metadata: Metadata = {
  title: "손민락 | 프론트엔드 개발자",
  description: "프론트엔드 개발자 손민락의 포트폴리오입니다.",
};

export default function PortfolioPage() {
  return (
    <>
      <SectionIndicator />
      <div className={styles.darkModeBtnWrapper}>
        <DarkModeBtn />
      </div>
      <main className={styles.page}>
        <Section id="intro">
          <Intro />
        </Section>
        <Section id="competency" title="핵심 역량">
          <Competency />
        </Section>
        <Section id="tech-stack" title="기술 스택">
          <TechStack />
        </Section>
        <Section id="projects" title="프로젝트">
          <Projects />
        </Section>
        <Section id="education" title="교육 및 자격">
          <Education />
        </Section>
      </main>
    </>
  );
}
