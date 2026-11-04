"use client";

import gsap from "gsap";
import Link from "next/link";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { Fragment, useCallback, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { SHORT_SCROLL } from "./HeroCourseScene";

const STEPS = [
  ["Explore the Course", "See what’s inside and watch the free story preview with your child."],
  ["Enrol for ₹385", "A parent enrols the child. No account or sign-in needed."],
  ["Start Learning", "Watch, play and take a fun quiz, all at your own pace."],
];

const REASONS = [
  ["💰", "Affordable pricing", "The full course is just ₹385, so it fits every family’s budget."],
  ["🎨", "Engaging lessons", "A story, discussion and games that make AI easy to understand."],
  ["🛠️", "Practical activities", "Hands-on tasks using things found at home, school or in the village."],
  ["⏰", "Flexible learning", "Learn at your own pace: in one go or a little each day."],
  ["📈", "Progress tracking", "Parents see each part completed and quiz scores at a glance."],
];

const SETS: { id: string; eyebrow: string; title: string; wide: boolean; body: ReactNode }[] = [
  {
    id: "vision",
    eyebrow: "Our Vision",
    title: "Every Child Should Build With AI, Not Just Use It.",
    wide: false,
    body: (
      <>
        <p className="lead">The next decade will divide children into those who consume what AI produces and those who know how to make it work for them. Which side a child lands on should never depend on the school they attend, the language they speak, or what their family earns. One Sky brings careful, hands-on AI learning to families and schools in villages and cities alike — on the phone you already have, in the language you already speak, with no AI account needed for the child.</p>
        <p className="goal">🎯 Our goal: 1 crore children and 1 lakh teachers by 2030</p>
        <Link className="text-link" href="/about">Read about our vision →</Link>
      </>
    ),
  },
  {
    id: "how",
    eyebrow: "How It Works",
    title: "Start learning in three simple steps",
    wide: true,
    body: (
      <ol className="steps">
        <span className="steps-line" aria-hidden="true" />
        {STEPS.map(([title, text], i) => (
          <li key={title} className="step">
            <span className="step-num" aria-hidden="true">{i + 1}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ol>
    ),
  },
  {
    id: "why",
    eyebrow: "Why One Sky",
    title: "Learning that’s simple, joyful and fair",
    wide: true,
    body: (
      <div className="card-grid five">
        {REASONS.map(([icon, title, text]) => (
          <div key={title} className="card">
            <span className="card-icon" aria-hidden="true">{icon}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
    ),
  },
];

// A set's place in the scroll, in pixels: when it starts, how long it lasts, and how far it overflows the frame.
type Span = { start: number; end: number; overflow: number };

// The first set arrives while the frame scrolls into place, this many stage heights before it locks.
const LEAD_IN = 0.7;
// On phones the same timeline plays over this share of the distance, so each set takes about two swipes.
const TOUCH_PACE = 0.55;
const BODY_ITEMS = ".lead, .goal, .text-link, .step, .card";

function FramePanel({ set, panelRef }: { set: (typeof SETS)[number]; panelRef: RefObject<HTMLDivElement | null> }) {
  return (
    <div className="frame-panel" ref={panelRef}>
      <div className={`sec-inner${set.wide ? "" : " narrow"}`}>
        <div className="sec-head">
          <p className="eyebrow">{set.eyebrow}</p>
          <h2 aria-label={set.title}>
            {set.title.split(" ").map((word, i) => (
              <Fragment key={i}><span className="frame-word-mask" aria-hidden="true"><span className="frame-word">{word}</span></span>{" "}</Fragment>
            ))}
          </h2>
        </div>
        {set.body}
      </div>
    </div>
  );
}

function AnimatedFrame() {
  const track = useRef<HTMLDivElement>(null);
  const stageEl = useRef<HTMLDivElement>(null);
  const panels = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const [stage, setStage] = useState(800);
  const [pace, setPace] = useState(1);
  const [overflows, setOverflows] = useState([0, 0, 0]);
  const { scrollY } = useScroll();
  // Scrolled pixels for one second of the timeline.
  const beat = stage * pace;

  const spans: Span[] = [];
  let at = 0;
  overflows.forEach((overflow, i) => {
    const length = (i === SETS.length - 1 ? beat * 0.8 : beat * 1.3) + overflow;
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
    const watcher = new ResizeObserver(measure);
    if (stageEl.current) watcher.observe(stageEl.current);
    panels.forEach((p) => { if (p.current) watcher.observe(p.current); });
    return () => watcher.disconnect();
    // The refs are stable for the life of the component.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const laidOut: Span[] = JSON.parse(spanKey);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, defaults: { immediateRender: false } });
      panels.forEach((ref, i) => {
        const panel = ref.current;
        if (!panel) return;
        const first = i === 0;
        const last = i === SETS.length - 1;
        const span = laidOut[i];
        const start = first ? 0 : span.start / beat + LEAD_IN;
        const end = span.end / beat + LEAD_IN;
        const bodyAt = first ? 0.2 : start + 0.15;
        const settled = first ? LEAD_IN : start + 0.55;
        const eyebrow = panel.querySelector(".eyebrow");
        const words = panel.querySelectorAll(".frame-word");
        const items = panel.querySelectorAll(BODY_ITEMS);
        const line = panel.querySelector(".steps-line");
        const cards = panel.querySelectorAll(".card");

        gsap.set(panel, { autoAlpha: first ? 1 : 0, y: 0 });
        gsap.set(eyebrow, { autoAlpha: 0, y: 24 });
        gsap.set(words, { yPercent: 115, rotate: 5 });
        gsap.set(items, { autoAlpha: 0, y: 60 });
        if (cards.length) gsap.set(cards, { scale: 0.86, rotate: -3 });
        if (line) gsap.set(line, { scaleX: 0 });

        if (!first) tl.set(panel, { autoAlpha: 1 }, start);
        tl.to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.2, ease: "power2.out" }, start);
        tl.to(words, { yPercent: 0, rotate: 0, duration: 0.3, ease: "back.out(1.5)", stagger: 0.025 }, start + 0.03);
        tl.to(items, { autoAlpha: 1, y: 0, duration: 0.28, ease: "power3.out", stagger: 0.05 }, bodyAt);
        if (cards.length) tl.to(cards, { scale: 1, rotate: 0, duration: 0.28, ease: "back.out(1.7)", stagger: 0.05 }, bodyAt);
        if (line) tl.to(line, { scaleX: 1, duration: 0.3, ease: "power2.inOut" }, bodyAt + 0.05);
        if (span.overflow) tl.to(panel, { y: -span.overflow, duration: span.overflow / beat, ease: "none" }, settled);

        if (!last) {
          const leave = end - 0.3;
          tl.to(items, { autoAlpha: 0, y: -50, duration: 0.2, ease: "power2.in", stagger: 0.02 }, leave);
          if (line) tl.to(line, { autoAlpha: 0, duration: 0.15 }, leave);
          tl.to(words, { yPercent: -115, duration: 0.2, ease: "power2.in", stagger: 0.012 }, leave + 0.06);
          tl.to(eyebrow, { autoAlpha: 0, y: -20, duration: 0.15 }, leave + 0.1);
          tl.set(panel, { autoAlpha: 0 }, end);
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
      {SETS.map((set, i) => (
        <span key={set.id} className="scene-anchor" id={set.id} style={{ top: i === 0 ? 0 : spans[i].start + beat * 0.62 }} />
      ))}
      <div className="sec-sky vision-frame" ref={stageEl}>
        {SETS.map((set, i) => <FramePanel key={set.id} set={set} panelRef={panels[i]} />)}
      </div>
    </div>
  );
}

// Without movement the three sets simply sit one after the other on the blue.
function StaticFrame() {
  return (
    <div className="sec-sky vision-frame is-static">
      {SETS.map((set) => (
        <section key={set.id} id={set.id} className="frame-panel">
          <div className={`sec-inner${set.wide ? "" : " narrow"}`}>
            <div className="sec-head">
              <p className="eyebrow">{set.eyebrow}</p>
              <h2>{set.title}</h2>
            </div>
            {set.body}
          </div>
        </section>
      ))}
    </div>
  );
}

export default function VisionFrame() {
  return useReducedMotion() ? <StaticFrame /> : <AnimatedFrame />;
}
