"use client";

import { MotionConfig, motion } from "motion/react";
import type { ReactNode } from "react";

export default function PageShell({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <main id="main" className="sub-page">
        <header className="page-head">
          <motion.div className="sec-inner narrow" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            {intro && <p className="lead">{intro}</p>}
          </motion.div>
        </header>
        {children}
      </main>
    </MotionConfig>
  );
}
