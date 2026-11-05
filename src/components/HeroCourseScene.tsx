"use client";

import gsap from "gsap";
import Link from "next/link";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import AiToolsShow from "./AiToolsShow";

export const COURSE_URL = "/courses/ai-foundation";

const COURSE_FACTS = [
  ["⏱", "Self-paced: learn in one go or a little each day"],
  ["🎬", "Story: “Ajji, This Is for You” (8 short chapters)"],
  ["🔍", "Discussion and 30 minutes of story-detective activities"],
  ["📝", "Quiz, your own story project and reflection"],
  ["👨‍👩‍👧", "For Class 3–5, 6–10, 11 & 12, with a parent"],
];

const OUTCOMES = [
  "Explain why AI cannot automatically know someone’s personal memories",
  "Listen to a storyteller and note confirmed details",
  "Write a clear prompt using only confirmed details",
  "Check AI-generated details and correct invented ones",
  "Ask permission before recording or sharing someone’s story",
];

// The scene lasts this many stage heights of scrolling, plus however much the course overflows the stage.
const STAGE_SCREENS = 5;
// A phone swipe moves about a third of the screen, far less than a laptop scroll. Over 2 screens each moment of the story takes about one swipe.
const TOUCH_SCREENS = 2;
export const SHORT_SCROLL = "(max-width: 1100px), (pointer: coarse)";
// The dog's frame keeps this natural size and is scaled as a whole, because its artwork does not grow with the frame.
const DOG_W = 360;
const DOG_RATIO = 420 / 360;
// Where each cloud ends up on the stage (left %, top %) and which way it arrives from.
const CLOUDS = [
  [15, 12, -1, -1], [85, 12, 1, -1], [15, 88, -1, 1], [85, 88, 1, 1], [50, 2, 0, -1], [50, 98, 0, 1], [0, 50, -1, 0], [100, 50, 1, 0], [32, 34, -1, -1], [68, 34, 1, -1], [32, 68, -1, 1], [68, 68, 1, 1],
];
const TITLE = "AI Foundation";
const WIDE_LAYOUT = "(min-width: 1241px)";

type Layout = { stage: number; screens: number; overflow: number; bigScale: number; bigX: number; bigY: number; dockX: number; dockY: number; dockScale: number; pinDog: boolean };

const START: Layout = { stage: 800, screens: STAGE_SCREENS, overflow: 0, bigScale: 1, bigX: 0, bigY: 0, dockX: 0, dockY: 0, dockScale: 1, pinDog: true };

function mix(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

// How far v has moved through the range from a to b, from 0 to 1.
function within(v: number, a: number, b: number) {
  return Math.min(1, Math.max(0, (v - a) / (b - a)));
}

function CourseContent({ dogSlot, slide, fade }: { dogSlot: ReactNode; slide: MotionValue<string>; fade: MotionValue<number> }) {
  return (
    <div className="course-grid with-dog">
      {dogSlot}
      <motion.div className="course-card" style={{ x: slide, opacity: fade }}>
        <p className="course-intro">A story-led, parent-guided first step into using AI with care. Follow Nila and Kavin as they find Ajji’s unfinished memory, listen to her, write clearer prompts, check what AI invents and share her story respectfully.</p>
        <p className="price">₹385</p>
        <ul className="facts">
          {COURSE_FACTS.map(([icon, text]) => (
            <li key={text}><span aria-hidden="true">{icon}</span>{text}</li>
          ))}
        </ul>
        <Link className="sec-btn" href={COURSE_URL}>Enrol Now — ₹385</Link>
        <p className="fine">One-time payment. No sign-in needed.</p>
      </motion.div>
      <motion.div style={{ x: slide, opacity: fade }}>
        <h3 className="sub-title">What your child will learn</h3>
        <ul className="outcomes">
          {OUTCOMES.map((text) => <li key={text}>{text}</li>)}
        </ul>
        <h3 className="sub-title">A world of AI tools to explore</h3>
        <AiToolsShow />
        <Link className="text-link" href={COURSE_URL}>View full course details →</Link>
      </motion.div>
    </div>
  );
}

function MadeFor() {
  return (
    <>
      <span>Made for</span>
      {["Class 3–5", "Class 6–10", "Class 11", "Class 12"].map((c) => <b key={c}>{c}</b>)}
    </>
  );
}

const DOG_TITLE = "Coco the puppy winning the AI Foundation badge";

function AnimatedScene({ hero }: { hero: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const heroLayer = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLElement>(null);
  const head = useRef<HTMLDivElement>(null);
  const slot = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState(START);
  const [dogOn, setDogOn] = useState(false);
  const titleIn = useRef<gsap.core.Timeline | null>(null);

  // The title rises out of a mask, letter by letter, once the course has arrived. Scrolling drives its progress.
  useEffect(() => {
    const ctx = gsap.context(() => {
      titleIn.current = gsap.timeline({ paused: true })
        .fromTo(".scene-eyebrow", { yPercent: 120, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" })
        .fromTo(".scene-title-char", { yPercent: 115, rotate: 6 }, { yPercent: 0, rotate: 0, duration: 0.7, ease: "back.out(1.6)", stagger: 0.035 }, 0.1);
    }, head);
    return () => ctx.revert();
  }, []);


  useEffect(() => {
    const measure = () => {
      if (!stage.current || !panel.current || !slot.current) return;
      const stageBox = stage.current.getBoundingClientRect();
      const panelBox = panel.current.getBoundingClientRect();
      const slotBox = slot.current.getBoundingClientRect();
      const roomH = Math.max(180, stageBox.height - 32);
      const bigW = Math.min(roomH / DOG_RATIO, stageBox.width * 0.86);
      const bigH = bigW * DOG_RATIO;
      const next: Layout = {
        stage: stageBox.height,
        screens: window.matchMedia(SHORT_SCROLL).matches ? TOUCH_SCREENS : STAGE_SCREENS,
        overflow: Math.max(0, panel.current.offsetHeight - stageBox.height),
        bigScale: bigW / DOG_W,
        bigX: (stageBox.width - bigW) / 2,
        bigY: (stageBox.height - bigH) / 2,
        dockX: slotBox.left - panelBox.left,
        dockY: slotBox.top - panelBox.top,
        dockScale: slotBox.width / DOG_W,
        pinDog: window.matchMedia(WIDE_LAYOUT).matches,
      };
      setLayout((old) => (JSON.stringify(old) === JSON.stringify(next) ? old : next));
    };
    measure();
    const watcher = new ResizeObserver(measure);
    [stage, panel, slot].forEach((el) => { if (el.current) watcher.observe(el.current); });
    return () => watcher.disconnect();
  }, []);

  const base = layout.stage * layout.screens;
  const { scrollYProgress } = useScroll({ target: track, offset: ["start 69px", "end end"] });
  // Scrolled pixels inside the scene.
  const px = useTransform(scrollYProgress, (p) => p * (base + layout.overflow));
  const phase = useTransform(px, (v) => Math.min(1, v / base));

  const white = useTransform(phase, [0.44, 0.48], [0, 1]);
  const dogIn = useTransform(phase, [0.47, 0.55], [0, 1]);
  const dock = useTransform(phase, [0.62, 0.84], [0, 1], { ease: (t) => t * t * (3 - 2 * t) });
  const slide = useTransform(dock, (t) => `${(1 - t) * 110}vw`);
  const fade = useTransform(dock, [0, 0.5], [0, 1]);
  const panelY = useTransform(px, (v) => -Math.min(layout.overflow, Math.max(0, v - base)));
  const dogX = useTransform(dock, (t) => mix(layout.bigX, layout.dockX, t));
  const dogY = useTransform([dock, panelY], ([t, y]: number[]) => mix(layout.bigY, layout.dockY, t) + (layout.pinDog ? 0 : y));
  const dogScale = useTransform(dock, (t) => mix(layout.bigScale, layout.dockScale, t));

  // Keeps what is hidden out of reach of the keyboard. The dog's game starts from the top once the clouds have covered the screen, and again each time they return.
  useMotionValueEvent(phase, "change", (v) => {
    if (v >= 0.47) setDogOn(true);
    else if (v < 0.44) setDogOn(false);
    titleIn.current?.progress(within(v, 0.84, 0.95));
    if (stage.current) {
      const vars = stage.current.style;
      vars.setProperty("--sunset", String(within(v, 0.03, 0.2)));
      vars.setProperty("--night", String(within(v, 0.03, 0.2)));
      vars.setProperty("--moon", String(within(v, 0.14, 0.26)));
      vars.setProperty("--cloud", String(within(v, 0.27, 0.44)));
    }
    if (heroLayer.current) {
      heroLayer.current.inert = v >= 0.47;
      heroLayer.current.style.visibility = v >= 0.47 ? "hidden" : "visible";
    }
    if (panel.current) panel.current.inert = v < 0.76;
  });

  return (
    <div className="scene-track" ref={track} style={{ height: base + layout.stage + layout.overflow }}>
      <link rel="prefetch" href="/coco-reward.html" />
      <span className="scene-anchor" id="course" style={{ top: base * 0.96 }} />
      <div className="scene-stage" ref={stage}>
        <div className="scene-hero" ref={heroLayer}>{hero}</div>
        <div className="scene-clouds" aria-hidden="true">
          {CLOUDS.map(([left, top, dx, dy], i) => (
            <svg key={i} className="sky-cloud" viewBox="0 0 200 110" style={{ left: `${left}%`, top: `${top}%`, "--dx": dx, "--dy": dy } as CSSProperties}>
              <g className="sky-cloud-shade"><circle cx="48" cy="66" r="36" /><circle cx="100" cy="52" r="46" /><circle cx="152" cy="66" r="36" /><rect x="40" y="60" width="120" height="44" rx="22" /></g>
              <g className="sky-cloud-puff"><circle cx="48" cy="58" r="36" /><circle cx="100" cy="46" r="46" /><circle cx="152" cy="58" r="36" /><rect x="40" y="54" width="120" height="44" rx="22" /></g>
            </svg>
          ))}
        </div>
        <motion.div className="scene-white" style={{ opacity: white }} />
        <motion.section className="sec scene-panel" ref={panel} style={{ y: panelY, opacity: white }} aria-labelledby="course-title" inert>
          <div className="sec-inner course-inner">
            <div className="sec-head" ref={head}>
              <p className="eyebrow scene-mask"><span className="scene-eyebrow">The Course</span></p>
              <h2 id="course-title" className="scene-mask" aria-label={TITLE}>
                {TITLE.split("").map((c, i) => <span key={i} className="scene-title-char" aria-hidden="true">{c === " " ? "\u00A0" : c}</span>)}
              </h2>
            </div>
            <CourseContent dogSlot={<div className="course-dog scene-dog-slot" ref={slot} />} slide={slide} fade={fade} />
            <motion.div className="made-for" style={{ x: slide, opacity: fade }}><MadeFor /></motion.div>
          </div>
        </motion.section>
        <motion.div className="scene-dog" style={{ width: DOG_W, height: DOG_W * DOG_RATIO, x: dogX, y: dogY, scale: dogScale, opacity: dogIn }}>
          {dogOn && <iframe src="/coco-reward.html" title={DOG_TITLE} />}
        </motion.div>
      </div>
    </div>
  );
}

// Without movement the hero and course simply sit one after the other.
function StaticScene({ hero }: { hero: ReactNode }) {
  const still = useTransform(useScroll().scrollY, () => "0vw");
  const shown = useTransform(useScroll().scrollY, () => 1);
  return (
    <>
      {hero}
      <section className="sec" id="course">
        <div className="sec-inner course-inner">
          <div className="sec-head">
            <p className="eyebrow">The Course</p>
            <h2>AI Foundation</h2>
          </div>
          <CourseContent dogSlot={<div className="course-dog"><iframe src="/coco-reward.html" title={DOG_TITLE} loading="lazy" /></div>} slide={still} fade={shown} />
          <div className="made-for"><MadeFor /></div>
        </div>
      </section>
    </>
  );
}

export default function HeroCourseScene({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  // The server can't know this setting, so the first render in the browser has to match what the server sent.
  const inBrowser = useSyncExternalStore(() => () => {}, () => true, () => false);
  return reduced && inBrowser ? <StaticScene hero={children} /> : <AnimatedScene hero={children} />;
}
