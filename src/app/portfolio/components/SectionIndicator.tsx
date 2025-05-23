"use client";

import { useEffect, useState } from "react";
import styles from "./SectionIndicator.module.css";

interface NavItem {
  label: string;
  sectionId: string;
}

const navItems: NavItem[] = [
  { label: "소개", sectionId: "intro" },
  { label: "핵심 역량", sectionId: "competency" },
  { label: "기술 스택", sectionId: "tech-stack" },
  { label: "프로젝트", sectionId: "projects" },
  { label: "교육", sectionId: "education" },
];

export default function SectionIndicator() {
  const [activeSection, setActiveSection] = useState<string>("intro");

  useEffect(() => {
    const handleScroll = () => {
      // 현재 화면에 보이는 섹션 확인
      const sections = navItems.map((item) => {
        const element = document.getElementById(item.sectionId);
        if (!element) return { id: item.sectionId, position: -1 };

        const rect = element.getBoundingClientRect();
        return {
          id: item.sectionId,
          position: rect.top,
        };
      });

      // 화면에 보이는 섹션 중 가장 위에 있는 섹션을 활성화
      const visibleSections = sections.filter(
        (section) => section.position <= 200
      );
      if (visibleSections.length > 0) {
        const topSection = visibleSections.reduce((prev, current) =>
          current.position > prev.position ? current : prev
        );
        setActiveSection(topSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // 초기 로드 시 섹션 ID 설정
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.indicatorContainer}>
      <ul className={styles.indicatorList}>
        {navItems.map((item) => (
          <li
            key={item.sectionId}
            className={`${styles.indicatorItem} ${
              activeSection === item.sectionId ? styles.active : ""
            }`}
            onClick={() => scrollToSection(item.sectionId)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
