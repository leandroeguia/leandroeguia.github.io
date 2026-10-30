"use client";
import { T, usePortfolio } from "../portfolio-provider";
import { useState } from "react";
export function Contact() {
  const { t } = usePortfolio();
  const [status, setStatus] = useState("");
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("leandroeguia@gmail.com");
      setStatus(t("contact.copied", "Email copied. Thanks for reaching out!"));
    } catch {
      setStatus(
        t(
          "contact.copyFailed",
          "Select the email address to copy it, or click it to send a message.",
        ),
      );
    }
  }
  return (
    <section
      className="section section-contact container"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="contact-panel" data-reveal="true">
        <p className="section-label">
          <span>04 /</span>
          <span data-i18n="contact.label">
            <T id="contact.label">{"CONTACT"}</T>
          </span>
        </p>
        <div className="contact-heading">
          <h2 id="contact-title">
            <span data-i18n="contact.title1">
              <T id="contact.title1">{"Let's talk"}</T>
            </span>
            <br />
            <span data-i18n="contact.title2">
              <T id="contact.title2">{"about software."}</T>
            </span>
          </h2>
          <svg className="contact-arrow icon" aria-hidden="true">
            <use href="/assets/img/icons.svg#arrow-up-right" />
          </svg>
        </div>
        <p className="contact-description" data-i18n="contact.description">
          <T id="contact.description">
            {
              "Email me or connect with me on LinkedIn to talk about software development, data, or projects."
            }
          </T>
        </p>
        <div className="contact-bottom">
          <div className="email-group">
            <a className="email-link" href="mailto:leandroeguia@gmail.com">
              leandroeguia@gmail.com
            </a>
            <button
              className="copy-email"
              type="button"
              aria-label={t("contact.copy", "Copy email address")}
              data-i18n-aria="contact.copy"
              onClick={copyEmail}
            >
              <svg className="icon" aria-hidden="true">
                <use href="/assets/img/icons.svg#copy" />
              </svg>
            </button>
          </div>
          <div className="contact-socials">
            <a
              href="https://www.linkedin.com/in/leandroeguia/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
              <svg className="icon small-icon" aria-hidden="true">
                <use href="/assets/img/icons.svg#arrow-up-right" />
              </svg>
            </a>
            <a
              href="https://github.com/leandroeguia"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
              <svg className="icon small-icon" aria-hidden="true">
                <use href="/assets/img/icons.svg#arrow-up-right" />
              </svg>
            </a>
          </div>
        </div>
        <p className="copy-status" role="status" aria-live="polite">
          {status}
        </p>
      </div>
    </section>
  );
}
