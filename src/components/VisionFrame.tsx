"use client";

import gsap from "gsap";
import Link from "next/link";
import { useRef } from "react";
import CrewFlight, { type CrewFlightHandle } from "./CrewFlight";
import ScrollFrame, { type FrameSet } from "./ScrollFrame";

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
