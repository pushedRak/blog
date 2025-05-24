import Link from "next/link";

interface ErrorPageProps {
  searchParams: Promise<{
    type?: string;
  }>;
}

export default async function ErrorPage({ searchParams }: ErrorPageProps) {
  const errorType = (await searchParams).type || "unknown";

  const getErrorContent = () => {
    switch (errorType) {
      case "unauthorized":
        return {
          title: "접근 권한이 없습니다",
          message: "관리자만 접근할 수 있는 페이지입니다.",
          icon: "🚫",
        };
      case "auth_failed":
        return {
          title: "인증에 실패했습니다",
          message: "로그인 과정에서 문제가 발생했습니다.",
          icon: "❌",
        };
      default:
        return {
          title: "알 수 없는 오류가 발생했습니다",
          message: "예상치 못한 오류가 발생했습니다.",
          icon: "⚠️",
        };
    }
  };

  const errorContent = getErrorContent();

  return (
    <div>
      <div>
        <div>{errorContent.icon}</div>
        <h1>{errorContent.title}</h1>
        <p>{errorContent.message}</p>

        <div style={{ marginTop: "1rem" }}>
          <Link href="/">홈으로 돌아가기</Link>
        </div>
      </div>
    </div>
  );
}
