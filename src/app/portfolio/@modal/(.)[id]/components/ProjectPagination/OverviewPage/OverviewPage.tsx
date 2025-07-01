import styles from "./OverviewPage.module.css";
import Flex from "@shared/components/Flex";
import { ProjectDetail, TechStack } from "../../../type/project";
import Image from "next/image";
import SafeImage from "@shared/components/SafeImage";
import { MyRole } from "./MyRole";

export function OverviewPage({ project }: { project: ProjectDetail }) {
  return (
    <Flex justify="space-between" gap="xl">
      <Flex direction="column" gap="lg">
        <div>
          <h1 className={styles.title}>{project.title}</h1>
          <h3 className={styles.subtitle}>{project.subtitle}</h3>
        </div>
        <div>
          <div className={styles.infoHeading}>기간</div>
          <div>
            {project.period.start} - {project.period.end}
          </div>
        </div>
        <div>
          <div className={styles.infoHeading}>팀 구성</div>
          <div>
            {project.teamSize.total === 1
              ? "개인 프로젝트"
              : `팀 프로젝트 (프론트엔드 ${project.teamSize.frontend}명, 백엔드{" "}
            ${project.teamSize.backend}명)`}
          </div>
        </div>
        <div>
          <div className={styles.infoHeading}>기술 스택</div>
          <Flex gap="xs">
            {project.techStack.map((tech: TechStack) => (
              <div key={tech.id} className={styles.techIconWrapper}>
                <Image
                  className={styles.techIcon}
                  alt={tech.name}
                  src={tech.iconUrl}
                  width={40}
                  height={40}
                />
                <span className={styles.tooltip}>{tech.name}</span>
              </div>
            ))}
          </Flex>
        </div>
        <div>
          <div className={styles.infoHeading}>개요</div>
          <div className={styles.overview}>{project.overview}</div>
        </div>
      </Flex>
      <Flex direction="column" justify="center" gap="md">
        <div className={styles.imageWrapper}>
          <SafeImage
            alt={`${project.title}-image`}
            src={project.mainImage}
            fill
          />
        </div>
        <div>
          <div className={styles.infoHeading}>담당 역할</div>
          <MyRole myRole={project.myRoles} />
        </div>
      </Flex>
    </Flex>
  );
}
