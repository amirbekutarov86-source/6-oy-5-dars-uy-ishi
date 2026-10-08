"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("todo-theme") as "light" | "dark" | null;
    const initial = saved ?? (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  const flip = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("todo-theme", next); } catch { /* ignore */ }
  };

  return (
    <button className="icon-btn" onClick={flip} aria-label="Toggle theme" title="Toggle theme">
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
