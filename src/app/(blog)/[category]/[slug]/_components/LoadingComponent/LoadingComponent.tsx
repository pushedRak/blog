import styles from "./LoadingComponent.module.css";

export default function LoadingComponent() {
  return (
    <div>
      <div className={`${styles.loadingDiv} ${styles.titleDiv}`} />
      <div className={styles.loadingDiv} />
      <div className={styles.loadingDiv} />
      <div className={styles.loadingDiv} />
      <div className={styles.loadingDiv} />
      <div className={`${styles.loadingDiv} ${styles.short}`} />
    </div>
  );
}
