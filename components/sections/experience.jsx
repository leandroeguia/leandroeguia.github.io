"use client";
import { T, usePortfolio } from "../portfolio-provider";
import { currentExperience, previousExperience } from "../../lib/experience";

export function Experience() {
  const { language } = usePortfolio();
  const job = currentExperience;
  return (
    <section
      className="section section-work container"
      id="work"
      aria-labelledby="work-title"
    >
      <div className="section-heading" data-reveal="true">
        <div>
          <p className="section-label">
            <span>02 /</span>
            <T id="work.label">PROFESSIONAL EXPERIENCE</T>
          </p>
          <h2 id="work-title">
            <T id="work.title1">My career</T>
            <br />
            <span className="muted">
              <T id="work.title2">in technology.</T>
            </span>
          </h2>
        </div>
        <p className="section-aside">
          <T id="work.intro">
            From IT support to backend engineering, with experience in banking,
            healthcare, data education, and a high-traffic marketplace.
          </T>
        </p>
      </div>

      <article
        className="work-card work-card-ads current-role"
        data-reveal="true"
      >
        <div className="work-card-top">
          <span className="mono">
            <T id="work.current">CURRENT ROLE</T>
          </span>
          <span className="role-dates">{job.dates[language]}</span>
        </div>
        <div className="current-role-heading">
          <p className="work-company">{job.company}</p>
          <h3>{job.role}</h3>
          <p className="current-role-meta">
            <T id="work.currentMeta">Full time · Argentina</T>
          </p>
        </div>
        <div className="responsibilities">
          {job.responsibilities.map((item) => (
            <div key={item.title.en}>
              <h4>{item.title[language]}</h4>
              <p>{item.text[language]}</p>
            </div>
          ))}
        </div>
        <ul className="tags current-role-stack">
          {job.stack.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </article>

      <div className="experience-list">
        {previousExperience.map((item, index) => (
          <article
            className="experience-row career-row"
            data-reveal="true"
            key={item.company}
          >
            <span className="experience-number mono">
              {String(index + 2).padStart(2, "0")}
            </span>
            <div className="experience-name">
              <h3>{item.company}</h3>
              <p>{item.role}</p>
              <p className="role-dates">{item.dates[language]}</p>
            </div>
            <div className="experience-description">
              <p>{item.description[language]}</p>
              <ul className="tags">
                {item.stack.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </div>
            {item.type && (
              <span className="experience-type">{item.type[language]}</span>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
