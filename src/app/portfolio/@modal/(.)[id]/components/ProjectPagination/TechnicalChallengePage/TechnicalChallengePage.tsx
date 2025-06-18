import styles from "./TechnicalChallengePage.module.css";
import Flex from "@components/Flex";
import { TechnicalChallenge } from "../../../type/project";

export function TechnicalChallengePage({
  challenges,
}: {
  challenges: TechnicalChallenge[];
}) {
  return (
    <div>
      <div>
        <h1 className={styles.title}>기술적 도전</h1>
      </div>

      <Flex direction="column" gap="xl">
        {challenges.map((challenge) => (
          <Flex key={challenge.id} direction="column" gap="xs">
            <h2 className={styles.challengeTitle}>
              {challenge.id + 1}. {challenge.title}
            </h2>
            <Flex direction="column" gap="md">
              <div>
                <div className={styles.infoHeading}>문제 상황</div>
                <div className={styles.challengeContent}>
                  {challenge.problem}
                </div>
              </div>
              <div>
                <div className={styles.infoHeading}>해결 방안</div>
                <div className={styles.challengeContent}>
                  {challenge.solution}
                </div>
              </div>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </div>
  );
}
