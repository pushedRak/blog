import type { Metadata } from "next";
import "@shared/styles/index.css";

export const metadata: Metadata = {
  title: "락 블로그",
  description: "개발자 손민락의 블로그입니다.",
  icons: "/favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head></head>
      <body>
        {children}
        <div id="modal-root" />
      </body>
    </html>
  );
}
