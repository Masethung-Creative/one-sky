"use client";

import { useEffect, useRef, useState } from "react";
import Firefly, { type FireflyFlight } from "@/components/home/hero/Firefly";

type Point = { x: number; y: number };
type World = { spots: Point[]; air: { left: number; right: number; top: number; bottom: number }; pace: number; awake: () => boolean };
type Shared = { current: World | null };

// Places in the hero art a firefly can settle on. The hills use the art's own coordinates (viewBox 1440 x 330), the others a share of the picture's box.
const GROUND_SPOTS = [[92, 26], [135, 58], [20, 70], [958, 138], [510, 136], [830, 122], [905, 256], [958, 290], [560, 258], [770, 264], [1151, 74], [1391, 28]];
const KID_SPOTS = [[0.167, 0.39], [0.37, 0.46], [0.583, 0.378], [0.796, 0.53]];
const OWL_SPOTS = [[0.317, 0.1], [0.9, 0.1], [0.18, 0.26], [0.16, 0.72]];

// Each firefly has its own temperament: how fast it flies, how long it stays, and how much it swerves.
const TEMPERS = [
  { speed: 66, rest: [2, 5], swerve: 14 },
  { speed: 40, rest: [5, 11], swerve: 9 },
  { speed: 92, rest: [1, 3], swerve: 20 },
  { speed: 52, rest: [3, 8], swerve: 12 },
];

const between = (a: number, b: number) => a + Math.random() * (b - a);

function pickSpot(from: Point, spots: Point[], taken: Set<Point>) {
  const free = spots.filter((s) => !taken.has(s) && s !== from);
  free.sort((a, b) => Math.hypot(a.x - from.x, a.y - from.y) - Math.hypot(b.x - from.x, b.y - from.y));
  // Nearby places are likelier, but a long trip still happens now and then.
  return free[Math.floor(Math.random() ** 2 * free.length)];
}

// One firefly's mind: settle on something, wait, choose somewhere new, fly there on a curved path. It only thinks while the night is showing.
function makeFlight(index: number, world: Shared, taken: Set<Point>): FireflyFlight {
  const temper = TEMPERS[index % TEMPERS.length];
  let at: Point | null = null;
  let perched = true;
  let wait = between(0.5, temper.rest[1]);
  let trip: { from: Point; c1: Point; c2: Point; to: Point; time: number; length: number; seed: number } | null = null;
  let clock = Math.random() * 100;

  return (dt) => {
    const w = world.current;
    if (!w || !w.spots.length || !w.awake()) return null;
    clock += dt;
    if (!at) {
      at = pickSpot({ x: -999, y: 0 }, w.spots, taken) ?? w.spots[0];
      taken.add(at);
    }

    if (trip) {
      trip.time += dt;
      const u = Math.min(1, trip.time / trip.length);
      const p = u * u * (3 - 2 * u);
      const q = 1 - p;
      const curve = (k: "x" | "y") => q * q * q * trip!.from[k] + 3 * q * q * p * trip!.c1[k] + 3 * q * p * p * trip!.c2[k] + p * p * p * trip!.to[k];
      const swerve = Math.sin(Math.PI * u) * temper.swerve * w.pace;
      const x = curve("x") + swerve * Math.sin(clock * 2.3 + trip.seed) + (swerve / 2) * Math.sin(clock * 5.1);
      const y = curve("y") + swerve * Math.cos(clock * 1.9 + trip.seed);
      if (u === 1) {
        at = trip.to;
        trip = null;
        wait = between(temper.rest[0], temper.rest[1]);
      }
      return { x, y, phase: "fly" };
    }

    wait -= dt;
    if (wait <= 0) {
      taken.delete(at);
      // Sometimes it stops in mid-air instead of landing on something.
      perched = Math.random() > 0.25;
      const to: Point = perched
        ? pickSpot(at, w.spots, taken) ?? at
        : { x: between(w.air.left, w.air.right), y: between(w.air.top, w.air.bottom) };
      if (perched) taken.add(to);
      const dx = to.x - at.x;
      const dy = to.y - at.y;
      const distance = Math.hypot(dx, dy) || 1;
      const bend = (distance * between(0.15, 0.45)) * (Math.random() < 0.5 ? -1 : 1);
      const side = (t: number): Point => ({ x: at!.x + dx * t + (-dy / distance) * bend, y: at!.y + dy * t + (dx / distance) * bend - distance * 0.12 });
      trip = { from: at, c1: side(0.3), c2: side(0.7), to, time: 0, length: distance / (temper.speed * w.pace * between(0.75, 1.25)), seed: Math.random() * 6 };
      return { x: at.x, y: at.y, phase: "fly" };
    }

    if (perched) return { x: at.x, y: at.y, phase: "rest" };
    return { x: at.x + 6 * w.pace * Math.sin(clock * 0.9), y: at.y + 4 * w.pace * Math.sin(clock * 1.7), phase: "hover" };
  };
}

export default function Fireflies() {
  const box = useRef<HTMLSpanElement>(null);
  const [look, setLook] = useState({ scale: 0.42, halo: 1 });
  const [flights, setFlights] = useState<FireflyFlight[]>([]);

  useEffect(() => {
    const world: Shared = { current: null };
    const taken = new Set<Point>();
    const created = TEMPERS.map((_, i) => makeFlight(i, world, taken));

    const hero = box.current?.closest<HTMLElement>(".hero");
    if (!hero) return;
    const stage = hero.closest<HTMLElement>(".scene-stage");
    const layer = hero.closest<HTMLElement>(".scene-hero");
    const pick = (selector: string) => hero.querySelector(selector)!;

    const measure = () => {
      const home = hero.getBoundingClientRect();
      const ground = pick(".ground").getBoundingClientRect();
      const kids = pick(".kids").getBoundingClientRect();
      const owl = pick(".mascot").getBoundingClientRect();
      const title = pick("#hero-title").getBoundingClientRect();
      const note = pick(".note").getBoundingClientRect();
      const fit = Math.max(ground.width / 1440, ground.height / 330);
      const inside = (s: Point) => s.x > 8 && s.x < home.width - 8;
      const within = (r: DOMRect, list: number[][]) => list.map(([x, y]) => ({ x: r.left - home.left + x * r.width, y: r.top - home.top + y * r.height }));
      world.current = {
        spots: [
          ...GROUND_SPOTS.map(([x, y]) => ({ x: home.width / 2 + (x - 720) * fit, y: ground.bottom - home.top - (330 - y) * fit })),
          ...within(kids, KID_SPOTS),
          ...within(owl, OWL_SPOTS),
        ].filter(inside),
        air: { left: 12, right: home.width - 12, top: Math.max(note.bottom - home.top + 16, ground.top - home.top - 40), bottom: ground.top - home.top + 60 },
        pace: 0.55 + 0.45 * Math.min(1, home.width / 1440),
        awake: () => Number(stage?.style.getPropertyValue("--night") || 0) > 0.02 && layer?.style.visibility !== "hidden",
      };
      // On smaller screens, where the picture shrinks, fireflies stay a little smaller than the butterflies.
      const small = home.width <= 1100;
      setFlights((old) => (old.length ? old : created));
      setLook({ scale: small ? kids.width * 0.00048 : 0.42, halo: small ? 1.6 : 1 });
      // The plane flies just over the title, as it does on the desktop layout.
      hero.style.setProperty("--title-top", `${title.top - home.top}px`);
    };
    measure();
    const watcher = new ResizeObserver(measure);
    watcher.observe(hero);
    return () => watcher.disconnect();
  }, []);

  return (
    <span className="fireflies" ref={box} aria-hidden="true">
      {flights.map((flight, i) => (
        <Firefly key={i} className="firefly" width={160} height={160} phase="hover" scale={look.scale} halo={look.halo} flight={flight} blink={0.8 + i * 0.27} blinkDelay={-1.3 * i} />
      ))}
    </span>
  );
}
