"use client";
import { useEffect, useRef, useState } from "react";
import { T, usePortfolio } from "./portfolio-provider";

const links = [
  ["about", "nav.about", "About"],
  ["work", "nav.work", "Experience"],
  ["expertise", "nav.expertise", "Expertise"],
  ["contact", "nav.contact", "Let's talk"],
];
export function Header() {
  const { t, language, setLanguage, theme, toggleTheme } = usePortfolio();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);
  const toggle = useRef(null);
  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const outside = (e) => {
      if (!e.target.closest(".site-header")) setOpen(false);
    };
    const resize = () => setOpen(false);
    const media = matchMedia("(min-width:801px)");
    document.addEventListener("keydown", close);
    document.addEventListener("click", outside);
    media.addEventListener("change", resize);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("click", outside);
      media.removeEventListener("change", resize);
    };
  }, [open]);
  useEffect(() => {
    const visible = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) =>
          e.isIntersecting
            ? visible.add(e.target.id)
            : visible.delete(e.target.id),
        );
        setCurrent(links.find(([id]) => visible.has(id))?.[0] ?? null);
      },
      { rootMargin: "-15% 0px -30% 0px" },
    );
    links.forEach(([id]) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <header
      className="site-header"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <div className="container header-inner">
        <a
          className="brand"
          href="#home"
          aria-label={t("home", "Leandro Eguia — Home")}
        >
          <span className="brand-mark" aria-hidden="true">
            le<span>.</span>
          </span>
          <span className="brand-name">
            leandro eguia<span className="brand-role">software engineer</span>
          </span>
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="navigation"
          aria-label={t(
            open ? "menu.close" : "menu.open",
            open ? "Close navigation" : "Open navigation",
          )}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
        <nav
          id="navigation"
          className={`main-nav${open ? " is-open" : ""}`}
          aria-label={t("navigation", "Main navigation")}
        >
          {links.map(([id, key, label]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              aria-current={current === id ? "location" : undefined}
              className={id === "contact" ? "nav-contact" : undefined}
            >
              <T id={key}>{label}</T>
              {id === "contact" && (
                <svg className="icon" aria-hidden="true">
                  <use href="/assets/img/icons.svg#arrow-up-right" />
                </svg>
              )}
            </a>
          ))}
        </nav>
        <div className="header-tools">
          <div
            className="language-switch"
            role="group"
            aria-label={t("language", "Language")}
          >
            <button
              data-language="es"
              lang="es"
              aria-label="Español"
              aria-pressed={language === "es"}
              onClick={() => setLanguage("es")}
            >
              ES
            </button>
            <span aria-hidden="true">/</span>
            <button
              data-language="en"
              lang="en"
              aria-label="English"
              aria-pressed={language === "en"}
              onClick={() => setLanguage("en")}
            >
              EN
            </button>
          </div>
          <button
            className="theme-toggle"
            type="button"
            title={
              language === "es"
                ? theme === "dark"
                  ? "Activar modo claro"
                  : "Activar modo oscuro"
                : theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
            }
            aria-label={
              language === "es"
                ? theme === "dark"
                  ? "Activar modo claro"
                  : "Activar modo oscuro"
                : theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
            }
            onClick={toggleTheme}
          >
            <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
              {theme === "dark" ? (
                <>
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </>
              ) : (
                <path d="M20.9 13a9 9 0 0 1-9.9-9.9A9 9 0 1 0 20.9 13Z" />
              )}
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
