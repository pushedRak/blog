import { ProjectDetail } from "../type/project";

export const projectDetails: ProjectDetail[] = [
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
    techStack: [
      { id: 0, name: "React", iconUrl: "/icons/reactIcon.png" },
      { id: 1, name: "TypeScript", iconUrl: "/icons/typescriptIcon.png" },
      { id: 2, name: "Recoil", iconUrl: "/icons/recoilIcon.png" },
      {
        id: 3,
        name: "Styled-Components",
        iconUrl: "/icons/styledComponentsIcon.png",
      },
    ],
    overview:
      'NewLearn은 기존의 해외 뉴스 기반 영어 학습 플랫폼의 한계를 보완하기 위해 시작되었습니다. 당시 시장에는 해외 뉴스를 활용한 영어 학습 서비스들이 존재했지만, 학습자들에게 친숙하고 관심도가 높은 국내 뉴스를 활용한 서비스는 부족했습니다.\n\n저희는 "국내 뉴스로 영어를 학습한다면 어떨까?"라는 아이디어에서 출발했습니다. 국내 뉴스를 통해 우리나라의 현재 상황을 파악하는 동시에 영어 실력을 향상시킬 수 있다면, 학습자들에게 더욱 의미 있고 흥미로운 학습 경험을 제공할 수 있을 것이라고 생각했습니다.\n\n이러한 아이디어를 실현하기 위해 생성형 AI 기술을 활용하여 국내 뉴스를 초급, 중급, 고급의 3단계 난이도로 번역하는 시스템을 구축했습니다. 이를 통해 각 사용자의 영어 수준에 맞는 맞춤형 학습 콘텐츠를 제공하여 효과적인 영어 학습을 지원하는 것이 NewLearn의 핵심 목표입니다.',
    mainImage: "/images/project1_main.png",
    myRoles: {
      "메인 페이지 및 내비게이션 바": {
        description:
          "Top 10 뉴스가 있는 메인 페이지와 내비게이션 바를 구현했습니다.\nTop 10 뉴스는 좌, 우로 스와이프 할 수 있도록 Swiper 라이브러리를 사용했으며, 불필요한 리렌더링을 방지하고자 useMemo로 컴포넌트를 감싸주었습니다.",
        image: { type: "video", src: "/images/project1_main.mp4" },
      },
      "커스터마이징 가능한 아바타": {
        description:
          "아바타를 3개의 구역(Skin, Eyes, Mask)으로 되어 사용자가 커스터마이징하게 만들었습니다.\n모든 아바타가 포함된 긴 이미지 파일을 불러와 transform 속성의 translate를 이용하여 특정 부분만 보이게 하는 방식으로 구현하였습니다.\n아바타의 생동감을 주기 위하여 2프레임의 GIF 형식으로 이미지를 저장하였습니다.",
        image: {
          type: "video",
          src: "/images/project1_customizable-avatar.mp4",
        },
      },
      "다크모드 및 반응형 UI": {
        description:
          "모바일 / 데스크탑 환경 모두에서 서비스를 이용할 수 있도록 media-query를 이용하여 반응형 UI를 구현하였습니다.\nstyled-components의 ThemeProvider를 이용하여 다크 / 라이트 모드를 토글할 수 있도록 구현하였습니다.",
        image: { type: "video", src: "/images/project1_darkmode.mp4" },
      },
      튜토리얼: {
        description:
          "접근성 향상을 위해 온보딩 튜토리얼 기능을 구현했습니다.\n각 기능을 가진 컴포넌트에 id를 부여하고, useRef를 이용하여 현재 id에 해당하는 태그의 위치를 추적하여 하이라이팅 하였습니다.",
        image: { type: "video", src: "/images/project1_tutorial.mp4" },
      },
      "단어 하이라이팅": {
        description:
          "뉴스에서 모르는 단어가 있을 때 사전에서 검색하고 단어장에 저장할 수 있는 기능입니다.\n다음 사전 API를 사용했으며, 여러 가지 조건을 추가하여(특수 기호, 띄어쓰기 포함 등) 사전에서 검색되지 않는 경우의 수를 제거했습니다.\nuseRef 함수를 사용하여 하이라이팅 된 단어의 위치를 얻어와 해당 단어의 주변에 Modal이 표시되도록 했습니다.\n해당 뉴스에서 하이라이팅 된 단어를 표시하기 위해 공백을 기준으로 태그를 나누어 이미 하이라이팅 된 단어의 경우 재접속해도 하이라이팅 되도록 했습니다.",
        image: { type: "video", src: "/images/project1_word-highlighting.mp4" },
      },
      "뉴스 읽음 처리": {
        description:
          "학습 장려를 위해 뉴스를 읽었을 때 경험치를 부여합니다.\n뉴스 본문의 좌표와 현재 스크롤 위치를 비교하여 진행도를 판별합니다.\n뉴스 난이도에 따라 경험치와 메달이 부여됩니다.",
        image: { type: "video", src: "/images/project1_news-read.mp4" },
      },
      "JWT 기반 로그인": {
        description: "JWT 기반 인증 로그인을 구현했습니다.",
      },
    },
    technicalChallenges: [
      {
        id: 0,
        title: "아바타 이미지 최적화",
        problem:
          "사용자 커스터마이징을 위해 각 아바타 부위별로 개별 이미지를 로드하면 네트워크 요청이 과도하게 많아져 성능 저하가 발생했습니다. 또한 이미지 로딩 시간으로 인해 사용자 경험이 저하되는 문제가 있었습니다.",
        solution:
          "모든 아바타 이미지를 하나의 스프라이트 시트로 통합하고, CSS의 transform: translate 속성을 활용하여 특정 부분만 보이도록 구현했습니다. 이를 통해 네트워크 요청을 최소화하고 이미지 로딩 시간을 단축시켰습니다. 또한 2프레임 GIF 형식을 사용하여 아바타에 생동감을 부여했습니다.",
      },
      {
        id: 1,
        title: "실시간 단어 하이라이팅 성능 문제",
        problem:
          "사용자가 뉴스 본문에서 단어를 선택할 때마다 사전 API를 호출하면서 응답 지연이 발생했습니다. 또한 특수 기호나 복합어가 포함된 단어의 경우 사전에서 검색되지 않는 문제가 빈번했습니다.",
        solution:
          "사전 API 호출 전 클라이언트 단에서 전처리 로직을 구현했습니다. 특수 기호 제거, 띄어쓰기 처리, 단어 변형 등 다양한 조건을 추가하여 검색 성공률을 높였습니다. useRef를 활용해 하이라이팅된 단어의 정확한 위치를 추적하고, 해당 위치에 모달을 표시하는 기능을 구현했습니다.",
      },
      {
        id: 2,
        title: "뉴스 읽기 진행도 추적",
        problem:
          "사용자의 뉴스 읽기 진행도를 정확하게 측정하여 적절한 경험치를 부여하는 것이 어려웠습니다. 단순히 스크롤 위치만으로는 실제 읽기 여부를 판단하기 어려웠습니다.",
        solution:
          "뉴스 본문 영역의 좌표와 현재 스크롤 위치를 실시간으로 비교하여 읽기 진행도를 계산하는 알고리즘을 개발했습니다. 뉴스 난이도에 따라 차등화된 경험치 시스템을 구축하여 학습 동기를 부여했습니다.",
      },
    ],
    lessonsLearned: [
      "사용자 중심의 UI/UX 설계의 중요성을 깨달았습니다. 아바타 커스터마이징 기능을 통해 사용자 참여도를 높이고, 직관적인 인터페이스 설계가 사용자 만족도에 미치는 영향을 체험했습니다.",
      "성능 최적화에 대한 실질적인 경험을 쌓았습니다. 이미지 스프라이트 기법과 API 호출 최적화를 통해 성능 개선의 중요성과 방법론을 학습했습니다.",
      "팀 협업에서의 효율적인 소통 방법을 배웠습니다. 프론트엔드와 백엔드 간의 API 명세 정의와 데이터 구조 설계의 중요성을 이해했습니다.",
      "사용자 인증과 보안에 대한 이해를 높였습니다. JWT 토큰 기반 인증과 HttpOnly 쿠키를 활용한 XSS 방어 기법을 실제로 구현해보며 웹 보안의 기초를 다졌습니다.",
    ],
    regrets: [
      "초기 설계 단계에서 컴포넌트 재사용성을 충분히 고려하지 못해 개발 후반부에 코드 중복이 발생했습니다. 더 체계적인 컴포넌트 설계가 필요했습니다.",
      "사용자 테스트를 충분히 진행하지 못해 일부 사용성 문제를 늦게 발견했습니다. 개발 과정에서 지속적인 사용자 피드백 수집이 중요함을 깨달았습니다.",
      "성능 모니터링 도구를 도입하지 않아 실제 사용자 환경에서의 성능 지표를 정확히 파악하기 어려웠습니다.",
    ],
  },
  {
    id: 1,
    logoUrl: "/icons/campforestIcon.png",
    title: "CampForest",
    subtitle: "캠핑 장비 거래 SNS",
    period: {
      start: "2024.07",
      end: "2024.08",
    },
    teamSize: { total: 6, backend: 3, frontend: 3 },
    techStack: [
      { id: 0, name: "React", iconUrl: "/icons/reactIcon.png" },
      { id: 1, name: "TypeScript", iconUrl: "/icons/typescriptIcon.png" },
      { id: 2, name: "Redux", iconUrl: "/icons/reduxIcon.png" },
      {
        id: 3,
        name: "WebSocket",
        iconUrl: "/icons/WebSocketIcon.png",
      },
      {
        id: 4,
        name: "Tailwind CSS",
        iconUrl: "/icons/tailwindCSSIcon.png",
      },
    ],
    overview:
      "CampForest는 사용자 간 캠핑 장비를 대여, 거래할 수 있도록 도와주고 캠핑과 관련된 정보를 공유하는 소셜 네트워크 서비스입니다.\n\n캠핑 장비를 가지고 있지만 캠핑을 갈 여유가 되지 않아 캠핑 장비가 아깝다라는 생각에서 시작되었습니다. 반대로 캠핑 장비가 필요하지만 캠핑 장비를 구매하기에는 여력이 없는 사회 초년생들에게도 비교적 저렴한 가격에 대여할 수 있겠다고 생각하여 기획하게 되었습니다.\n\nCampForest는 캠핑 장비 거래 뿐만 아니라 캠핑과 관련된 피드를 올리고, 댓글과 죻아요 그리고 1:1 대화를 통해 캠핑에 관심이 있거나 캠핑을 좋아하는 사람들 간의 유대를 쌓을 수 있는 서비스입니다.",
    mainImage: "/images/project2_main.png",
    myRoles: {
      "실시간 1:1 대화": {
        description:
          "WebSocket을 사용하여 사용자 간 1:1 대화 기능을 구현했습니다.\n상대방의 현재 접속 중인 채팅방이 사용자의 채팅방과 동일할 때 사용자가 메시지를 보내면 메시지를 읽음 처리함으로써 상대방의 읽음 여부도 확인할 수 있습니다.\n",
        image: { type: "video", src: "/images/project2_1a.mp4" },
      },
      "실시간 알림": {
        description:
          "SSE(Server Side Event)를 사용하여 새로운 채팅이 시작되거나, 내가 작성한 피드에 댓글이 작성되는 등 사용자와 관련된 각종 상황에서 사용자에게 알리는 기능을 구현했습니다.\n",
        image: {
          type: "video",
          src: "/images/project2_2a.mp4",
        },
      },
      "인터랙티브한 애니메이션": {
        description:
          "gsap 라이브러리를 이용하여 다크모드 토글 시 해가 지고 달이 뜨는 인터랙티브한 애니메이션을 구현했습니다.\n",
        image: { type: "video", src: "/images/project2_3a.mp4" },
      },
      "반응형 UI": {
        description:
          "Tailwind CSS를 활용하여 데스크탑, 태블릿, 모바일 사이즈에 대응되는 반응형 UI를 구현했습니다.",
        image: { type: "video", src: "/images/project2_4a.mp4" },
      },
      "네이버 지도 API 기반 위치 공유": {
        description:
          "네이버 지도 API를 활용하여 사용자가 터치/클릭한 지도 상의 좌표를 구한 뒤, 해당 좌표의 주소를 상대방에게 공유할 수 있습니다.",
        image: { type: "video", src: "/images/project2_5a.mp4" },
      },
    },
    technicalChallenges: [
      {
        id: 0,
        title: "채팅 읽음 처리",
        problem:
          "WebSocket의 특성 상 구독 당시의 변수값을 참조하는데, Reference 값이 아닌 실제 값을 넘겨주면서 현재 접속중인 채팅방이 정상적으로 반영되지 않아 읽음 처리가 되지 않는 문제가 있었습니다.",
        solution:
          "WebSocket의 특성을 이해하고, Reference 값으로 데이터를 넘겨줌으로써 현재 상태를 성공적으로 반영하였습니다.",
      },
      {
        id: 1,
        title: "새로운 채팅방 개설",
        problem:
          "새로운 1:1 채팅을 시작하는 유저 입장에서는 채팅이 시작됨을 알 수 있지만, 상대방은 알 수 없다는 문제가 있었습니다.",
        solution:
          "SSE로 채팅방 ID와 함께 채팅이 시작되었음을 알리고, 이를 WebSocket으로 구독하도록 하여 해당 문제를 해결할 수 있었습니다.",
      },
      {
        id: 2,
        title: "페이지네이션의 한계",
        problem:
          "페이지네이션 방식으로 피드 목록을 불러올 때, 새로운 피드가 생성되면서 이전에 읽었던 피드가 중복되어 불러와 지는 현상을 발견했습니다.",
        solution:
          "커서 기반 페이지네이션을 도입함으로써 이전에 어떤 피드까지 불러왔는지를 기억하고 이후의 피드를 불러옮으로써 해당 문제를 해결할 수 있었습니다.",
      },
    ],
    lessonsLearned: [
      "Tailwind CSS를 사용하여 반응형, 다크모드를 구현하며 Tailwind CSS를 능숙하게 다를 수 있게 되었습니다.",
      "WebSocket을 이용한 실시간 채팅 기능을 구현하며 발생한 문제를 해결함으로써 WebSocket의 동작 방식을 배울 수 있었습니다.",
      "실시간성이 부족한 페이지네이션의 한계를 극복하기 위해 커서 기반 페이지네이션을 적용시킬 수 있다는 사실을 알았습니다.",
      "Props Drilling을 피하기 위해 상태 관리 라이브러리인 Redux를 사용함으로써, 복잡한 상태에 대한 관리 방법을 배울 수 있었습니다.",
    ],
    regrets: [
      "WebSocket 관련 로직을 여러 상황(거래 게시글에서 채팅 시작, 사용자에게 직접 채팅 시작)에서 사용하고 있는데, 중복된 코드를 정리하지 못한 점이 아쉽습니다.",
      "MVP를 구현하기 이전에 너무 많은 양의 기능을 기획하다 보니 전체적인 완성도가 낮아진 점이 아쉽습니다.",
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
    techStack: [
      { id: 0, name: "React Native", iconUrl: "/icons/reactIcon.png" },
      { id: 1, name: "TypeScript", iconUrl: "/icons/typescriptIcon.png" },
      { id: 2, name: "Zustand", iconUrl: "/icons/zustandIcon.png" },
      {
        id: 3,
        name: "Firebase",
        iconUrl: "/icons/firebaseIcon.png",
      },
    ],
    overview:
      "이음은 디지털 교과서 시대에 맞춘 학습 보조 플랫폼입니다. 코로나19 이후 비대면 교육이 확산되면서 디지털 교과서 사용이 급증했지만, 기존 교육 도구들은 여전히 아날로그 방식에 머물러 있었습니다.\n\n특히 수학이나 과학과 같은 문제 해결 중심 과목에서는 손으로 문제를 풀고 정리하는 과정이 중요한데, 디지털 환경에서는 이러한 학습 과정을 체계적으로 관리하기 어려웠습니다. 또한 학생들이 푼 문제들을 효율적으로 분류하고 복습할 수 있는 도구가 부족했습니다.\n\n이음은 이러한 문제를 해결하기 위해 OCR 기술을 활용한 문제 추출, 트리 구조의 문제 보관함, 시간표 기반 학습 관리 등의 기능을 제공합니다. 학생들이 디지털 환경에서도 효율적으로 학습할 수 있도록 돕는 것이 핵심 목표입니다.",
    mainImage: "/images/project3_main.png",
    myRoles: {
      "시간에 따른 배경 변화": {
        description:
          "시간표 스크롤에 따라 배경색과 행성 위치를 자연스럽게 변하는 애니메이션을 구현했습니다.",
        image: { type: "video", src: "/images/project3_1a.mp4" },
      },
      "문제 보관함": {
        description:
          "폴더 생성, 폴더 이동, 뒤로 가기, 앞으로 가기 등 파일 탐색기와 유사한 기능을 가진 문제 보관함을 구현했습니다.\n트리와 유사한 구조로 각 노드들은 부모와 자식을 가지며, 히스토리는 배열을 자르고 이어 붙이는 방식으로 구현할 수 있었습니다.",
        image: {
          type: "video",
          src: "/images/project3_2a.mp4",
        },
      },
      "Firebase 기반의 푸시 알림": {
        description:
          "Firebase와 애플리케이션을 연동하여 사용자에게 수업 시작, 숙제 생성 등과 같은 정보를 푸시로 알릴 수 있습니다.",
        image: { type: "video", src: "/images/project3_3a.mp4" },
      },
      "펼쳐지는 책 애니메이션": {
        description:
          "수업 목록에서의 수업을 책의 형태로 표현하고, 수업 상세 페이지에 접속하는 과정에 몰입도를 높이기 위해 책이 펼쳐지는 듯한 애니메이션 효과를 구현하였습니다.",
        image: { type: "video", src: "/images/project3_4a.mp4" },
      },
      "PDF OCR을 통한 문제 생성": {
        description:
          "PDF 파일을 외부 API로 보내어 사용 가능한 형태로 가공하는 흐름을 구현했습니다.",
        image: { type: "video", src: "/images/project3_5a.mp4" },
      },
    },
    technicalChallenges: [
      {
        id: 0,
        title: "히스토리 파일 정보 동기화",
        problem:
          "문제 보관함 페이지에서 히스토리 내에 있던 파일이나 폴더가 삭제/이동/변경되었을 때, 히스토리에는 반영이 되지 않아 뒤로 가기나 상위 디렉토리 이동 시 에러가 발생했습니다.",
        solution:
          "Zustand를 활용하여 파일이나 폴더를 삭제/이동/변경할 때, 히스토리 내에 해당 파일을 찾고 수정하는 reducer를 만들어 활용함으로써 문제를 해결할 수 있었습니다.",
      },
      {
        id: 1,
        title: "책 펼침 애니메이션 컴포넌트화",
        problem:
          "책이 펼쳐지는 애니메이션은 해당 책의 초기 위치를 이용하여 해당 위치에서 서서히 이동한 뒤 책이 펼쳐지는 듯한 효과를 구현한 것인데, 이를 컴포넌트화 했을 때 상대적인 좌표 변화로 책의 위치가 이상해지는 문제가 있었습니다.",
        solution:
          "props를 통한 복잡한 좌표값의 전달이 아니라, Zustand를 이용한 상태 관리를 통해 좌표값을 정확하게 받아올 수 있었고, 펼쳐지는 책을 컴포넌트화 할 수 있었습니다.",
      },
    ],
    lessonsLearned: [
      "트리 구조의 문제 보관함을 만들며, 내비게이션 히스토리 관리 등을 통해 복잡한 상태 관리에 대한 역량을 향상 시킬 수 있었습니다.",
      "시간에 따른 배경의 변화, 펼쳐지는 책 애니메이션 등을 구현하며 사용자의 몰입도를 올리는 UI/UX 개발 역량을 향상 시킬 수 있었습니다.",
      "PDF 데이터를 외부 API로 전송하고, 해당 데이터를 받아 문제를 생성하는 흐름을 구현하며 동기적인 데이터 흐름에 대한 처리 능력을 향상 시킬 수 있었습니다.",
    ],
    regrets: [
      "애니메이션에 자원을 많이 소비한 탓에 핵심 학습 기능의 완성도가 상대적으로 떨어지는 점이 아쉽습니다.",
      "시각적 효과에 치중하여 스크린 리더 사용자나 모션 민감성이 있는 사용자를 위한 대체 옵션을 제공하지 못한 점이 아쉽습니다.",
    ],
  },
  {
    id: 3,
    logoUrl: "/icons/rakBlogIcon.png",
    title: "락 블로그",
    subtitle: "개인 블로그 개발",
    period: {
      start: "2025.05",
      end: "진행 중",
    },
    teamSize: { total: 1, backend: 1, frontend: 1 },
    techStack: [
      { id: 0, name: "Next.js", iconUrl: "/icons/nextjsIcon.png" },
      { id: 1, name: "Supabase", iconUrl: "/icons/supabaseIcon.png" },
    ],
    overview:
      "개인적으로 공부한 내용이나, 개발을 진행하며 트러블 슈팅을 해결한 경험을 남길 수 있는 블로그를 개설하고자 했습니다.\n\n이미 서비스 중인 블로그 플랫폼들이 많지만, 처음부터 끝까지 제가 개발한, 저만의 블로그를 가지고 싶다고 생각하여 Next.js로 개인 블로그를 개발하게 되었습니다.",
    mainImage: "/images/default-image.png",
    myRoles: {
      "App Router 기반 구조 설계 및 SSR 활용": {
        description:
          "Next.js는 파일 디렉토리 기반으로 라우팅 됩니다. 그 중에서도 React의 Server Components에 대응하여 Next.js 13+에서 개발된 App Router를 활용했습니다.",
        image: { type: "image", src: "/images/project4_1a.png" },
      },
      "Github OAuth": {
        description:
          "Supabase와 Github의 OAuth를 활용하여 Github 계정을 이용한 사용자 인증 기능을 구현했습니다.\n해당 기능과 middleware를 결합하여 사용자 인증이 필요한 페이지(글쓰기 페이지)에 권한이 있는 사용자만 접근할 수 있도록 구현했습니다.",
        image: {
          type: "image",
          src: "/images/project4_2a.png",
        },
      },
      "MDX 파일 형식의 포스트": {
        description:
          "MDX 파일 형식으로 포스트를 관리합니다. 포스트 상세 페이지에서 DB에 마크다운 형식으로 작성된 Content를 받아와 MDXRemote 라이브러리를 통해 렌더링됩니다.\n또한, 포스트 작성 페이지에서 마크다운으로 작성된 텍스트를 HTML 형태로 Serialize하여 렌더링 할 수도 있습니다.",
        image: { type: "image", src: "/images/project4_3a.png" },
      },
    },
    technicalChallenges: [
      {
        id: 0,
        title:
          "CSS-in-JS 라이브러리 사용 시 SSR에서 스타일 hydration 문제 및 추가적인 런타임 오버헤드 발생",
        problem:
          "처음에 블로그를 개발할 때 동적인 스타일링을 용이하게 하기 위해 Emotion CSS를 사용했습니다. 하지만 개발을 진행하며 CSS-in-JS는 Server Side Rendering 방식의 개발을 진행할 때 매우 불리하며, hydration 문제 또한 피할 수 없었습니다.",
        solution:
          "블로그와 같이 정적인 컨텐츠에서 동적인 스타일링이 크게 필요가 없기 때문에 런타임 오버헤드와 hydration과 같은 문제를 감수하면서 Emotion을 사용할 필요가 없다고 판단했고, 공식 문서에서 권장하는 CSS Module 방식으로 스타일링을 함으로써 해당 문제를 해결할 수 있었습니다.",
      },
      {
        id: 1,
        title: "컴포넌트 관리 구조의 복잡성",
        problem:
          "단일 components 폴더로 모든 컴포넌트를 관리할 때, 규모가 커지면서 파일 탐색과 의존성 파악이 어려워졌습니다.",
        solution:
          "각 페이지/기능별로 독립적인 components 폴더를 생성하고, 공통적으로 사용하는 컴포넌트가 있다면 루트 components 폴더에 배치하였습니다. 또한, 비즈니스 로직과 스타일 로직을 분리하면서 파일이 2개로 늘어났는데, 이 두 파일을 하나의 폴더로 묶고 index.ts를 통해 명확한 진입점을 정의하여 import 경로를 단순화할 수 있었습니다.",
      },
      {
        id: 2,
        title: "데이터 일관성 보장",
        problem:
          "게시글 조회와 조회수 증가가 별도 작업으로 처리되어, 한 쪽이 실패할 경우 데이터 불일치가 발생하는 문제가 있었습니다.",
        solution:
          "Supabase의 rpc 함수를 통해 게시글 조회와 조회수 증가를 하나의 트랜잭션으로 묶어 처리함으로써 데이터 일관성을 보장할 수 있게 되었습니다.",
      },
    ],
    lessonsLearned: [
      "App Router 기능을 통해 Server Components, Interception Routes 등 라우팅 기법에 대한 이해도가 향상되었습니다.",
      "스타일링 도구를 선택함에 있어 프로젝트의 성질(정적인지, 성능이 중요한 프로젝트인지 등)에 맞게 선택하는 시야를 얻을 수 있었습니다.",
      "확장이 용이한 컴포넌트 아키텍처 설계 경험으로 대규모 프로젝트 관리 능력이 향상되었습니다.",
      "DB 설계, API 설계부터 연동까지 혼자 진행하며 웹 서비스의 전반에 대한 이해도가 향상되었습니다.",
    ],
    regrets: [
      "SEO 최적화에 대한 이해도가 낮아 검색 엔진 최적화 요소를 적용하지 못한 점이 아쉬워 개발을 진행하며 해당 부분을 보충할 계획입니다.",
    ],
  },
];
