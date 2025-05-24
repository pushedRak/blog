"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    const errorType = searchParams.get("type");
    setError(errorType || "unknown");
  }, [searchParams]);

  const getErrorContent = () => {
    switch (error) {
      case "unauthorize":
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
          <button onClick={() => router.push("/")}>홈으로 돌아가기</button>
        </div>
      </div>
    </div>
  );
}
