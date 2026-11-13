"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import styles from "./PlayerTour.module.css";

/*
 * A short guided tour of the player's buttons, shown before the video starts.
 * One control is highlighted at a time with a speech bubble. Next and Back move through the steps,
 * Skip (or Esc) ends it, and either way the video then plays. Ticking "Don't show this again" turns it off on this device.
 */

export type TourStep = { target: string; title: string; text: string };

const HIDDEN_KEY = "onesky-player-tour-off";

export function tourIsTurnedOff() {
  try {
    return localStorage.getItem(HIDDEN_KEY) === "1";
  } catch {
    return false;
  }
}

type Spot = { left: number; top: number; width: number; height: number; boxWidth: number; boxHeight: number };

export default function PlayerTour({ steps, box, onDone }: {
  steps: TourStep[];
  // The player the tour sits on. Targets are looked up inside it.
  box: RefObject<HTMLDivElement | null>;
  onDone: () => void;
}) {
  const [step, setStep] = useState(0);
  const [spot, setSpot] = useState<Spot | null>(null);
  const [dontShow, setDontShow] = useState(false);
  const nextButton = useRef<HTMLButtonElement>(null);
  const last = step === steps.length - 1;

  // Measures the highlighted control, and again whenever the player changes size.
  useEffect(() => {
    const player = box.current;
    if (!player) return;
    const measure = () => {
      const target = player.querySelector(steps[step].target);
      if (!target) return setSpot(null);
      const p = player.getBoundingClientRect();
      const t = target.getBoundingClientRect();
      setSpot({ left: t.left - p.left, top: t.top - p.top, width: t.width, height: t.height, boxWidth: p.width, boxHeight: p.height });
    };
    const watcher = new ResizeObserver(measure);
    watcher.observe(player);
    return () => watcher.disconnect();
  }, [box, step, steps]);

  // Moves keyboard focus to Next once the bubble has appeared, and on every step after.
  const shown = spot !== null;
  useEffect(() => {
    if (shown) nextButton.current?.focus({ preventScroll: true });
  }, [step, shown]);

  function finish() {
    if (dontShow) {
      try {
        localStorage.setItem(HIDDEN_KEY, "1");
      } catch {}
    }
    onDone();
  }

  function next() {
    if (last) finish();
    else setStep(step + 1);
  }

  // Esc skips and the arrow keys move through the steps, wherever focus is on the page.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
      else if (event.key === "ArrowRight") next();
      else if (event.key === "ArrowLeft" && step > 0) setStep(step - 1);
      else return;
      event.preventDefault();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  // The bubble sits above the highlighted control, kept inside the player's width.
  const bubbleWidth = spot ? Math.min(280, spot.boxWidth - 16) : 280;
  const bubbleLeft = spot ? Math.min(Math.max(spot.left + spot.width / 2 - bubbleWidth / 2, 8), spot.boxWidth - bubbleWidth - 8) : 8;
  const arrowLeft = spot ? spot.left + spot.width / 2 - bubbleLeft : bubbleWidth / 2;

  return (
    <div className={styles.tour}>
      <div className={styles.shade}>
        {spot && (
          <span
            className={styles.ring}
            style={{ transform: `translate(${spot.left - 4}px, ${spot.top - 4}px)`, width: spot.width + 8, height: spot.height + 8 }}
          />
        )}
      </div>

      {spot && (
        <div
          className={styles.bubble}
          role="dialog"
          aria-modal="true"
          aria-labelledby="player-tour-title"
          style={{ left: bubbleLeft, bottom: spot.boxHeight - spot.top + 16, width: bubbleWidth, "--arrow": `${arrowLeft}px` } as React.CSSProperties}
        >
          <div className={styles.head}>
            <h3 id="player-tour-title" className={styles.title}>{steps[step].title}</h3>
            <span className={styles.count}>{step + 1}/{steps.length}</span>
            <button type="button" className={styles.close} onClick={finish} aria-label="Skip tour">
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6.4 5 5 6.4 10.6 12 5 17.6 6.4 19l5.6-5.6 5.6 5.6 1.4-1.4-5.6-5.6L19 6.4 17.6 5 12 10.6z" fill="currentColor" /></svg>
            </button>
          </div>
          <p className={styles.text}>{steps[step].text}</p>
          <label className={styles.dontShow}>
            <input type="checkbox" checked={dontShow} onChange={(e) => setDontShow(e.target.checked)} />
            Don’t show this again
          </label>
          <div className={styles.actions}>
            <button type="button" className={styles.skip} onClick={finish}>Skip tour</button>
            <span className={styles.spacer} />
            {step > 0 && (
              <button type="button" className={styles.back} onClick={() => setStep(step - 1)}>Back</button>
            )}
            <button ref={nextButton} type="button" className={styles.next} onClick={next}>
              {last ? "Start video" : "Next"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
