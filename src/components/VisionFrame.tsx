"use client";

import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import CrewFlight, { type CrewFlightHandle } from "./CrewFlight";
import ScrollFrame, { type FrameSet } from "./ScrollFrame";
import { BackpackIcon, BookIcon, ScreenIcon } from "./StepIcons";

const STEPS = [
  { Icon: BookIcon, title: "Explore the Course", text: "See what’s inside and watch the free story preview with your child." },
  { Icon: BackpackIcon, title: "Enrol for ₹385", text: "A parent enrols the child. No account or sign-in needed." },
  { Icon: ScreenIcon, title: "Start Learning", text: "Watch, play and take a fun quiz, all at your own pace." },
];

const REASONS = [
  ["affordable-pricing", "Affordable pricing", "Complete learning for just ₹385, made to fit every family’s budget."],
  ["engaging-lessons", "Engaging lessons", "Stories, games and discussions that make learning easy to enjoy."],
  ["practical-activities", "Practical activities", "Hands-on tasks using things from home, school or the village."],
  ["flexible-learning", "Flexible learning", "Learn at your own pace, in one go or a little each day."],
  ["progress-tracking", "Progress tracking", "Parents can easily see lessons completed and quiz progress."],
];

const SETS: FrameSet[] = [
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
    length: 2.5,
    body: (
      <ol className="steps">
        <span className="steps-line" aria-hidden="true" />
        <span className="steps-line" aria-hidden="true" />
        {STEPS.map(({ Icon, title, text }) => (
          <li key={title} className="step">
            <Icon />
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
    body: (head) => (
      <>
        <div className="why-head">
          <svg className="why-decor" viewBox="0 0 1120 170" aria-hidden="true">
            <g fill="#fff" opacity=".85">
              <circle cx="32" cy="50" r="13" /><circle cx="54" cy="40" r="20" /><circle cx="78" cy="50" r="13" /><rect x="20" y="48" width="70" height="15" rx="7.5" />
              <circle cx="1050" cy="128" r="10" /><circle cx="1068" cy="120" r="15" /><circle cx="1086" cy="128" r="10" /><rect x="1040" y="126" width="56" height="12" rx="6" />
            </g>
            <path d="M148 88 l-14 -3 M153 68 l-9 -11 M148 108 l-14 5" fill="none" stroke="var(--yellow)" strokeWidth="5" strokeLinecap="round" />
            <path d="M966 106 Q1000 114 1026 92 Q1042 76 1024 72 Q1010 72 1018 86 Q1032 96 1058 52" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="7 8" />
            <path d="M1052 36 L1094 16 L1076 60 L1066 46 Z" fill="#fff" />
            <path d="M1066 46 L1094 16 L1068 58 Z" fill="#cfe4ff" />
          </svg>
          {head}
        </div>
        <div className="card-grid five">
          {REASONS.map(([icon, title, text]) => (
            <div key={title} className="card why-card">
              <div className="why-card-face">
                <Image className="why-card-icon" src={`/why-icons/${icon}.svg`} alt="" width={240} height={240} />
                <div className="why-card-body">
                  <svg className="why-card-cloud" viewBox="0 0 240 26" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M0 26 V16 Q20 2 44 12 Q68 -2 98 11 Q122 -2 148 11 Q176 0 200 13 Q222 4 240 16 V26 Z" />
                  </svg>
                  <h3>
                    <svg className="why-card-ticks" viewBox="0 0 16 16" aria-hidden="true"><path d="M14 2 L8 1 M14 8 L4 8 M14 14 L8 15" /></svg>
                    {title}
                  </h3>
                  <p>{text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },
];

// The planes cross over this many stage heights at the end of the last set, then the frame lets go and scrolls up.
const FLIGHT = 1.4;

export default function VisionFrame() {
  const crew = useRef<CrewFlightHandle>(null);

  const addFlight = (timeline: gsap.core.Timeline, end: number) => {
    const flight = { progress: 0 };
    timeline.to(flight, { progress: 1, duration: FLIGHT, ease: "none", onUpdate: () => crew.current?.seek(flight.progress) }, end - FLIGHT);
  };

  return (
    <ScrollFrame sets={SETS} className="sec-sky vision-frame" hold={0.8 + FLIGHT} onLast={addFlight}>
      <CrewFlight ref={crew} />
    </ScrollFrame>
  );
}
