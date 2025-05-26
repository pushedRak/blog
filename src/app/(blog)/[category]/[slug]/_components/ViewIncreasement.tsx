"use client";
import { useEffect } from "react";

interface ViewIncrementProps {
  postId: string;
}

export default function ViewIncrement({ postId }: ViewIncrementProps) {
  useEffect(() => {
    if (!postId || postId === "undefined") return;

    const incrementView = async () => {
      try {
        const response = await fetch(`/api/posts/views/${postId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.error("조회수 증가 실패");
        }
      } catch (error) {
        console.error("조회수 증가 오류:", error);
      }
    };

    // 1초 후 조회수 증가
    const timer = setTimeout(incrementView, 1000);

    return () => clearTimeout(timer);
  }, [postId]);

  return null;
}
