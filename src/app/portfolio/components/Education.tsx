import styles from "./Education.module.css";

export default function Education() {
  return (
    <div className={styles.container}>
      <div className={styles.educationWrapper}>
        <p className={styles.period}>2024.01 - 2024.12</p>
        <div>
          <h2 className={styles.title}>삼성 소프트웨어 아카데미</h2>
          <p className={styles.subtitle}>Java 전공</p>
          <ul className={styles.description}>
            <li>
              <p>
                컴퓨터 공학 기초 지식과 웹 개발 전반(HTML, CSS, JavaScript,
                Servlet, JSP 등)에 대해 학습
              </p>
              <p>MVC 패턴을 기반으로 한 CRUD 기능 구현 및 팀 프로젝트 진행</p>
            </li>
            <li>
              <p>
                3개의 프로젝트를 진행하며 React, TypeScript, Redux, WebSocket
                등의 최신 프론트엔드 기술을 익히고,
              </p>
              <p>
                사용자 경험을 고려한 UI 구현 및 유지보수 가능한 구조 설계 경험을
                쌓음
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.educationWrapper}>
        <p className={styles.period}>2018.03 - 2024.02</p>
        <div>
          <h2 className={styles.title}>금오공과대학교</h2>
          <p className={styles.subtitle}>전자공학부 반도체시스템 전공</p>
          <ul className={styles.description}>
            <li>
              <p>프로그래밍 언어(C, Python) 과목 이수</p>
              <p>
                프로그래밍 과목(C, 마이크로프로세서, 임베디드시스템) 조교 활동
                수행
              </p>
            </li>
            <li>
              <p>
                제어 및 자동화 시스템 연구실에서 C++과 OpenCV를 활용한 영상 처리
                프로젝트 진행
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
