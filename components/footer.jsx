"use client";
import { T, usePortfolio } from "./portfolio-provider";
export function Footer() {
  const { t } = usePortfolio();
  return (
    <footer className="site-footer container">
      <a
        className="footer-brand"
        href="#home"
        aria-label={t("home", "Leandro Eguia — Home")}
        data-i18n-aria="home"
      >
        le<span>.</span>
      </a>
      <p>
        © <span data-year="">{new Date().getFullYear()}</span> Leandro Eguia
        <span className="footer-separator">/</span>
        <span data-i18n="footer.made">
          <T id="footer.made">{"Built with intention, in Argentina."}</T>
        </span>
      </p>
      <a className="back-to-top" href="#home">
        <span data-i18n="footer.top">
          <T id="footer.top">{"Back to top"}</T>
        </span>
        <svg className="icon small-icon" aria-hidden="true">
          <use href="/assets/img/icons.svg#arrow-up" />
        </svg>
      </a>
    </footer>
  );
}
