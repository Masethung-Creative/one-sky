"use client";

/**
 * Firefly.tsx — small, realistic 2D firefly that flies around a night scene
 * Phases (from the animation chart): Hover → Flap → Glow → Fly  (looping)
 * React 18+, no other dependencies. SVG + CSS keyframes + one rAF loop.
 */
import React, { useEffect, useId, useRef, useState } from "react";

export type FireflyPhase = "hover" | "flap" | "glow" | "fly";

export interface FireflyProps {
  /** Scene size in SVG units (also the rendered px size unless styled). */
  width?: number;
  height?: number;
  /** Insect size. 1 = about 70 units long. */
  scale?: number;
  /** Lock one phase, or "loop" to cycle Hover → Flap → Glow → Fly. */
  phase?: FireflyPhase | "loop";
  /** Time spent in each phase while looping, in ms. */
  phaseMs?: number;
  /** Flight speed multiplier. */
  speed?: number;
  /** Faint light trail behind the lantern. */
  trail?: boolean;
  /** Called whenever the active phase changes. */
  onPhaseChange?: (phase: FireflyPhase) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const FIREFLY_COLORS = {
  body: "#221C2B",
  bodyEdge: "#3D3449",
  pronotum: "#C96B4E",
  eye: "#9FB4C9",
  wing: "#DCE8FF",
  wingEdge: "#F0F5FF",
  lamp: "#EFFF7A",
  glow: "#D8FF4D",
  glowWarm: "#FFE600",
} as const;

const PHASES: FireflyPhase[] = ["hover", "flap", "glow", "fly"];

/** Per phase: how far it roams (0–1), wing beat, light pattern. */
const PHASE_CFG: Record<FireflyPhase, { roam: number; beat: string; light: string; lightDur: string }> = {
  hover: { roam: 0.06, beat: "0.12s", light: "ff-breathe", lightDur: "2.6s" },
  flap: { roam: 0.16, beat: "0.09s", light: "ff-breathe", lightDur: "1.8s" },
  glow: { roam: 0.1, beat: "0.11s", light: "ff-flash2", lightDur: "1.9s" },
  fly: { roam: 1, beat: "0.1s", light: "ff-flash1", lightDur: "1.6s" },
};

const CSS = `
.ff-scene .ff-wing{transform-box:fill-box;animation:var(--ff-beat) linear infinite alternate}
.ff-scene .ff-wing-a{transform-origin:95% 100%;animation-name:ff-wing-a}
.ff-scene .ff-wing-b{transform-origin:15% 100%;animation-name:ff-wing-b}
.ff-scene .ff-elytra{transform-box:fill-box;transform-origin:100% 100%;animation:ff-elytra var(--ff-beat) linear infinite alternate}
.ff-scene .ff-blur{opacity:0;transition:opacity .4s}
.ff-flap .ff-blur,.ff-fly .ff-blur{opacity:1}
.ff-scene .ff-light{animation:var(--ff-light) var(--ff-light-dur) ease-in-out infinite}
@keyframes ff-wing-a{from{transform:rotate(-14deg)}to{transform:rotate(38deg) scaleY(.5)}}
@keyframes ff-wing-b{from{transform:rotate(10deg)}to{transform:rotate(-32deg) scaleY(.55)}}
@keyframes ff-elytra{from{transform:rotate(-4deg)}to{transform:rotate(8deg)}}
@keyframes ff-breathe{0%,100%{opacity:.35}50%{opacity:.85}}
@keyframes ff-flash1{0%,40%,100%{opacity:.15}12%{opacity:1}22%{opacity:.95}}
@keyframes ff-flash2{0%,100%{opacity:.15}8%{opacity:1}16%{opacity:.2}26%{opacity:1}36%{opacity:.95}48%{opacity:.15}}
@media (prefers-reduced-motion:reduce){
  .ff-scene .ff-wing,.ff-scene .ff-elytra{animation-duration:.6s}
}
`;

export default function Firefly({
  width = 440,
  height = 300,
  scale = 0.9,
  phase = "loop",
  phaseMs = 3200,
  speed = 1,
  trail = true,
  onPhaseChange,
  className,
  style,
}: FireflyProps) {
  const [step, setStep] = useState(0);
  const uid = useId().replace(/:/g, "");
  const bugRef = useRef<SVGGElement>(null);
  const trailRef = useRef<SVGGElement>(null);

  const current: FireflyPhase = phase === "loop" ? PHASES[step] : phase;
  const live = useRef({ phase: current, speed, scale });
  live.current = { phase: current, speed, scale };

  // Looping timeline
  useEffect(() => {
    if (phase !== "loop") return;
    const id = window.setInterval(() => setStep((s) => (s + 1) % PHASES.length), phaseMs);
    return () => window.clearInterval(id);
  }, [phase, phaseMs]);

  useEffect(() => {
    onPhaseChange?.(current);
  }, [current, onPhaseChange]);

  // Flight: wandering figure-8 with jitter, facing its direction of travel
  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const cx = width / 2;
    const cy = height / 2 - height * 0.05;
    const s = { t: 0, roam: 0, x: cx, y: cy, flip: 1, flipTo: 1, ang: 0, frame: 0, hist: [] as [number, number][] };
    let last = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const { phase: p, speed: sp, scale: sc } = live.current;
      if (!reduce) s.t += dt * sp;

      s.roam += (PHASE_CFG[p].roam - s.roam) * Math.min(1, dt * 0.6);
      const ax = width * 0.36 * s.roam + 5;
      const ay = height * 0.27 * s.roam + 4;
      const nx = cx + ax * Math.sin(s.t * 0.7);
      const ny = cy + ay * Math.sin(s.t * 1.4 + 0.6);
      const vx = (nx - s.x) / (dt || 1 / 60);
      const vy = (ny - s.y) / (dt || 1 / 60);
      s.x = nx;
      s.y = ny;

      // Turn around only when actually travelling, not while hovering
      if (Math.abs(vx) > 22) s.flipTo = vx > 0 ? 1 : -1;
      s.flip += (s.flipTo - s.flip) * Math.min(1, dt * 3);

      const pitch = Math.atan2(vy, Math.abs(vx) + 1) * (180 / Math.PI);
      const target = Math.max(-26, Math.min(26, pitch)) * Math.min(1, s.roam * 3) * s.flipTo;
      s.ang += (target - s.ang) * Math.min(1, dt * 2.5);

      bugRef.current?.setAttribute(
        "transform",
        `translate(${s.x.toFixed(2)} ${s.y.toFixed(2)}) rotate(${s.ang.toFixed(2)}) scale(${(s.flip * sc).toFixed(3)} ${sc})`
      );

      // Lantern position for the trail
      const r = (s.ang * Math.PI) / 180;
      const lx = -33 * s.flip * sc;
      const ly = 4 * sc;
      s.frame++;
      if (s.frame % 2 === 0) {
        s.hist.unshift([s.x + lx * Math.cos(r) - ly * Math.sin(r), s.y + lx * Math.sin(r) + ly * Math.cos(r)]);
        if (s.hist.length > 14) s.hist.pop();
        const dots = trailRef.current?.children;
        if (dots) {
          for (let i = 0; i < dots.length; i++) {
            const pt = s.hist[i];
            if (!pt) continue;
            dots[i].setAttribute("cx", pt[0].toFixed(1));
            dots[i].setAttribute("cy", pt[1].toFixed(1));
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [width, height]);

  const c = FIREFLY_COLORS;
  const cfg = PHASE_CFG[current];
  const vars = {
    "--ff-beat": cfg.beat,
    "--ff-light": cfg.light,
    "--ff-light-dur": cfg.lightDur,
    ...style,
  } as React.CSSProperties;
  const halo = `ff-halo-${uid}`;
  const lampGrad = `ff-lamp-${uid}`;

  return (
    <svg
      className={`ff-scene ff-${current}${className ? " " + className : ""}`}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      style={vars}
      role="img"
      aria-label={`Firefly, ${current}`}
    >
      <style>{CSS}</style>
      <defs>
        <radialGradient id={halo}>
          <stop offset="0%" stopColor={c.lamp} stopOpacity="0.9" />
          <stop offset="30%" stopColor={c.glow} stopOpacity="0.45" />
          <stop offset="65%" stopColor={c.glow} stopOpacity="0.12" />
          <stop offset="100%" stopColor={c.glow} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={lampGrad} cx="40%" cy="45%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="45%" stopColor={c.lamp} />
          <stop offset="100%" stopColor={c.glowWarm} />
        </radialGradient>
      </defs>

      {/* Light trail */}
      {trail && (
        <g ref={trailRef} className="ff-light" fill={c.glow}>
          {Array.from({ length: 14 }, (_, i) => (
            <circle key={i} cx={-99} cy={-99} r={2.6 - i * 0.16} opacity={0.5 - i * 0.034} />
          ))}
        </g>
      )}

      {/* The insect, drawn facing right around its thorax at (0,0) */}
      <g ref={bugRef} transform={`translate(${width / 2} ${height / 2})`}>
        {/* Glow halo around the lantern */}
        <circle className="ff-light" cx="-33" cy="4" r="56" fill={`url(#${halo})`} />

        {/* Far hindwing */}
        <path
          className="ff-wing ff-wing-b"
          d="M4 -6 C 12 -28 20 -48 15 -58 C 3 -48 -2 -26 4 -6 Z"
          fill={c.wing}
          fillOpacity="0.3"
          stroke={c.wingEdge}
          strokeOpacity="0.6"
          strokeWidth="0.8"
        />

        {/* Legs */}
        <g stroke={c.body} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M-3 6 L-9 14 L-14 16" />
          <path d="M2 7 L1 16 L-2 20" />
          <path d="M7 6 L12 14 L16 16" />
        </g>

        {/* Abdomen with segments */}
        <ellipse cx="-19" cy="3" rx="20" ry="8.5" fill={c.body} />
        <g stroke={c.bodyEdge} strokeWidth="1" fill="none">
          <path d="M-10 -5 Q-8 3 -10 11" />
          <path d="M-17 -5.5 Q-15 3 -17 11.5" />
          <path d="M-24 -5 Q-22 3 -24 11" />
        </g>

        {/* Lantern (light organ) */}
        <ellipse className="ff-light" cx="-33" cy="4" rx="9.5" ry="7.2" fill={c.glow} opacity="0.9" />
        <ellipse cx="-33" cy="4" rx="8.5" ry="6.5" fill={`url(#${lampGrad})`} />

        {/* Thorax, pronotum shield, head */}
        <ellipse cx="2" cy="1" rx="10" ry="8" fill={c.body} />
        <ellipse cx="10" cy="-1" rx="7" ry="7" fill={c.pronotum} />
        <ellipse cx="9" cy="-4" rx="3" ry="1.8" fill={c.body} />
        <circle cx="17" cy="3" r="4.5" fill={c.body} />
        <circle cx="19" cy="2" r="1.6" fill={c.eye} />

        {/* Antennae */}
        <g stroke={c.body} strokeWidth="1.4" strokeLinecap="round" fill="none">
          <path d="M19 -1 Q26 -11 35 -13" />
          <path d="M18 -1 Q22 -13 29 -19" />
        </g>

        {/* Raised forewing (elytron) */}
        <path
          className="ff-elytra"
          d="M3 -5 C -5 -14 -16 -23 -27 -26 C -21 -17 -10 -9 3 -5 Z"
          fill={c.bodyEdge}
          stroke={c.body}
          strokeWidth="1"
        />

        {/* Motion blur of the wing stroke */}
        <path
          className="ff-blur"
          d="M3 -6 C -10 -40 -26 -56 -30 -54 C -10 -62 14 -64 16 -58 C 18 -40 10 -20 3 -6 Z"
          fill={c.wing}
          fillOpacity="0.1"
        />

        {/* Near hindwing with veins */}
        <g className="ff-wing ff-wing-a">
          <path
            d="M2 -6 C -2 -26 -14 -48 -27 -54 C -31 -40 -17 -18 2 -6 Z"
            fill={c.wing}
            fillOpacity="0.38"
            stroke={c.wingEdge}
            strokeOpacity="0.75"
            strokeWidth="0.8"
          />
          <path d="M2 -6 Q -9 -30 -25 -50" stroke={c.wingEdge} strokeOpacity="0.5" strokeWidth="0.6" fill="none" />
          <path d="M-4 -20 Q -14 -30 -21 -36" stroke={c.wingEdge} strokeOpacity="0.35" strokeWidth="0.5" fill="none" />
        </g>
      </g>
    </svg>
  );
}
