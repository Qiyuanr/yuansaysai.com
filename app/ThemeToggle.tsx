"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "yuansaysai-theme";
const THEME_EVENT = "yuansaysai-theme-change";

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function subscribeToThemeChange(onStoreChange: () => void) {
  window.addEventListener(THEME_EVENT, onStoreChange);
  return () => window.removeEventListener(THEME_EVENT, onStoreChange);
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;

  const themeColor = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"]',
  );
  themeColor?.setAttribute(
    "content",
    theme === "light" ? "#f4f8fb" : "#0c0d0d",
  );
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeToThemeChange,
    readTheme,
    () => "dark",
  );

  const nextTheme: Theme = theme === "light" ? "dark" : "light";
  const currentLabel = theme === "light" ? "日间" : "夜间";
  const accentLabel = theme === "light" ? "电光蓝" : "电光洋红";
  const nextLabel = nextTheme === "light" ? "日间" : "夜间";

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={`切换到${nextLabel}模式`}
      title={`切换到${nextLabel}模式`}
      data-theme={theme}
      onClick={() => {
        window.localStorage.setItem(STORAGE_KEY, nextTheme);
        applyTheme(nextTheme);
      }}
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        {theme === "light" ? "☀" : "☾"}
      </span>
      <span className="theme-toggle-copy">
        <strong>{currentLabel}</strong>
        <small>{accentLabel}</small>
      </span>
    </button>
  );
}
