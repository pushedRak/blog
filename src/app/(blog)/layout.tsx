import Navbar from "@components/Navbar";
import styles from "./layout.module.css";

export default async function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className={styles.content}>
        <Navbar />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
