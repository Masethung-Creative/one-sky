"use client";

import { useEffect } from "react";

// The scroll scenes set their heights just after loading, which moves every section below them.
// So on arriving with a link like /#faq, this keeps the section in place until the page has settled, or the visitor takes over.
export default function HashLanding() {
  useEffect(() => {
    const target = document.getElementById(location.hash.slice(1));
    if (!target) return;

    let quiet = 0;
    const land = () => {
      target.scrollIntoView({ behavior: "instant", block: "start" });
      clearTimeout(quiet);
      quiet = window.setTimeout(stop, 600);
    };
    const watcher = new ResizeObserver(land);
    const limit = window.setTimeout(() => stop(), 4000);
    const inputs = ["wheel", "touchstart", "keydown", "pointerdown"];
    function stop() {
      watcher.disconnect();
      clearTimeout(quiet);
      clearTimeout(limit);
      inputs.forEach((name) => window.removeEventListener(name, stop));
    }
    inputs.forEach((name) => window.addEventListener(name, stop, { passive: true }));
    watcher.observe(document.body);
    return stop;
  }, []);

  return null;
}
