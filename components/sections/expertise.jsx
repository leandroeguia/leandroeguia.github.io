"use client";
import { T } from "../portfolio-provider";
export function Expertise() {
  return (
    <section
      className="section section-expertise"
      id="expertise"
      aria-labelledby="expertise-title"
    >
      <div className="container">
        <div className="section-heading" data-reveal="true">
          <div>
            <p className="section-label">
              <span>03 /</span>
              <span data-i18n="expertise.label">
                <T id="expertise.label">{"AREAS OF WORK"}</T>
              </span>
            </p>
            <h2 id="expertise-title">
              <span data-i18n="expertise.title1">
                <T id="expertise.title1">{"Backend, events,"}</T>
              </span>
              <br />
              <span className="muted" data-i18n="expertise.title2">
                <T id="expertise.title2">{"and product data."}</T>
              </span>
            </h2>
          </div>
          <p className="section-aside" data-i18n="expertise.intro">
            <T id="expertise.intro">
              {
                "My work combines service development, how those services run in production, and the data that helps understand and improve the product."
              }
            </T>
          </p>
        </div>
        <div className="expertise-grid">
          <article className="expertise-item" data-reveal="true">
            <span className="expertise-icon-wrap">
              <svg className="expertise-icon icon" aria-hidden="true">
                <use href="/assets/img/icons.svg#code" />
              </svg>
            </span>
            <h3 data-i18n="expertise.backend.title">
              <T id="expertise.backend.title">{"Backend development"}</T>
            </h3>
            <p data-i18n="expertise.backend.description">
              <T id="expertise.backend.description">
                {
                  "Microservice development with Java and Python. At Mercado Libre I work with Spark and Javalin, applying TDD and XP practices."
                }
              </T>
            </p>
            <ul className="tags">
              <li>Java</li>
              <li>Spark</li>
              <li>Javalin</li>
              <li>REST APIs</li>
              <li>Python</li>
            </ul>
          </article>
          <article className="expertise-item" data-reveal="true">
            <span className="expertise-icon-wrap">
              <svg className="expertise-icon icon" aria-hidden="true">
                <use href="/assets/img/icons.svg#layers" />
              </svg>
            </span>
            <h3 data-i18n="expertise.architecture.title">
              <T id="expertise.architecture.title">{"Architecture & events"}</T>
            </h3>
            <p data-i18n="expertise.architecture.description">
              <T id="expertise.architecture.description">
                {
                  "Design and maintenance of microservices and event-driven systems, with a focus on scalability and a product-wide perspective."
                }
              </T>
            </p>
            <ul className="tags">
              <li>Microservices</li>
              <li>EDA</li>
              <li>TDD</li>
              <li>XP</li>
            </ul>
          </article>
          <article className="expertise-item" data-reveal="true">
            <span className="expertise-icon-wrap">
              <svg className="expertise-icon icon" aria-hidden="true">
                <use href="/assets/img/icons.svg#database" />
              </svg>
            </span>
            <h3 data-i18n="expertise.data.title">
              <T id="expertise.data.title">{"Data & observability"}</T>
            </h3>
            <p data-i18n="expertise.data.description">
              <T id="expertise.data.description">
                {
                  "ETL pipelines with Python and JupyterLab, SQL and GraphQL analysis, and application monitoring with Datadog, New Relic, and Kibana."
                }
              </T>
            </p>
            <ul className="tags">
              <li>SQL</li>
              <li>MySQL</li>
              <li data-i18n="tag.data">
                <T id="tag.data">{"Data engineering"}</T>
              </li>
              <li data-i18n="tag.monitoring">
                <T id="tag.monitoring">{"Monitoring"}</T>
              </li>
            </ul>
          </article>
        </div>
        <div className="education-block" id="resume" data-reveal="true">
          <div>
            <p className="section-label">
              <span>+</span>
              <span data-i18n="education.label">
                <T id="education.label">{"EDUCATION"}</T>
              </span>
            </p>
            <h3 data-i18n="education.title">
              <T id="education.title">{"University & further training."}</T>
            </h3>
          </div>
          <div className="education-content">
            <div className="degree-row">
              <svg className="icon" aria-hidden="true">
                <use href="/assets/img/icons.svg#graduation" />
              </svg>
              <div>
                <h4 data-i18n="education.degree">
                  <T id="education.degree">{"Computer Engineering"}</T>
                </h4>
                <p>Universidad Nacional de La Plata</p>
              </div>
              <span className="mono">2012 — 2020</span>
            </div>
            <details className="training-details">
              <summary>
                <span data-i18n="education.training">
                  <T id="education.training">{"Further training"}</T>
                </span>
                <svg className="icon" aria-hidden="true">
                  <use href="/assets/img/icons.svg#plus" />
                </svg>
              </summary>
              <ul>
                <li>
                  <span data-i18n="education.course1">
                    <T id="education.course1">
                      {"Microservices with Spring Boot & Spring Cloud"}
                    </T>
                  </span>
                  <span>Udemy · 2021</span>
                </li>
                <li>
                  <span data-i18n="education.course2">
                    <T id="education.course2">
                      {"Microservices Architecture in Java"}
                    </T>
                  </span>
                  <span>Platzi · 2021</span>
                </li>
                <li>
                  <span data-i18n="education.course3">
                    <T id="education.course3">{"Java Design Patterns"}</T>
                  </span>
                  <span>Udemy · 2021</span>
                </li>
                <li>
                  <span data-i18n="education.course4">
                    <T id="education.course4">{"Scrum training"}</T>
                  </span>
                  <span>Udemy · 2022</span>
                </li>
              </ul>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}
