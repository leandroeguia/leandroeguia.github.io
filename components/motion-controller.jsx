"use client";
import { useEffect } from "react";
import { usePortfolio } from "./portfolio-provider";
import { initializeScroll } from "./runtime/scroll";

export function MotionController() {
  const { motion, ready } = usePortfolio();
  useEffect(() => {
    if (!ready) return;
    const nodes = [
      ...document.querySelectorAll(
        "[data-reveal], .hero-copy, .hero-visual, .hero-footer",
      ),
    ];
    const frames = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.dataset.entry = "done";
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    nodes.forEach((node) => {
      if (motion) {
        node.dataset.entry = "pending";
        if (node.matches(".work-card, .experience-row, .expertise-item"))
          node.style.setProperty(
            "--entry-delay",
            `${Math.min([...node.parentElement.children].indexOf(node) * 70, 210)}ms`,
          );
        observer.observe(node);
      } else node.dataset.entry = "done";
    });
    function onArrive(target) {
      if (!motion) return;
      const visible = nodes.filter(
        (node) =>
          target.contains(node) &&
          node.getBoundingClientRect().bottom > 110 &&
          node.getBoundingClientRect().top < innerHeight * 0.94,
      );
      visible.forEach((node) => {
        node.dataset.entry = "pending";
        observer.unobserve(node);
      });
      const id = requestAnimationFrame(() => {
        frames.delete(id);
        visible.forEach((node) => {
          node.dataset.entry = "done";
        });
      });
      frames.add(id);
    }
    const cleanupScroll = initializeScroll({
      reducedMotion: !motion,
      onArrive,
    });
    const focus = (event) => {
      const pending = event.target.closest('[data-entry="pending"]');
      if (pending) {
        pending.dataset.entry = "done";
        observer.unobserve(pending);
      }
    };
    document.addEventListener("focusin", focus);
    const legacy = {
      "#header": "#home",
      "#portfolio": "#work",
      "#services": "#expertise",
    };
    function resolveHash() {
      if (legacy[location.hash]) {
        history.replaceState(null, "", legacy[location.hash]);
        document
          .querySelector(location.hash)
          ?.scrollIntoView({ behavior: "instant" });
      }
    }
    resolveHash();
    window.addEventListener("hashchange", resolveHash);
    return () => {
      observer.disconnect();
      cleanupScroll();
      frames.forEach(cancelAnimationFrame);
      document.removeEventListener("focusin", focus);
      window.removeEventListener("hashchange", resolveHash);
      nodes.forEach((node) => {
        if (node.dataset.entry === "pending") node.dataset.entry = "done";
      });
    };
  }, [motion, ready]);
  return null;
}
