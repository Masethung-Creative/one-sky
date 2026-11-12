"use client";

import { useEffect, useImperativeHandle, useRef, type Ref } from "react";
import { BIRD_GEAR, CREW_GEAR, OWL_GEAR } from "@/components/illustrations/CrewGear";
import { MascotBird, MascotOwl } from "@/components/illustrations/Mascots";

export type CrewFlightHandle = { seek: (progress: number) => void };

type Point = [number, number];
type Flight = { id: "lead" | "kids"; path: [Point, Point, Point, Point]; size: number; far: number; delay: number; span: number };

// Screen paths in the 1600 x 900 picture: both planes come in small from the top right and leave large past the bottom left.
const FLIGHTS: Flight[] = [
  { id: "lead", path: [[1250, 215], [1000, 280], [700, 620], [-460, 1010]], size: 1.35, far: 2.6, delay: 0, span: 0.86 },
  { id: "kids", path: [[1430, 95], [1250, 140], [900, 420], [-430, 830]], size: 0.95, far: 2.6, delay: 0.12, span: 0.88 },
];

// Who sits where. The point is on the character's chest in the hero animation, placed at the plane's seat. Lower parts hide behind the plane.
const SEATS = [
  { name: "LEO", x: -150, y: -68, scale: 0.33, point: [248, 560] },
  { name: "DAVID", x: -5, y: -64, scale: 0.33, point: [490, 560] },
  { name: "EMMA", x: 128, y: -56, scale: 0.33, point: [775, 560] },
  { name: "COCO", x: 200, y: -48, scale: 0.3, point: [1050, 565] },
];

const clamp = (v: number, low: number, high: number) => Math.min(high, Math.max(low, v));
const smooth = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
const onCurve = (P: Flight["path"], u: number) => {
  const m = 1 - u;
  const at = (k: 0 | 1) => m * m * m * P[0][k] + 3 * m * m * u * P[1][k] + 3 * m * u * u * P[2][k] + u * u * u * P[3][k];
  return [at(0), at(1)];
};
const slope = (P: Flight["path"], u: number) => {
  const m = 1 - u;
  const at = (k: 0 | 1) => 3 * m * m * (P[1][k] - P[0][k]) + 6 * m * u * (P[2][k] - P[1][k]) + 3 * u * u * (P[3][k] - P[2][k]);
  return [at(0), at(1)];
};
const bend = (P: Flight["path"], u: number) => {
  const m = 1 - u;
  const at = (k: 0 | 1) => 6 * m * (P[2][k] - 2 * P[1][k] + P[0][k]) + 6 * u * (P[3][k] - 2 * P[2][k] + P[1][k]);
  return [at(0), at(1)];
};

function placement(f: Flight, progress: number) {
  const t = clamp((progress - f.delay) / f.span, 0, 1);
  const z = f.far + (1 - f.far) * t;
  // Lingers small in the distance, then rushes past as it gets near.
  const u = 0.7 * t + 0.3 * ((1 / z - 1 / f.far) / (1 - 1 / f.far));
  const [x, y] = onCurve(f.path, u);
  const [dx, dy] = slope(f.path, u);
  const [ddx, ddy] = bend(f.path, u);
  let rotation = (Math.atan2(dy, dx) * 180) / Math.PI - 180;
  if (rotation < -180) rotation += 360;
  const roll = clamp(((dx * ddy - dy * ddx) / Math.pow(dx * dx + dy * dy, 1.5)) * 380, -1, 1);
  const scale = f.size / z;
  return {
    transform: `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(rotation * 0.55 + roll * 7).toFixed(2)}) scale(${scale.toFixed(4)} ${(scale * (1 - 0.14 * Math.abs(roll))).toFixed(4)})`,
    opacity: (smooth(0, 0.04, t) * (1 - smooth(0.96, 1, t))).toFixed(3),
  };
}

function Seat({ x, y, delay, children }: { x: number; y: number; delay: string; children: React.ReactNode }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="crew-lean">
        <g className="crew-bob" style={{ animationDelay: delay }}>{children}</g>
      </g>
    </g>
  );
}

function Exhaust({ x, puffX, puffY, r }: { x: number; puffX: number; puffY: number; r: number }) {
  return (
    <g className="crew-exhaust">
      <g stroke="#dcecff" strokeWidth="5" strokeLinecap="round" fill="none" opacity=".7">
        <path className="crew-speed" d={`M${x},-34 H${x + 130}`} />
        <path className="crew-speed" d={`M${x + 10},-2 H${x + 170}`} style={{ animationDelay: "-.2s" }} />
        <path className="crew-speed" d={`M${x},28 H${x + 110}`} style={{ animationDelay: "-.33s" }} />
      </g>
      <g transform={`translate(${puffX} ${puffY})`} fill="#eef5ff">
        {[0, -0.33, -0.66, -0.99].map((delay) => (
          <circle key={delay} className="crew-puff" r={r} style={{ animationDelay: `${delay}s` }} />
        ))}
      </g>
    </g>
  );
}

function Propeller({ x }: { x: number }) {
  return (
    <>
      <ellipse cx={x + 22} cy="-4" rx="18" ry="46" fill="#2F3E46" />
      <g transform={`translate(${x} -4)`}>
        <ellipse rx="10" ry="80" fill="#C9D3DD" opacity=".28" />
        <g className="crew-prop">
          <ellipse cy="-38" rx="7" ry="40" fill="#343A40" />
          <ellipse cy="38" rx="7" ry="40" fill="#495057" />
        </g>
        <path d="M6,-13 Q-14,0 6,13 Z" fill="#D7DEE6" />
      </g>
    </>
  );
}

const STAR = "M0,-10 L2.9,-4 L9.5,-3.1 L4.7,1.5 L5.9,8.1 L0,5 L-5.9,8.1 L-4.7,1.5 L-9.5,-3.1 L-2.9,-4 Z";

// Two planes cross the frame as the scroll moves them. Their passengers are the hero's own characters.
export default function CrewFlight({ ref }: { ref: Ref<CrewFlightHandle> }) {
  const svg = useRef<SVGSVGElement>(null);
  const planes = useRef<Record<string, SVGGElement | null>>({});
  const seats = useRef<Record<string, SVGGElement | null>>({});
  const crew = useRef<{ play: () => void; pause: () => void }[]>([]);
  const state = useRef({ target: 0, current: 0, frame: 0, flying: false });

  const draw = (progress: number, speed: number) => {
    const box = svg.current;
    if (!box) return;
    // Both planes have faded out just before the end.
    const flying = progress > 0 && progress < 0.995;
    if (flying !== state.current.flying) {
      state.current.flying = flying;
      box.style.visibility = flying ? "visible" : "hidden";
      crew.current.forEach((member) => (flying ? member.play() : member.pause()));
    }
    if (!flying) return;
    box.style.setProperty("--crew-lean", clamp(speed * 90, -8, 8).toFixed(2));
    box.style.setProperty("--crew-exhaust", (0.3 + 0.7 * clamp(Math.abs(speed) * 40, 0, 1)).toFixed(2));
    FLIGHTS.forEach((flight) => {
      const plane = planes.current[flight.id];
      if (!plane) return;
      const { transform, opacity } = placement(flight, progress);
      plane.setAttribute("transform", transform);
      plane.setAttribute("opacity", opacity);
    });
  };

  // Scrolling arrives in steps, so the planes ease towards where the scroll has reached.
  useImperativeHandle(ref, () => {
    const s = state.current;
    const tick = () => {
      const before = s.current;
      s.current += (s.target - s.current) * 0.14;
      if (Math.abs(s.target - s.current) < 0.0005) s.current = s.target;
      draw(s.current, s.current - before);
      s.frame = s.current === s.target ? 0 : requestAnimationFrame(tick);
    };
    return {
      seek(progress) {
        s.target = progress;
        if (!s.frame && s.current !== s.target) s.frame = requestAnimationFrame(tick);
      },
    };
  }, []);

  // The characters load only as this part of the page comes close.
  useEffect(() => {
    const box = svg.current;
    if (!box) return;
    let gone = false;
    const load = async () => {
      const [{ default: lottie }, art] = await Promise.all([
        import("lottie-web"),
        fetch("/animations/characters-waving.json").then((r) => r.json()),
      ]);
      if (gone) return;
      crew.current = SEATS.map(({ name }) => {
        // The file plays each character twice in a row, so one pass is enough to loop.
        const layer = structuredClone(art.layers.find((l: { nm: string; ip: number }) => l.nm === name && l.ip === 0));
        const assets = structuredClone(art.assets);
        const drawing = assets.find((a: { id: string }) => a.id === layer.refId);
        // Coco's helmet takes the place of the cap.
        drawing.layers = drawing.layers.filter((l: { nm: string }) => l.nm !== CREW_GEAR[name].without);
        const head = drawing.layers.find((l: { nm: string }) => l.nm === "CABEZA");
        head.ln = `crew-head-${name}`;
        const seat = seats.current[name];
        const member = lottie.loadAnimation({
          container: seat as unknown as Element,
          renderer: "svg",
          loop: true,
          autoplay: state.current.flying,
          animationData: { ...art, op: 500, layers: [layer], assets },
        });
        member.setSubframe(false);
        member.addEventListener("DOMLoaded", () => {
          const picture = seat?.querySelector("svg");
          const headPart = seat?.querySelector(`[id="crew-head-${name}"]`);
          if (!picture || !headPart?.parentNode) return;
          picture.removeAttribute("style");
          picture.setAttribute("width", String(art.w));
          picture.setAttribute("height", String(art.h));
          picture.setAttribute("overflow", "visible");
          // The muffler stays on the neck, under the chin. The goggles and helmet turn with the head.
          const neck = document.createElementNS("http://www.w3.org/2000/svg", "g");
          neck.setAttribute("transform", `translate(${head.ks.p.k[0]} ${head.ks.p.k[1]})`);
          neck.innerHTML = CREW_GEAR[name].neck;
          headPart.parentNode.insertBefore(neck, headPart);
          const face = document.createElementNS("http://www.w3.org/2000/svg", "g");
          face.innerHTML = CREW_GEAR[name].face;
          headPart.parentNode.appendChild(face);
          const follow = () => face.setAttribute("transform", headPart.getAttribute("transform") ?? "");
          follow();
          member.addEventListener("drawnFrame", follow);
        });
        return member;
      });
    };
    const watcher = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      watcher.disconnect();
      load();
    }, { rootMargin: "150% 0px" });
    watcher.observe(box);
    const members = crew;
    const frame = state.current;
    return () => {
      gone = true;
      watcher.disconnect();
      cancelAnimationFrame(frame.frame);
      frame.frame = 0;
      members.current.forEach((member) => member.pause());
    };
  }, []);

  return (
    <svg className="crew-flight" ref={svg} viewBox="0 0 1600 900" aria-hidden="true">
      <defs>
        <linearGradient id="crew-white" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFFFFF" /><stop offset=".55" stopColor="#F2F6FC" /><stop offset="1" stopColor="#CFDAEA" /></linearGradient>
        <linearGradient id="crew-purple" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9F7DF7" /><stop offset=".55" stopColor="#7C5CF5" /><stop offset="1" stopColor="#5B36C4" /></linearGradient>
        <linearGradient id="crew-yellow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFD866" /><stop offset="1" stopColor="#F5B01C" /></linearGradient>
        <linearGradient id="crew-orange" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FF9E52" /><stop offset="1" stopColor="#EE7322" /></linearGradient>
        <linearGradient id="crew-glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#F1FAFF" /><stop offset="1" stopColor="#8FCBF5" /></linearGradient>
      </defs>

      {/* The children's plane, behind the lead plane */}
      <g ref={(el) => { planes.current.kids = el; }} opacity="0">
        <g className="crew-bank crew-bank-late">
          <Exhaust x={350} puffX={322} puffY={-10} r={11} />
          <path d="M-150,10 L0,10 L50,-30 L-90,-30 Z" fill="#E0661F" />
          <path d="M255,-12 L325,-36 L335,-30 L265,-2 Z" fill="#5B36C4" />

          {SEATS.map(({ name, x, y, scale, point }, i) => (
            <Seat key={name} x={x} y={y} delay={`${-0.3 - i * 0.4}s`}>
              <g transform={`scale(${scale}) translate(${-point[0]} ${-point[1]})`} ref={(el) => { seats.current[name] = el; }} />
            </Seat>
          ))}

          <path d="M-290,-10 C-290,-58 -200,-66 -80,-64 L220,-44 C265,-40 300,-34 312,-26 L312,6 C290,20 250,28 200,32 L-100,52 C-220,58 -290,40 -290,-10 Z" fill="url(#crew-purple)" />
          <path d="M-282,-2 L308,-12 L308,-2 L-282,12 Z" fill="#FFC93C" />
          <path d="M-262,-44 C-210,-58 -130,-62 -80,-61" stroke="#B9A0FA" strokeWidth="5" fill="none" strokeLinecap="round" opacity=".8" />
          <path d="M-60,-62 V40 M120,-50 V28" stroke="#5B36C4" strokeWidth="1.5" opacity=".35" />
          <path d="M230,-38 L255,-136 Q265,-148 282,-140 L312,-28 Z" fill="url(#crew-purple)" />
          <path d="M250,-118 L280,-124 L286,-104 L246,-100 Z" fill="#FFC93C" />
          <path d="M250,-2 L342,12 L342,24 L255,20 Z" fill="#6A44D6" />
          <path d="M-196,-62 Q-150,-52 -104,-63" stroke="#3A1E86" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M-52,-60 Q-5,-50 42,-57" stroke="#3A1E86" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M80,-52 Q150,-40 226,-45" stroke="#3A1E86" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M-214,-60 L-199,-100 L-184,-62 Z" fill="url(#crew-glass)" opacity=".9" stroke="#fff" strokeWidth="2" />
          <Propeller x={-314} />
          <g transform="translate(-90 15)">
            <g className="crew-wing">
              <path d="M-80,0 L90,0 L140,82 Q145,94 130,96 L10,96 Q-12,96 -14,82 Z" fill="url(#crew-orange)" />
              <path d="M-14,82 Q-12,96 10,96 L130,96 Q145,94 140,82 Z" fill="#D9601A" />
              <circle cx="58" cy="52" r="15" fill="#fff" />
              <path transform="translate(58 52)" d={STAR} fill="#7C5CF5" />
            </g>
          </g>
        </g>
      </g>

      {/* The lead plane: the owl flying, with the bluebird behind */}
      <g ref={(el) => { planes.current.lead = el; }} opacity="0">
        <g className="crew-bank">
          <Exhaust x={300} puffX={272} puffY={-8} r={10} />
          <path d="M-110,10 L20,10 L60,-28 L-60,-28 Z" fill="#E8A600" />
          <path d="M205,-10 L275,-34 L285,-28 L215,0 Z" fill="#B6C4D8" />

          <Seat x={-70} y={-52} delay="0s">
            <g transform="scale(.44) translate(-280 -326)">
              <MascotOwl prefix="crew-" cap={false} />
              <g dangerouslySetInnerHTML={{ __html: OWL_GEAR }} />
            </g>
          </Seat>
          <Seat x={104} y={-74} delay="-.5s">
            <g transform="scale(.6) translate(-76 -322)">
              <MascotBird prefix="crew-" />
              <g dangerouslySetInnerHTML={{ __html: BIRD_GEAR }} />
            </g>
          </Seat>

          <path d="M-230,-10 C-230,-55 -150,-62 -40,-60 L170,-38 C215,-34 250,-30 262,-22 L262,8 C240,22 200,30 150,34 L-60,52 C-170,58 -230,40 -230,-10 Z" fill="url(#crew-white)" stroke="#C9D5E6" strokeWidth="2.5" />
          <path d="M-222,-2 L258,-10 L258,0 L-222,12 Z" fill="#7C5CF5" />
          <path d="M-200,-44 C-150,-56 -80,-58 -40,-57" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M-20,-60 V44 M120,-44 V30" stroke="#B9C7DA" strokeWidth="1.5" />
          <path d="M180,-36 L205,-130 Q215,-142 232,-134 L262,-24 Z" fill="url(#crew-white)" stroke="#C9D5E6" strokeWidth="2.5" />
          <path d="M200,-112 L230,-118 L236,-98 L196,-94 Z" fill="#7C5CF5" />
          <path d="M200,0 L292,14 L292,26 L205,22 Z" fill="#C3D0E3" />
          <path d="M-116,-58 Q-70,-48 -24,-60" stroke="#46566F" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M52,-50 Q102,-38 152,-42" stroke="#46566F" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M-138,-56 L-123,-96 L-108,-58 Z" fill="url(#crew-glass)" opacity=".9" stroke="#fff" strokeWidth="2" />
          <Propeller x={-254} />
          <g transform="translate(-45 15)">
            <g className="crew-wing">
              <path d="M-75,0 L75,0 L125,80 Q130,92 115,94 L5,94 Q-15,94 -17,80 Z" fill="url(#crew-yellow)" />
              <path d="M-17,80 Q-15,94 5,94 L115,94 Q130,92 125,80 Z" fill="#E59E00" />
              <circle cx="48" cy="52" r="15" fill="#fff" />
              <path transform="translate(48 52)" d={STAR} fill="#7C5CF5" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
