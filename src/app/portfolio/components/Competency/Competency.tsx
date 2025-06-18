import SafeImage from "@components/SafeImage";
import styles from "./Competency.module.css";
import Flex from "@components/Flex";

export function Competency() {
  return (
    <Flex direction="column" gap="xxxl">
      <Flex className={styles.competencyWrapper} gap="xl">
        <div className={styles.imageWrapper}>
          <SafeImage alt="competency-1" src={`/images/core_1.png`} fill />
        </div>
        <div>
          <h3 className={styles.title}>모던 프론트엔드 개발</h3>
          <p className={styles.description}>
            React.js 기반의 웹 애플리케이션 개발 경험이 있으며,
            JavaScript(ES6)와 TypeScript에 능숙합니다.
            <br />
            상태 관리 라이브러리를 활용하여 복잡한 상태를 효율적으로 관리하고,
            성능을 고려한 컴포넌트 설계를 할 수 있습니다.
          </p>
        </div>
      </Flex>
      <Flex className={styles.competencyWrapper} gap="xl">
        <div className={styles.imageWrapper}>
          <SafeImage alt="competency-1" src={`/images/core_2.png`} fill />
        </div>
        <div>
          <h3 className={styles.title}>커뮤니케이션 및 협업</h3>
          <p className={styles.description}>
            GitHub, Jira, Notion 등의 협업 도구를 활용하여 효과적으로 업무를
            관리할 수 있습니다.
            <br />
            코드 리뷰 및 PR 단위 협업을 통해 코드 품질을 유지하고, 피드백을
            반영하여 기능을 개선하는 경험이 있습니다.
          </p>
        </div>
      </Flex>
      <Flex className={styles.competencyWrapper} gap="xl">
        <div className={styles.imageWrapper}>
          <SafeImage alt="competency-1" src={`/images/core_3.png`} fill />
        </div>
        <div>
          <h3 className={styles.title}>문제 해결 능력 및 디버깅 역량</h3>
          <p className={styles.description}>
            콘솔 로그와 디버깅 도구를 활용해 오류를 빠르게 파악하고 해결한
            경험이 있습니다.
            <br />
            문제 상황을 쉽게 파악할 수 있도록 정리하고, 원인을 정확히 짚어내는
            데 강점이 있습니다.
          </p>
        </div>
      </Flex>
    </Flex>
  );
}
