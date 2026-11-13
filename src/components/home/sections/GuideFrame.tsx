"use client";

import Link from "next/link";
import { FAQS } from "@/content/site";
import { COURSE_URL } from "@/components/home/hero/HeroCourseScene";
import { Faq } from "@/components/pages/PageParts";
import ScrollFrame, { type FrameSet } from "@/components/home/sections/ScrollFrame";
import LessonPlayer from "@/components/video/LessonPlayer";

// The free Chapter 1 video. Its files live in public/videos/chapter-1.
const CHAPTER_ONE = {
  title: "Chapter 1 · The Green Notebook",
  poster: "/videos/chapter-1/poster.jpg",
  sources: [
    { height: 1080, src: "/videos/chapter-1/chapter-1-1080p.mp4" },
    { height: 720, src: "/videos/chapter-1/chapter-1-720p.mp4" },
    { height: 480, src: "/videos/chapter-1/chapter-1-480p.mp4" },
  ],
  // Each language is shown in its own script, the same way as the site language menu.
  captions: [
    { lang: "en", label: "English", src: "/videos/chapter-1/captions-en.vtt" },
    { lang: "hi", label: "हिन्दी", src: "/videos/chapter-1/captions-hi.vtt" },
    { lang: "kn", label: "ಕನ್ನಡ", src: "/videos/chapter-1/captions-kn.vtt" },
    { lang: "ml", label: "മലയാളം", src: "/videos/chapter-1/captions-ml.vtt" },
    { lang: "ta", label: "தமிழ்", src: "/videos/chapter-1/captions-ta.vtt" },
    { lang: "te", label: "తెలుగు", src: "/videos/chapter-1/captions-te.vtt" },
  ],
};

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
          <LessonPlayer {...CHAPTER_ONE} captionsFromLocation />
        </div>
        <div>
          {head}
          <p className="lead">Chapter 1 of <em>Ajji, This Is for You</em>: Nila finds Ajji’s faded green notebook and an unfinished memory. Should they ask AI to finish it, or ask Ajji?</p>
          <p className="fine">About 1 minute · Captions in English, Hindi, Kannada, Malayalam, Tamil and Telugu</p>
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
