"use client";

import { useTheme } from "@hooks/useTheme";

export default function DarkModeBtn() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return <button>🌙</button>;
  }

  return (
    <button onClick={toggleTheme}>{theme === "dark" ? "🌙" : "☀️"}</button>
  );
}
