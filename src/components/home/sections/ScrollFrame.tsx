"use client";

import gsap from "gsap";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { Fragment, useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode, type RefObject } from "react";
import { SHORT_SCROLL } from "@/components/home/hero/HeroCourseScene";

export type FrameSet = {
  id: string;
  eyebrow: string;
  title: string;
  wide: boolean;
  // How many stage heights the set lasts, when it needs longer than usual.
  length?: number;
  // A function places the heading itself, for a set that doesn't start with it.
  body: ReactNode | ((head: ReactNode) => ReactNode);
};

// A set's place in the scroll, in pixels: when it starts, how long it lasts, and how far it overflows the frame.
type Span = { start: number; end: number; overflow: number };

// The first set arrives while the frame scrolls into place, this many stage heights before it locks.
const LEAD_IN = 0.7;
// On phones the same timeline plays over this share of the distance, so each set takes about two swipes.
const TOUCH_PACE = 0.55;
// The step icons rest here, in seconds of their own animation, with everything in place.
const ICON_FINISHED = 2.5;
const BODY_ITEMS = ".lead, .goal, .text-link, .step, .card, .preview-screen, .multi-lang, .fine, .sec-btn, .faq-list, .why-decor";

function FramePanel({ set, panelRef }: { set: FrameSet; panelRef: RefObject<HTMLDivElement | null> }) {
  const head = (
    <div className="sec-head">
      <p className="eyebrow">{set.eyebrow}</p>
      <h2 aria-label={set.title}>
        {set.title.split(" ").map((word, i) => (
          <Fragment key={i}><span className="frame-word-mask" aria-hidden="true"><span className="frame-word">{word}</span></span>{" "}</Fragment>
        ))}
      </h2>
    </div>
  );

  return (
    <div className="frame-panel" ref={panelRef}>
      <div className={`sec-inner${set.wide ? "" : " narrow"}`}>
        {typeof set.body === "function" ? set.body(head) : <>{head}{set.body}</>}
      </div>
    </div>
  );
}

function AnimatedFrame({ sets, className, hold, onLast, children }: {
  sets: FrameSet[];
  className: string;
  hold: number;
  onLast?: (timeline: gsap.core.Timeline, end: number) => void;
  children?: ReactNode;
}) {
  const track = useRef<HTMLDivElement>(null);
  const stageEl = useRef<HTMLDivElement>(null);
  // The list of sets never changes for the life of a frame.
  const [panels] = useState(() => sets.map(() => ({ current: null as HTMLDivElement | null })));
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const [stage, setStage] = useState(800);
  const [pace, setPace] = useState(1);
  const [overflows, setOverflows] = useState(() => sets.map(() => 0));
  const { scrollY } = useScroll();
  // Scrolled pixels for one second of the timeline.
  const beat = stage * pace;

  const spans: Span[] = [];
  let at = 0;
  overflows.forEach((overflow, i) => {
    const length = (i === sets.length - 1 ? beat * hold : beat * (sets[i].length ?? 1.3)) + overflow;
    spans.push({ start: at, end: at + length, overflow });
    at += length;
  });
  const spanKey = JSON.stringify(spans);

  // One timeline runs the whole frame, measured in stage heights. Scrolling moves its playhead.
  const update = useCallback(() => {
    if (!track.current || !stageEl.current || !timeline.current) return;
    const stuckAt = parseFloat(getComputedStyle(stageEl.current).top) || 0;
    const scrolled = stuckAt - track.current.getBoundingClientRect().top;
    timeline.current.time(Math.max(0, scrolled / (stageEl.current.offsetHeight * pace) + LEAD_IN));
  }, [pace]);
  useMotionValueEvent(scrollY, "change", update);

  useEffect(() => {
    const measure = () => {
      if (!stageEl.current) return;
      const height = stageEl.current.offsetHeight;
      setStage(height);
      setPace(window.matchMedia(SHORT_SCROLL).matches ? TOUCH_PACE : 1);
      const next = panels.map((p) => Math.max(0, (p.current?.offsetHeight ?? 0) - height));
      setOverflows((old) => (old.join() === next.join() ? old : next));
    };
    measure();
    // An FAQ answer changes height as it opens, so this waits for it to finish.
    let timer = 0;
    const watcher = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = window.setTimeout(measure, 150);
    });
    if (stageEl.current) watcher.observe(stageEl.current);
    panels.forEach((p) => { if (p.current) watcher.observe(p.current); });
    return () => {
      clearTimeout(timer);
      watcher.disconnect();
    };
  }, [panels]);

  useEffect(() => {
    const laidOut: Span[] = JSON.parse(spanKey);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, defaults: { immediateRender: false } });
      panels.forEach((ref, i) => {
        const panel = ref.current;
        if (!panel) return;
        const first = i === 0;
        const last = i === sets.length - 1;
        const span = laidOut[i];
        const start = first ? 0 : span.start / beat + LEAD_IN;
        const end = span.end / beat + LEAD_IN;
        const bodyAt = first ? 0.2 : start + 0.15;
        const settled = first ? LEAD_IN : start + 0.55;
        const eyebrow = panel.querySelector(".eyebrow");
        const words = panel.querySelectorAll(".frame-word");
        const items = panel.querySelectorAll(BODY_ITEMS);
        const lines = panel.querySelectorAll(".steps-line");
        const icons = panel.querySelectorAll(".step-icon");
        const cards = panel.querySelectorAll(".card");

        gsap.set(panel, { autoAlpha: first ? 1 : 0, y: 0 });
        gsap.set(eyebrow, { autoAlpha: 0, y: 24 });
        gsap.set(words, { yPercent: 115, rotate: 5 });
        gsap.set(items, { autoAlpha: 0, y: 60 });
        if (cards.length) gsap.set(cards, { scale: 0.86, rotate: -3 });
        if (lines.length) gsap.set(lines, { scaleX: 0 });
        if (icons.length) gsap.set(icons, { "--icon-time": 0 });

        if (!first) tl.set(panel, { autoAlpha: 1 }, start);
        tl.to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.2, ease: "power2.out" }, start);
        tl.to(words, { yPercent: 0, rotate: 0, duration: 0.3, ease: "back.out(1.5)", stagger: 0.025 }, start + 0.03);
        tl.to(items, { autoAlpha: 1, y: 0, duration: 0.28, ease: "power3.out", stagger: 0.05 }, bodyAt);
        if (cards.length) tl.to(cards, { scale: 1, rotate: 0, duration: 0.28, ease: "back.out(1.7)", stagger: 0.05 }, bodyAt);
        // Each icon plays in turn, and a line reaches out to the next one once it has finished.
        if (icons.length) {
          const turn = (end - 0.45 - settled) / icons.length;
          icons.forEach((icon, n) => {
            const at = settled + turn * n;
            tl.to(icon, { "--icon-time": ICON_FINISHED, duration: turn * 0.8, ease: "none" }, at);
            if (lines[n]) tl.to(lines[n], { scaleX: 1, duration: turn * 0.2, ease: "none" }, at + turn * 0.8);
          });
        }
        if (span.overflow) tl.to(panel, { y: -span.overflow, duration: span.overflow / beat, ease: "none" }, settled);

        if (!last) {
          const leave = end - 0.3;
          tl.to(items, { autoAlpha: 0, y: -50, duration: 0.2, ease: "power2.in", stagger: 0.02 }, leave);
          if (lines.length) tl.to(lines, { autoAlpha: 0, duration: 0.15 }, leave);
          tl.to(words, { yPercent: -115, duration: 0.2, ease: "power2.in", stagger: 0.012 }, leave + 0.06);
          tl.to(eyebrow, { autoAlpha: 0, y: -20, duration: 0.15 }, leave + 0.1);
          tl.set(panel, { autoAlpha: 0 }, end);
        } else {
          onLast?.(tl, end);
        }
      });
      timeline.current = tl;
    }, stageEl);
    update();
    return () => { timeline.current = null; ctx.revert(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spanKey, beat, update]);

  return (
    <div className="frame-track" ref={track} style={{ height: stage + at }}>
      {sets.map((set, i) => (
        <span key={set.id} className="scene-anchor" id={set.id} style={{ top: i === 0 ? 0 : spans[i].start + beat * 0.62 }} />
      ))}
      <div className={className} ref={stageEl}>
        {sets.map((set, i) => <FramePanel key={set.id} set={set} panelRef={panels[i]} />)}
        {children}
      </div>
    </div>
  );
}

// Without movement the sets simply sit one after the other.
function StaticFrame({ sets, className }: { sets: FrameSet[]; className: string }) {
  return (
    <div className={`${className} is-static`}>
      {sets.map((set) => {
        const head = (
          <div className="sec-head">
            <p className="eyebrow">{set.eyebrow}</p>
            <h2>{set.title}</h2>
          </div>
        );
        return (
          <section key={set.id} id={set.id} className="frame-panel">
            <div className={`sec-inner${set.wide ? "" : " narrow"}`}>
              {typeof set.body === "function" ? set.body(head) : <>{head}{set.body}</>}
            </div>
          </section>
        );
      })}
    </div>
  );
}

// A frame that holds still while scrolling changes the sets inside it. Hold is how many stage heights the last set stays before the frame lets go.
export default function ScrollFrame(props: {
  sets: FrameSet[];
  className: string;
  hold: number;
  onLast?: (timeline: gsap.core.Timeline, end: number) => void;
  children?: ReactNode;
}) {
  const still = useReducedMotion();
  // The server can't know this setting, so the first render in the browser has to match what the server sent.
  const inBrowser = useSyncExternalStore(() => () => {}, () => true, () => false);
  return still && inBrowser ? <StaticFrame sets={props.sets} className={props.className} /> : <AnimatedFrame {...props} />;
}
