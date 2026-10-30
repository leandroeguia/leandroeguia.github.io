"use client";
import { useEffect, useState } from "react";
import { usePortfolio } from "./portfolio-provider";

export function Typewriter() {
  const { t, motion } = usePortfolio();
  const text = t("hero.role", "Computer Engineer");
  const [typed, setTyped] = useState(text);
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    if (!motion) return;
    let timer,
      index = 0;
    setTyped("");
    setTyping(true);
    const letters = Array.from(text);
    function tick() {
      if (document.hidden) {
        timer = setTimeout(tick, 200);
        return;
      }
      setTyped(letters.slice(0, ++index).join(""));
      timer = setTimeout(
        index < letters.length ? tick : () => setTyping(false),
        index < letters.length ? 65 : 650,
      );
    }
    timer = setTimeout(tick, 300);
    return () => clearTimeout(timer);
  }, [text, motion]);
  return (
    <p className={`hero-role${typing && motion ? " is-typing" : ""}`}>
      <span className="role-text">{text}</span>
      <span className="typed-role" aria-hidden="true">
        {motion ? typed : text}
      </span>
    </p>
  );
}
