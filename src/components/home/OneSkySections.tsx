"use client";

import Link from "next/link";
import { MotionConfig, motion, useScroll, useSpring } from "motion/react";
import GuideFrame from "@/components/home/sections/GuideFrame";
import HashLanding from "@/components/home/sections/HashLanding";
import { COURSE_URL } from "@/components/home/hero/HeroCourseScene";
import { Reveal } from "@/components/pages/PageParts";
import VisionFrame from "@/components/home/sections/VisionFrame";

const MotionLink = motion.create(Link);

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
      <HashLanding />

      <VisionFrame />

      <GuideFrame />

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
