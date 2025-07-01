"use client";

import Link from "next/link";
import BarLeftIcon from "./components/BarLeftIcon";
import styles from "./Navbar.module.css";
import Logo from "./components/Logo";
import Categories from "./components/Categories";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [expand, setExpand] = useState(true);
  const [mobileExpand, setMobileExpand] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const categories = [
    { id: 1, name: "개발" },
    { id: 2, name: "알고리즘" },
  ];

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.matchMedia("(max-width: 64rem)").matches;
      setIsMobile(mobile);
      if (!mobile) setMobileExpand(false);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.header}>
          <button
            className={styles.hamburger}
            onClick={() =>
              isMobile
                ? setMobileExpand((prev) => !prev)
                : setExpand((prev) => !prev)
            }
          >
            <BarLeftIcon width={30} height={30} />
          </button>
          <Link href="/" className={styles.logoWrapper}>
            <Logo width={40} height={24} />
          </Link>
        </div>
      </nav>
      {/* 64rem 이상에서 expand 상태에 따라 sidebar 표시 */}
      {!isMobile && expand && (
        <aside className={styles.sidebar}>
          <Categories categories={categories} />
        </aside>
      )}
      {/* 64rem 이하에서 햄버거 클릭 시 overlay와 sidebar 표시 */}
      {isMobile && mobileExpand && (
        <>
          <div
            className={styles.overlay}
            onClick={() => setMobileExpand(false)}
          />
          <aside className={styles.sidebar}>
            <div className={styles.header}>
              <button
                className={styles.hamburger}
                onClick={() =>
                  isMobile
                    ? setMobileExpand((prev) => !prev)
                    : setExpand((prev) => !prev)
                }
              >
                <BarLeftIcon width={30} height={30} />
              </button>
              <Link href="/" className={styles.logoWrapper}>
                <Logo width={40} height={24} />
              </Link>
            </div>
            <Categories categories={categories} />
          </aside>
        </>
      )}
    </>
  );
}
