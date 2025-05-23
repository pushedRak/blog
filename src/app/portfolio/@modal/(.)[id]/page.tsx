import Image from "next/image";
import { Modal } from "./modal";
import styles from "./page.module.css";

const projectDetails = [
  {
    id: 0,
    logoUrl: "/icons/newLearnIcon.png",
    title: "NewLearn",
    subtitle: "뉴스 기반 영어 학습 플랫폼",
    period: {
      start: "2024.08",
      end: "2024.10",
    },
    teamSize: { total: 6, backend: 3, frontend: 3 },
    TechStack: [
      { id: 0, name: "React", iconUrl: "/icons/reactIcon.png" },
      { id: 1, name: "TypeScript", iconUrl: "/icons/typescriptIcon.png" },
      { id: 2, name: "Recoil", iconUrl: "/icons/recoilIcon.png" },
      {
        id: 3,
        name: "Styled-Components",
        iconUrl: "/icons/styledComponentsIcon.png",
      },
    ],
    tasks: [
      { id: 0, description: "아바타 커스터마이징 기능 구현" },
      { id: 1, description: "JWT를 이용한 로그인 기능 구현" },
      {
        id: 2,
        description: "JavaScript를 이용한 단어 하이라이팅, 튜토리얼 기능 구현",
      },
      { id: 3, description: "모바일 / 데스크탑 반응형 UI 및 다크모드 구현" },
    ],
    details: [
      {
        id: 0,
        work: "아바타 커스터마이징",
        descriptions: [
          "아바타를 3개의 구역(Skin, Eyes, Mask)으로 되어 사용자가 커스터마이징하게 만들었습니다.",
          "모든 아바타가 포함된 긴 이미지 파일을 불러와 transform 속성의 translate를 이용하여 특정 부분만 보이게 하는 방식으로 구현하였습니다.",
          "아바타의 생동감을 주기 위하여 2프레임의 GIF 형식으로 이미지를 저장하였습니다.",
        ],
        image: "/images/project1_1a.gif",
      },
      {
        id: 1,
        work: "JWT 인증 방식 로그인",
        descriptions: [
          "로그인 시 Access Token을 발급하고, axios의 Interceptor를 이용하여 권한이 필요한 요청이 들어왔을 때 Access Token 검증을 통해 사용자를 인증합니다.",
          "HttpOnly Cookie를 통해 Access Token 정보를 제공함으로써 XSS 공격으로부터 보호됩니다.",
        ],
      },
      {
        id: 2,
        work: "단어 하이라이팅",
        descriptions: [
          "뉴스에서 모르는 단어가 있을 때 사전에서 검색하고 단어장에 저장할 수 있는 기능입니다.",
          "다음 사전 API를 사용했으며, 여러 가지 조건을 추가하여(특수 기호, 띄어쓰기 포함 등) 사전에서 검색되지 않는 경우의 수를 제거했습니다.",
          "useRef 함수를 사용하여 하이라이팅 된 단어의 위치를 얻어와 해당 단어의 주변에 Modal이 표시되도록 했습니다.",
          "해당 뉴스에서 하이라이팅 된 단어를 표시하기 위해 공백을 기준으로 태그를 나누어 이미 하이라이팅 된 단어의 경우 재접속해도 하이라이팅 되도록 했습니다.",
        ],
        image: "/images/project1_3a.gif",
      },
      {
        id: 3,
        work: "뉴스 읽음 처리",
        descriptions: [
          "학습 장려를 위해 뉴스를 읽었을 때 경험치를 부여합니다.",
          "뉴스 본문의 좌표와 현재 스크롤 위치를 비교하여 진행도를 판별합니다.",
          "뉴스 난이도에 따라 경험치와 메달이 부여됩니다.",
        ],
        image: "/images/project1_4a.gif",
      },
      {
        id: 4,
        work: "반응형 UI 및 다크모드 구현",
        descriptions: [
          "모바일 / 데스크탑 환경 모두에서 서비스를 이용할 수 있도록 media-query를 이용하여 반응형 UI를 구현하였습니다.",
          "styled-components의 ThemeProvider를 이용하여 다크 / 라이트 모드를 토글할 수 있도록 구현하였습니다.",
        ],
        image: "/images/project1_5a.gif",
      },
    ],
  },
  {
    id: 1,
    logoUrl: "/icons/campForestIcon.png",
    title: "CampForest",
    subtitle: "캠핑 장비 거래 SNS",
    period: {
      start: "2024.07",
      end: "2024.08",
    },
    teamSize: { total: 6, backend: 3, frontend: 3 },
    TechStack: [
      { id: 0, name: "React", iconUrl: "/icons/reactIcon.png" },
      { id: 1, name: "TypeScript", iconUrl: "/icons/typescriptIcon.png" },
      { id: 2, name: "Redux", iconUrl: "/icons/reduxIcon.png" },
      {
        id: 3,
        name: "Tailwind",
        iconUrl: "/icons/tailwindCSSIcon.png",
      },
      {
        id: 4,
        name: "WebSocket",
        iconUrl: "/icons/webSocketIcon.png",
      },
    ],
    tasks: [
      { id: 0, description: "WebSocket을 이용한 실시간 채팅 기능 구현" },
      { id: 1, description: "Server Side Event를 이용한 알림 기능 구현" },
      {
        id: 2,
        description: "Gsap 라이브러리를 이용한 애니메이션 구현",
      },
      { id: 3, description: "모바일 / 데스크탑 반응형 UI 및 다크모드 구현" },
    ],
    details: [
      {
        id: 0,
        work: "1:1 실시간 채팅",
        descriptions: [
          "WebSocket을 이용하여 1:1 실시간 채팅 기능을 구현하였습니다.",
          "읽음 처리의 경우도 WebSocket으로 전송함으로써 상대방의 메시지 읽음 여부를 확인할 수 있습니다.",
          "구독을 한 메세지의 경우에만 수신이 가능한 WebSocket의 한계를 보완하기 위해 Server Side Events를 활용하여 새로운 대상이 채팅을 시작했을 때 해당 채팅방을 구독하도록 하였습니다.",
        ],
        image: "/images/project2_1a.gif",
      },
      {
        id: 1,
        work: "지도 API를 이용한 위치 설정",
        descriptions: [
          "네이버 지도 API를 이용하여 사용자가 거래 장소를 설정할 수 있게 하였습니다.",
          "Geocoder 서브 모듈을 이용하여 좌표로 주소를 검색하는 방식으로 구현하였습니다.",
        ],
        image: "/images/project2_5a.mp4",
      },
      {
        id: 2,
        work: "알림 기능",
        descriptions: [
          "Server Side Events를 이용하여 댓글, 좋아요, 팔로우 등 각종 새로운 소식에 대한 알림 기능을 구현하였습니다.",
          "상태 관리 라이브러리 Redux를 활용하여 알림 읽음 처리와 지난 알림에 대한 정보를 효율적으로 관리하였습니다.",
        ],
        image: "/images/project2_2a.gif",
      },
      {
        id: 3,
        work: "다크모드 전환 애니메이션",
        descriptions: [
          "Gsap 라이브러리를 활용하여 다크모드 전환 시 밤낮이 바뀌는 연출을 구현하였습니다.",
        ],
        image: "/images/project2_3a.mp4",
      },
      {
        id: 4,
        work: "반응형 UI",
        descriptions: [
          "Tailwind CSS를 활용하여 모바일 / 데스크탑 반응형 UI를 구현하였습니다.",
        ],
        image: "/images/project2_4a.mp4",
      },
    ],
  },
  {
    id: 2,
    logoUrl: "/icons/eumIcon.png",
    title: "이음",
    subtitle: "디지털 교과서 학습 보조 플랫폼",
    period: {
      start: "2024.10",
      end: "2024.11",
    },
    teamSize: { total: 6, backend: 3, frontend: 3 },
    TechStack: [
      { id: 0, name: "React Native", iconUrl: "/icons/reactIcon.png" },
      { id: 1, name: "TypeScript", iconUrl: "/icons/typescriptIcon.png" },
      { id: 2, name: "Zustand", iconUrl: "/icons/zustandIcon.png" },
      {
        id: 3,
        name: "Firebase",
        iconUrl: "/icons/firebaseIcon.png",
      },
    ],
    tasks: [
      {
        id: 0,
        description:
          "JavaScript와 React Native의 Animated를 이용한 애니메이션 구현",
      },
      { id: 1, description: "트리 구조의 문제 보관함 기능 구현" },
      {
        id: 2,
        description: "Firebase를 이용한 알림 기능 구현",
      },
      { id: 3, description: "WebView를 이용한 문제 이미지 출력 기능 구현" },
    ],
    details: [
      {
        id: 0,
        work: "시간에 따라 변하는 배경 애니메이션",
        descriptions: [
          "JavaScript와 React Native의 Animated를 이용하여 시간에 따라 변하는 배경 애니메이션을 구현하였습니다.",
          "시간표 View의 스크롤 위치에 따라 배경의 색과 행성의 위치를 조정하는 것으로 해당 효과를 표현하였습니다.",
        ],
        image: "/images/project3_1a.mp4",
      },
      {
        id: 1,
        work: "트리 구조의 문제 보관함",
        descriptions: [
          "Windows의 파일 탐색기와 비슷한 구조로 문제 보관함을 구현하였습니다.",
          "파일은 디렉토리와 문제로 구분되며 뒤로 가기, 앞으로 가기, 상위 디렉토리로 이동하기 등 파일 탐색기와 유사한 기능을 가지고 있습니다.",
        ],
        image: "/images/project3_2a.mp4",
      },
      {
        id: 2,
        work: "알림 기능",
        descriptions: [
          "Firebase Cloud Messaging 기능을 이용하여 앱 푸시 알림을 구현하였습니다.",
          "수업 시작, 새로운 숙제 등에 대한 알림이 발송되며, 알림들은 알림 탭에서 읽음 처리 및 삭제를 통해 관리할 수 있습니다.",
        ],
        image: "/images/project3_3a.mp4",
      },
      {
        id: 3,
        work: "책이 펼쳐지는 애니메이션",
        descriptions: [
          "수업들을 책의 형태로 표시하고, 수업을 터치했을 때 책이 펼쳐지는 듯한 효과를 주었습니다.",
          "View 박스의 현재 위치와 크기를 획득하여 전체 페이지에 띄우는 방식으로 구현하였습니다.",
        ],
        image: "/images/project3_4a.mp4",
      },
      {
        id: 4,
        work: "OCR을 이용한 PDF 문제 추출",
        descriptions: [
          "OCR을 통해 추출된 문제를 Latex 문법으로 저장하고, 이를 사용 가능한 형태로 파싱하고 WebView에 띄우는 방식으로 문제를 출력하였습니다.",
          "데이터 처리를 비동기적으로 처리하기 위해 OCR이 진행되는 동안 로딩 중임을 표시하는 스피너가 출력되도록 하였습니다.",
        ],
        image: "/images/project3_5a.mp4",
      },
    ],
  },
];

export default async function ProjectModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const projectDetail = projectDetails[+resolvedParams.id];

  return (
    <Modal>
      <Image
        alt={projectDetail.title}
        src={projectDetail.logoUrl}
        width={64}
        height={64}
      />
      <h1 className={styles.projectTitle}>{projectDetail.title}</h1>
      <h3 className={styles.projectSubtitle}>{projectDetail.subtitle}</h3>
      <div>
        <span className={styles.projectPeriod}>
          {projectDetail.period.start} ~ {projectDetail.period.end}
        </span>
        <span className={styles.projectTeamSize}>
          {`${projectDetail.teamSize.total}명 (프론트엔드 
          ${projectDetail.teamSize.frontend}명, 백엔드 ${projectDetail.teamSize.backend}명)`}
        </span>
      </div>
      <div className={styles.contentContainer}>
        <div>
          <h3 className={styles.head3}>기술 스택</h3>
          <div className={styles.techStackContainer}>
            {projectDetail.TechStack.map((skill) => (
              <Image
                key={skill.id}
                alt=""
                src={skill.iconUrl}
                width={40}
                height={40}
              />
            ))}
          </div>
        </div>
        <div>
          <h3 className={styles.head3}>주요 기여</h3>
          <ul>
            {projectDetail.tasks.map((task) => (
              <li key={task.id} className={styles.list}>
                {task.description}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className={styles.head3}>상세 내용</h3>
          <ul className={styles.detailContainer}>
            {projectDetail.details.map((detail) => (
              <li key={detail.id} className={styles.list}>
                <p className={styles.work}>{detail.work}</p>
                {detail.descriptions.map((description, index) => (
                  <p key={index}>{description}</p>
                ))}
                {detail.image && (
                  <div className={styles.detailImageWrapper}>
                    {detail.image.endsWith(".mp4") ? (
                      <video
                        src={detail.image}
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      <Image
                        alt=""
                        src={detail.image}
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
}
