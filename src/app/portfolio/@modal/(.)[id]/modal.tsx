"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import styles from "./modal.module.css";

interface ModalProps {
  children?: React.ReactNode;
}

export function Modal({ children }: ModalProps) {
  const router = useRouter();

  useEffect(() => {
    // 모달이 열릴 때 body 스크롤 막기
    document.body.style.overflow = "hidden";
    return () => {
      // 모달이 닫힐 때 body 스크롤 다시 활성화
      document.body.style.overflow = "auto";
    };
  }, []);

  // ESC 키 눌렀을 때 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.back();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  const onDismiss = () => router.back();

  return createPortal(
    <div className={styles.overlay} onClick={onDismiss}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {children}
        <button className={styles.closeButton} onClick={onDismiss}>
          닫기
        </button>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
}
