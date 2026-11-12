"use client";

import { useEffect, useRef } from "react";

export default function HeroCharacters() {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let destroyed = false;
    let destroy = () => {};

    // lottie-web touches the document on import, so it can only load in the browser.
    import("lottie-web").then(({ default: lottie }) => {
      if (destroyed || !box.current) return;
      const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const animation = lottie.loadAnimation({
        container: box.current,
        renderer: "svg",
        loop: !still,
        autoplay: !still,
        path: "/animations/characters-waving.json",
      });
      destroy = () => animation.destroy();
    });

    return () => {
      destroyed = true;
      destroy();
    };
  }, []);

  return (
    <div
      ref={box}
      className="kids"
      role="img"
      aria-label="Four friends, three children and a puppy, waving on the hill with butterflies around them."
    />
  );
}
