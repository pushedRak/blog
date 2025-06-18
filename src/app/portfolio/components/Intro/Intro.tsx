import styles from "./Intro.module.css";

export function Intro() {
  return (
    <div className={styles.container}>
      <h1 className={styles.greeting}>
        안녕하세요,
        <br />
        프론트엔드 개발자
        <br />
        <em className={styles.name}>손민락</em>입니다.
      </h1>
    </div>
  );
}
