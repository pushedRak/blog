"use client";

import styles from "./Categories.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface CategoriesProps {
  categories: { id: number; name: string }[];
}

export default function Categories({ categories }: CategoriesProps) {
  const pathname = usePathname();
  const selected =
    pathname === "/" ? "Home" : decodeURIComponent(pathname.slice(1));

  return (
    <div className={styles.container}>
      {[{ id: 0, name: "Home" }, ...categories].map((category) => (
        <Link
          key={category.id}
          className={`${styles.category} ${
            selected === category.name && styles.category_selected
          }`}
          href={`${category.name === "Home" ? "/" : category.name}`}
        >
          <div className={styles.categoryBar} />
          {category.name}
        </Link>
      ))}
    </div>
  );
}
