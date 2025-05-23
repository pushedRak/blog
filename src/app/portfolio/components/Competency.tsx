"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./Competency.module.css";

export default function Competency() {
  const competencyRefs = [useRef(null), useRef(null), useRef(null)];
  const [visibleItems, setVisibleItems] = useState([false, false, false]);

  useEffect(() => {
    const observers = competencyRefs.map((ref, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return observer;
    });

    return () => {
      observers.forEach((observer, index) => {
        if (competencyRefs[index].current) {
          observer.unobserve(competencyRefs[index].current);
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.competencyContainer}>
      <div
        ref={competencyRefs[0]}
        className={`${styles.competencyItem} ${
          visibleItems[0] ? styles.visible : ""
        }`}
      >
        <div className={`${styles.imageWrapper} ${styles.leftImage}`}>
          <Image alt="모던 프론트엔드 개발" src={`/images/core_1.png`} fill />
        </div>
        <div className={styles.textContent}>
          <div className={styles.competencyTitle}>모던 프론트엔드 개발</div>
          <div className={styles.competencyDescription}>
            React.js 기반의 웹 애플리케이션 개발 경험이 있으며,
            JavaScript(ES6)와 TypeScript에 능숙합니다.
            <br />
            상태 관리 라이브러리를 활용하여 복잡한 상태를 효율적으로 관리하고,
            성능 최적화를 고려한 컴포넌트 설계를 할 수 있습니다.
          </div>
        </div>
      </div>

      <div
        ref={competencyRefs[1]}
        className={`${styles.competencyItem} ${styles.reversed} ${
          visibleItems[1] ? styles.visible : ""
        }`}
      >
        <div className={`${styles.imageWrapper} ${styles.rightImage}`}>
          <Image alt="커뮤니케이션 및 협업" src={`/images/core_2.png`} fill />
        </div>
        <div className={styles.textContent}>
          <div className={styles.competencyTitle}>커뮤니케이션 및 협업</div>
          <div className={styles.competencyDescription}>
            GitHub, Jira, Notion 등의 협업 도구를 활용하여 효과적으로 업무를
            관리할 수 있습니다.
            <br />
            코드 리뷰 및 PR 단위 협업을 통해 코드 품질을 유지하고, 피드백을
            반영하여 기능을 개선하는 경험이 있습니다.
          </div>
        </div>
      </div>

      <div
        ref={competencyRefs[2]}
        className={`${styles.competencyItem} ${
          visibleItems[2] ? styles.visible : ""
        }`}
      >
        <div className={`${styles.imageWrapper} ${styles.leftImage}`}>
          <Image
            alt="문제 해결 능력 및 디버깅 역량"
            src={`/images/core_3.png`}
            fill
          />
        </div>
        <div className={styles.textContent}>
          <div className={styles.competencyTitle}>
            문제 해결 능력 및 디버깅 역량
          </div>
          <div className={styles.competencyDescription}>
            콘솔 로그와 디버깅 도구를 활용해 오류를 빠르게 파악하고 해결한
            경험이 있습니다.
            <br />
            문제 상황을 쉽게 파악할 수 있도록 정리하고, 원인을 정확히 짚어내는
            데 강점이 있습니다.
          </div>
        </div>
      </div>
    </div>
  );
}
