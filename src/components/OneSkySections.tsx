"use client";

import Link from "next/link";
import { MotionConfig, motion, useScroll, useSpring } from "motion/react";
import { FAQS } from "@/content/site";
import { COURSE_URL } from "./HeroCourseScene";
import { Card, Faq, Reveal } from "./PageParts";
import VisionFrame from "./VisionFrame";

const MotionLink = motion.create(Link);

const AUDIENCES = [
  { title: "👨‍👩‍👧 Parents", items: ["You make the purchase for your child", "Guided activities you can do together", "See each part completed and quiz scores"] },
  { title: "🧑‍🏫 Teachers", items: ["Age-appropriate activities for Class 3–5, 6–10, 11 & 12", "Clear timings for every part of the course", "A quiz to check understanding"] },
  { title: "🏫 Schools", items: ["Bring AI Foundation to your students", "Simple, transparent price: ₹385 per child", "Progress visibility for learners"] },
];

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Reveal className="sec-head">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
    </Reveal>
  );
}

// Drives the bar at the top of the page.
function ScrollEffects() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />;
}

export default function OneSkySections() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollEffects />

      <VisionFrame />

      <section className="sec" id="preview">
        <div className="sec-inner preview-grid">
          <Reveal className="preview-screen">
            <span className="demo-tag">Demo preview</span>
            <span className="play" aria-hidden="true">▶</span>
            <span className="preview-caption">Chapter 1, The Green Notebook</span>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="eyebrow">Free Lesson Preview</p>
            <h2>See how a One Sky lesson feels</h2>
            <p className="lead">Chapter 1 of <em>Ajji, This Is for You</em>: Nila finds Ajji’s faded green notebook and an unfinished memory. Should they ask AI to finish it, or ask Ajji?</p>
            <p className="fine">This preview is a placeholder. Add the real lesson video when it’s ready.</p>
            <Link className="sec-btn" href={COURSE_URL}>View the full course</Link>
          </Reveal>
        </div>
      </section>

      <section className="sec sec-tint" id="audiences">
        <div className="sec-inner">
          <SectionHead eyebrow="For Parents, Teachers & Schools" title="Learning you can guide and see" />
          <div className="card-grid three">
            {AUDIENCES.map(({ title, items }, i) => (
              <Card key={title} className="card" delay={i * 0.1}>
                <h3>{title}</h3>
                <ul className="ticks">{items.map((item) => <li key={item}>{item}</li>)}</ul>
              </Card>
            ))}
          </div>
          <Reveal className="center">
            <Link className="sec-btn" href="/schools">Explore School Partnerships</Link>
          </Reveal>
        </div>
      </section>

      <section className="sec" id="faq">
        <div className="sec-inner narrow">
          <SectionHead eyebrow="FAQ" title="Questions families ask" />
          <Faq items={FAQS} />
        </div>
      </section>

      <section className="cta">
        <Reveal className="sec-inner narrow center">
          <h2>A Brighter Future Starts With One Lesson.</h2>
          <p>Give your child a joyful first step into AI. One course for ₹385.</p>
          <MotionLink className="sec-btn light" href={COURSE_URL} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>Start AI Foundation — ₹385</MotionLink>
        </Reveal>
      </section>
    </MotionConfig>
  );
}
