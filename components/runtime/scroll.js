export function initializeScroll({ reducedMotion, onArrive }) {
  let frame;
  const cancel = () => cancelAnimationFrame(frame);
  const interrupts = ["wheel", "touchstart", "pointerdown", "keydown"];
  interrupts.forEach((name) =>
    window.addEventListener(name, cancel, { passive: true }),
  );
  function click(event) {
    const link = event.target.closest('a[href^="#"]');
    if (
      !link ||
      link.classList.contains("skip-link") ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    const target = document.getElementById(link.hash.slice(1));
    if (!target) return;
    event.preventDefault();
    cancel();
    const start = scrollY;
    const padding =
      parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) ||
      0;
    const end = Math.max(
      0,
      Math.min(
        start + target.getBoundingClientRect().top - padding,
        document.documentElement.scrollHeight - innerHeight,
      ),
    );
    const distance = end - start;
    if (location.hash !== link.hash) history.pushState(null, "", link.hash);
    function finish() {
      onArrive(target);
      if (event.detail !== 0) return;
      if (!target.hasAttribute("tabindex")) {
        target.setAttribute("tabindex", "-1");
        target.addEventListener(
          "blur",
          () => target.removeAttribute("tabindex"),
          { once: true },
        );
      }
      target.focus({ preventScroll: true });
    }
    if (reducedMotion || Math.abs(distance) < 2) {
      window.scrollTo({ top: end, behavior: "instant" });
      finish();
      return;
    }
    const duration = Math.min(1100, 750 + Math.abs(distance) * 0.08);
    let began;
    function step(now) {
      began ??= now;
      const p = Math.min(1, (now - began) / duration);
      const ease = p < 0.5 ? 4 * p ** 3 : 1 - (-2 * p + 2) ** 3 / 2;
      window.scrollTo({ top: start + distance * ease, behavior: "instant" });
      if (p < 1) frame = requestAnimationFrame(step);
      else finish();
    }
    frame = requestAnimationFrame(step);
  }
  document.addEventListener("click", click);
  return () => {
    cancel();
    document.removeEventListener("click", click);
    interrupts.forEach((name) => window.removeEventListener(name, cancel));
  };
}
