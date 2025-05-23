import styles from "./Section.module.css";

interface SectionProps {
  id?: string;
  title?: string;
  descriptions?: string[];
  children: React.ReactNode;
}

export default function Section({
  id,
  title,
  descriptions,
  children,
}: SectionProps) {
  return (
    <section id={id} className={styles.section}>
      {title && (
        <div className={styles.sectionTitleContainer}>
          <p className={styles.sectionTitle}>{title}</p>
          {descriptions &&
            descriptions.map((description, index) => (
              <p key={index} className={styles.sectionDescription}>
                {description}
              </p>
            ))}
        </div>
      )}
      {children}
    </section>
  );
}
