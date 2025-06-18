"use client";

import styles from "./ProjectPagination.module.css";
import { useState } from "react";
import { ProjectDetail } from "../../type/project";
import { OverviewPage } from "./OverviewPage";
import { TechnicalChallengePage } from "./TechnicalChallengePage";
import { LessonsAndRegrets } from "./LessonsLearnedPage";

export function ProjectPagination({ project }: { project: ProjectDetail }) {
  const totalPages = 3;
  const [currentPage, setCurrentPage] = useState(0);

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderCurrentPage = () => {
    if (currentPage === 0) {
      return <OverviewPage project={project} />;
    } else if (currentPage === 1) {
      return (
        <TechnicalChallengePage challenges={project.technicalChallenges} />
      );
    } else {
      return (
        <LessonsAndRegrets
          lessons={project.lessonsLearned}
          regrets={project.regrets}
        />
      );
    }
  };

  return (
    <>
      <button
        className={`${styles.button} ${styles.button_prev} ${
          currentPage === 0 ? styles.disabled : ""
        }`}
        onClick={goToPrevPage}
        disabled={currentPage === 0}
      >
        ◀
      </button>

      <button
        className={`${styles.button} ${styles.button_next} ${
          currentPage === totalPages - 1 ? styles.disabled : ""
        }`}
        onClick={goToNextPage}
        disabled={currentPage === totalPages - 1}
      >
        ▶
      </button>

      <div className={styles.modalContent}>{renderCurrentPage()}</div>
    </>
  );
}
