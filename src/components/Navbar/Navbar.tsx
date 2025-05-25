"use client";

import { useState } from "react";
import BarLeftIcon from "./BarLeftIcon";
import Logo from "./Logo";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Category } from "@customTypes/category";
import { getCategoryLabel } from "@utils/categoryMapper";
import Flex from "@components/Flex";
import Profile from "./Profile";

export default function Navbar({ categories }: { categories: Category[] }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = decodeURI(usePathname());

  return (
    <>
      <div className={styles.header}>
        <Flex align="center">
          <button
            className={styles.barLeftIconWrapper}
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            <BarLeftIcon width={24} height={24} strokeWidth={5} />
          </button>
          <Link className={styles.logoWrapper} href="/">
            <Logo width={44.8} height={28} />
          </Link>
        </Flex>
        <Profile />
      </div>
      <div
        className={`${styles.sidebar} ${
          isExpanded ? styles.expanded : styles.collapsed
        }`}
      >
        <div className={styles.linkContainer}>
          <Link
            className={`${styles.link} ${
              pathname === "/" ? styles.active : ""
            }`}
            href="/"
          >
            홈
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              className={`${styles.link} ${
                pathname === `/${category.name}` ? styles.active : ""
              }`}
              href={`/${category.name}`}
            >
              {getCategoryLabel(category.name)}
            </Link>
          ))}
        </div>
      </div>
      <div
        className={`${styles.sidebarSpace} ${
          isExpanded ? styles.expanded : styles.collapsed
        }`}
      />
    </>
  );
}
