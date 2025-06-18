import styles from "./LessonsAndRegrets.module.css";
import Flex from "@components/Flex";

export function LessonsAndRegrets({
  lessons,
  regrets,
}: {
  lessons: string[];
  regrets: string[];
}) {
  return (
    <Flex direction="column" gap="xxxl">
      <Flex direction="column" gap="sm">
        <div>
          <h1 className={styles.title}>배운 점</h1>
        </div>

        <Flex direction="column" gap="lg">
          {lessons.map((lesson, index) => (
            <div key={index} className={styles.lessonItem}>
              <div className={styles.lessonNumber}>{index + 1}</div>
              <div className={styles.lessonContent}>{lesson}</div>
            </div>
          ))}
        </Flex>
      </Flex>

      <Flex direction="column" gap="sm">
        <div>
          <h1 className={styles.title}>아쉬운 점</h1>
        </div>

        <Flex direction="column" gap="lg">
          {regrets.map((regret, index) => (
            <Flex key={index} gap="md" align="flex-start">
              <div className={styles.regretNumber}>{index + 1}</div>
              <div className={styles.regretContent}>{regret}</div>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
