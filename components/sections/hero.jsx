"use client";
import { T, usePortfolio } from "../portfolio-provider";
import { Typewriter } from "../typewriter";
export function Hero() {
  const { t } = usePortfolio();
  return (
    <section className="hero container" id="home" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow hero-eyebrow">
          <span className="status-dot" aria-hidden="true"></span>
          <span data-i18n="hero.eyebrow">
            <T id="hero.eyebrow">{"La Plata, Buenos Aires · Argentina"}</T>
          </span>
        </p>
        <h1 id="hero-title">
          <span>Leandro</span>
          <span>
            Eguia
            <span className="accent" aria-hidden="true">
              .
            </span>
          </span>
        </h1>
        <Typewriter />
        <p className="hero-description" data-i18n="hero.description">
          <T id="hero.description">
            {
              "I'm a semi-senior software engineer specializing in backend development. I work with Java, Python, and event-driven systems, with a product-wide perspective and a focus on data."
            }
          </T>
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#work">
            <span data-i18n="hero.cta">
              <T id="hero.cta">{"Explore my work"}</T>
            </span>
            <svg className="icon" aria-hidden="true">
              <use href="/assets/img/icons.svg#arrow-down-right" />
            </svg>
          </a>
          <a
            className="text-link"
            href="https://github.com/leandroeguia"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="icon" aria-hidden="true">
              <use href="/assets/img/icons.svg#github" />
            </svg>
            <span>GitHub</span>
            <svg className="icon small-icon" aria-hidden="true">
              <use href="/assets/img/icons.svg#arrow-up-right" />
            </svg>
          </a>
        </div>
      </div>
      <div className="hero-visual">
        <div className="portrait-orbit" aria-hidden="true">
          <span className="orbit-cross cross-top">+</span>
          <span className="orbit-cross cross-bottom">+</span>
          <span className="orbit-dot"></span>
        </div>
        <div className="portrait-wrap">
          <img
            className="portrait"
            src="/assets/img/portrait.webp"
            width="640"
            height="640"
            alt={t("portrait", "Leandro Eguia by the sea")}
            data-i18n-alt="portrait"
            fetchPriority="high"
          />
        </div>
        <span className="visual-tag tag-location">
          <svg className="icon" aria-hidden="true">
            <use href="/assets/img/icons.svg#pin" />
          </svg>
          La Plata, Argentina
        </span>
        <div className="portrait-caption">
          <span className="caption-line" aria-hidden="true"></span>
          <p>
            <span data-i18n="hero.caption">
              <T id="hero.caption">{"Computer Engineer · UNLP"}</T>
            </span>
            <span className="caption-sub" data-i18n="hero.captionSub">
              <T id="hero.captionSub">{"Backend · Architecture · Data"}</T>
            </span>
          </p>
        </div>
      </div>
      <div className="hero-footer">
        <span className="mono" data-i18n="hero.focus">
          <T id="hero.focus">{"TECHNOLOGIES I WORK WITH"}</T>
        </span>
        <ul
          className="hero-stack"
          aria-label={t("technologies", "Core technologies")}
          data-i18n-aria="technologies"
        >
          <li>Java</li>
          <li>Python</li>
          <li>Microservices</li>
          <li>MySQL</li>
          <li>EDA</li>
        </ul>
        <a className="scroll-link mono" href="#about">
          <span data-i18n="hero.scroll">
            <T id="hero.scroll">{"A LITTLE MORE ABOUT ME"}</T>
          </span>
          <svg className="icon" aria-hidden="true">
            <use href="/assets/img/icons.svg#arrow-down" />
          </svg>
        </a>
      </div>
    </section>
  );
}
