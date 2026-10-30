"use client";
import { useEffect, useRef } from "react";

export function ExperienceItem({ item, language, motion }) {
  const running = useRef(null);
  const targetOpen = useRef(false);
  useEffect(
    () => () => {
      running.current?.height.cancel();
      running.current?.content.cancel();
    },
    [],
  );

  function toggle(event) {
    const summary = event.currentTarget;
    const details = summary.parentElement;
    if (!motion || !details.animate) return;
    event.preventDefault();
    const content = details.querySelector(".experience-content");
    const opening = !(running.current ? targetOpen.current : details.open);
    const startHeight = details.getBoundingClientRect().height;
    const startOpacity = details.open
      ? Number(getComputedStyle(content).opacity)
      : 0;
    running.current?.height.cancel();
    running.current?.content.cancel();
    targetOpen.current = opening;
    details.style.height = `${startHeight}px`;
    details.style.overflow = "hidden";
    details.open = true;
    details.dataset.expanded = String(opening);
    const styles = getComputedStyle(details);
    const border =
      parseFloat(styles.borderTopWidth) + parseFloat(styles.borderBottomWidth);
    const endHeight =
      summary.getBoundingClientRect().height +
      border +
      (opening ? content.getBoundingClientRect().height : 0);
    const height = details.animate(
      { height: [`${startHeight}px`, `${endHeight}px`] },
      { duration: 320, easing: "cubic-bezier(.22, 1, .36, 1)", fill: "both" },
    );
    const fade = content.animate(
      { opacity: [startOpacity, opening ? 1 : 0] },
      { duration: opening ? 280 : 180, easing: "ease", fill: "both" },
    );
    running.current = { height, content: fade };
    height.onfinish = () => {
      if (running.current?.height !== height) return;
      details.open = opening;
      details.style.removeProperty("height");
      details.style.removeProperty("overflow");
      delete details.dataset.expanded;
      running.current = null;
      height.cancel();
      fade.cancel();
    };
  }

  return (
    <details className="experience-row career-row" data-reveal="true">
      <summary className="experience-summary" onClick={toggle}>
        <div className="experience-name">
          <h3>{item.company}</h3>
          <p>{item.role}</p>
        </div>
        <span className="experience-disclosure" aria-hidden="true">
          <svg className="icon">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </summary>
      <div className="experience-description experience-content">
        <div className="experience-meta">
          <p className="role-dates">{item.dates[language]}</p>
          {item.type && (
            <span className="experience-type">{item.type[language]}</span>
          )}
        </div>
        <p>{item.description[language]}</p>
        <ul className="tags">
          {item.stack.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </div>
    </details>
  );
}
