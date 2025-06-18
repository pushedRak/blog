import styles from "./Section.module.css";

interface SectionProps {
  id?: string;
  title?: string;
  children: React.ReactNode;
}

export function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className={styles.container}>
      {title && <h2 className={styles.title}>{title}</h2>}
      {children}
    </section>
  );
}
