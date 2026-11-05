"use client";

import Link from "next/link";
import { FAQS } from "@/content/site";
import { COURSE_URL } from "./HeroCourseScene";
import { Faq } from "./PageParts";
import ScrollFrame, { type FrameSet } from "./ScrollFrame";

const AUDIENCES = [
  { title: "👨‍👩‍👧 Parents", items: ["You make the purchase for your child", "Guided activities you can do together", "See each part completed and quiz scores"] },
  { title: "🧑‍🏫 Teachers", items: ["Age-appropriate activities for Class 3–5, 6–10, 11 & 12", "Clear timings for every part of the course", "A quiz to check understanding"] },
  { title: "🏫 Schools", items: ["Bring AI Foundation to your students", "Simple, transparent price: ₹385 per child", "Progress visibility for learners"] },
];

const SETS: FrameSet[] = [
  {
    id: "preview",
    eyebrow: "Free Lesson Preview",
    title: "See how a One Sky lesson feels",
    wide: true,
    body: (head) => (
      <div className="preview-grid">
        <div className="preview-screen">
          <span className="demo-tag">Demo preview</span>
          <span className="play" aria-hidden="true">▶</span>
          <span className="preview-caption">Chapter 1, The Green Notebook</span>
        </div>
        <div>
          {head}
          <p className="lead">Chapter 1 of <em>Ajji, This Is for You</em>: Nila finds Ajji’s faded green notebook and an unfinished memory. Should they ask AI to finish it, or ask Ajji?</p>
          <p className="fine">This preview is a placeholder. Add the real lesson video when it’s ready.</p>
          <Link className="sec-btn" href={COURSE_URL}>View the full course</Link>
        </div>
      </div>
    ),
  },
  {
    id: "audiences",
    eyebrow: "For Parents, Teachers & Schools",
    title: "Learning you can guide and see",
    wide: true,
    body: (
      <>
        <div className="card-grid three">
          {AUDIENCES.map(({ title, items }) => (
            <div key={title} className="card">
              <h3>{title}</h3>
              <ul className="ticks">{items.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          ))}
        </div>
        <div className="center">
          <Link className="sec-btn" href="/schools">Explore School Partnerships</Link>
        </div>
      </>
    ),
  },
  {
    id: "faq",
    eyebrow: "FAQ",
    title: "Questions families ask",
    wide: false,
    body: <Faq items={FAQS} />,
  },
];

// The light frame after the blue one: preview, then who it's for, then FAQ, which stays until the visitor scrolls past it.
export default function GuideFrame() {
  return <ScrollFrame sets={SETS} className="guide-frame" hold={1.2} />;
}
