"use client";

import { useState } from "react";
import BarLeftIcon from "./BarLeftIcon";
import Logo from "./Logo";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = decodeURI(usePathname());

  return (
    <>
      <div className={styles.header}>
        <button
          className={styles.barLeftIconWrapper}
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          <BarLeftIcon width={24} height={24} strokeWidth={5} />
        </button>
        <Link className={styles.logoWrapper} href="/">
          <Logo width={44.8} height={28} />
        </Link>
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
