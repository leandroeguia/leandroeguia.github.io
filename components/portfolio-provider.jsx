"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { spanish, descriptions } from "../lib/translations";

const Context = createContext(null);
const read = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};
const write = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Optional persistence. */
  }
};

export function PortfolioProvider({ children }) {
  const [language, setLocale] = useState("en");
  const motion = true;
  const [theme, setTheme] = useState("dark");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const saved = read("portfolio-language");
    setLocale(
      ["en", "es"].includes(saved)
        ? saved
        : navigator.language.startsWith("es")
          ? "es"
          : "en",
    );
    setReady(true);
    setTheme(
      document.documentElement.dataset.theme === "light" ? "light" : "dark",
    );
  }, []);
  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = language;
    document.documentElement.dataset.motion = motion ? "on" : "off";
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "light" ? "#d5dace" : "#171b18");
    document.documentElement.classList.add("js");
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", descriptions[language]);
    document
      .querySelector('meta[property="og:locale"]')
      ?.setAttribute("content", language === "es" ? "es_AR" : "en_US");
  }, [language, motion, ready, theme]);
  function setLanguage(value) {
    setLocale(value);
    write("portfolio-language", value);
  }
  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    write("portfolio-theme", next);
  }
  const t = (key, fallback) =>
    language === "es" ? (spanish[key] ?? fallback) : fallback;
  return (
    <Context.Provider
      value={{ language, setLanguage, motion, theme, toggleTheme, ready, t }}
    >
      {children}
    </Context.Provider>
  );
}
export const usePortfolio = () => useContext(Context);
export function T({ id, children }) {
  return usePortfolio().t(id, children);
}
