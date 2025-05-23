import Navbar from "@components/Navbar";
import styles from "./layout.module.css";
import { getCategories } from "@services/category";

export default async function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories();

  return (
    <div>
      <div className={styles.content}>
        <Navbar categories={categories} />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
