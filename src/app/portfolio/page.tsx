import Competency from "./components/Competency";
import Education from "./components/Education";
import SectionIndicator from "./components/SectionIndicator";
import Projects from "./components/Projects";
import Section from "./components/Section";
import TechStack from "./components/TechStack";
import styles from "./page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "손민락 | 프론트엔드 개발자",
  description: "프론트엔드 개발자 손민락의 포트폴리오입니다.",
};

export default function PortfolioPage() {
  return (
    <>
      <SectionIndicator />
      <main className={styles.page}>
        <Section id="intro">
          <div>
            <h1 className={styles.greeting}>
              안녕하세요,
              <br />
              프론트엔드 개발자
              <br />
              <em className={styles.name}>손민락</em>
              입니다.
            </h1>
            <div>
              <p className={styles.introduction}>
                React를 중심으로 프론트엔드를 개발합니다.
              </p>
              <p className={styles.introduction}>
                사용자 중심의 인터페이스 구현과 지속적인 성장을 추구합니다.
              </p>
            </div>
          </div>
        </Section>
        <Section
          id="competency"
          title="핵심 역량"
          descriptions={["문제 해결 역량과 협업 능력을 갖췄습니다."]}
        >
          <Competency />
        </Section>
        <Section
          id="tech-stack"
          title="기술 스택"
          descriptions={["아래와 같은 기술들을 다룰 수 있습니다."]}
        >
          <TechStack />
        </Section>
        <Section
          id="projects"
          title="프로젝트"
          descriptions={["직접 참여한 주요 프로젝트입니다."]}
        >
          <Projects />
        </Section>
        <Section
          id="education"
          title="교육"
          descriptions={[
            "다음 교육 과정을 통해",
            "개발 역량을 탄탄히 다져왔습니다.",
          ]}
        >
          <Education />
        </Section>
      </main>
    </>
  );
}
