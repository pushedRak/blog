"use client";

import { useEffect, useState } from "react";
import styles from "./TocComponent.module.css";
import { TocItem } from "remark-flexible-toc";
import Link from "next/link";

interface TocComponentProps {
  toc?: TocItem[];
  indented?: boolean;
  ordered?: boolean;
}

export default function TocComponent({
  toc,
  indented = true,
}: TocComponentProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!toc) return;

    const headingIds = toc.map((item) => item.href.replace("#", ""));
    const headingElements = headingIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new window.IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "0px 0px -70% 0px",
        threshold: 0.3,
      }
    );

    headingElements.forEach((el) => observer.observe(el));

    return () => {
      headingElements.forEach((el) => observer.unobserve(el));
    };
  }, [toc]);

  if (!toc) {
    return null;
  }

  return (
    <div className={styles.container}>
      <ol className={styles.tocList}>
        {toc.map((heading, index) => {
          const id = heading.href.replace("#", "");
          const isActive = activeId === id;
          return (
            <li
              key={index}
              className={`
                ${indented && styles[`h${heading.depth}indent`]}
                ${isActive ? styles.active : ""}
              `}
            >
              <Link href={heading.href} replace>
                {heading.value}
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
