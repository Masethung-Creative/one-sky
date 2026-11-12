"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";

const TOOLS = [
  ["Gemini", "500px-Google_Gemini_logo.svg.webp"],
  ["Scratch", "500px-Scratch_Logo.svg.webp"],
  ["Figma", "500px-Figma-logo.svg.webp"],
  ["NotebookLM", "960px-NotebookLM_logo.svg.webp"],
  ["Code.org", "500px-Code.org_logo.svg.webp"],
  ["Google Lens", "500px-Google_Lens_Icon.svg.webp"],
  ["Suno", "500px-Suno_AI_icon.svg.webp"],
  ["Tinkercad", "960px-Autodesk_Tinkercad_Logo.svg.webp"],
  ["Google AI Studio", "500px-Google_AI_Studio_icon__May_2026_.svg.webp"],
  ["Desmos", "500px-Desmos_logo.svg.webp"],
  ["MIT App Inventor", "500px-MIT_App_Inventor_logo.png"],
  ["ElevenLabs", "elevenlabs-logo-black.png"],
  ["Google Earth", "500px-Google_Earth_icon.svg.webp"],
  ["Arduino", "960px-Arduino_Logo.svg.webp"],
  ["Photomath", "500px-PhotoMath_Logo.png"],
  ["Google Colab", "960px-Google_Colaboratory_SVG_Logo.svg.webp"],
  ["Clipchamp", "330px-Clipchamp_logo__2022_2025_.svg.webp"],
  ["Wolfram|Alpha", "960px-Wolfram_Alpha_logo.svg.webp"],
  ["Google Classroom", "960px-Google_Classroom_Logo.svg.webp"],
  ["Kaggle", "960px-Kaggle_Logo.svg.webp"],
  ["Arts & Culture", "500px-Arts___Culture_Logo.svg.webp"],
  ["Powtoon", "960px-Powtoon-logo2017.svg.webp"],
  ["iNaturalist", "960px-INaturalist_text_logo.svg.webp"],
  ["Animaker", "animaker-logo.png"],
  ["Microsoft", "960px-Microsoft_logo__2012_.svg.webp"],
];

const PER_PAGE = 6;
const PAGES = Math.ceil(TOOLS.length / PER_PAGE);
const SHOW_MS = 3900;
const LEAVE_MS = 450;

export default function AiToolsShow() {
  const [page, setPage] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (leaving) {
        setPage((p) => (p + 1) % PAGES);
        setLeaving(false);
      } else {
        setLeaving(true);
      }
    }, leaving ? LEAVE_MS : SHOW_MS);
    return () => clearTimeout(timer);
  }, [leaving, page]);

  // The last page wraps round to the start of the list so it is always full.
  const tiles = Array.from({ length: PER_PAGE }, (_, i) => TOOLS[(page * PER_PAGE + i) % TOOLS.length]);

  return (
    <div className="ai-show" role="img" aria-label={`AI tools to explore: ${TOOLS.map(([name]) => name).join(", ")}`}>
      <ul key={page} className={`ai-show-grid${leaving ? " is-leaving" : ""}`} aria-hidden="true">
        {tiles.map(([name, file], i) => (
          <li key={name} className="ai-tile" style={{ "--d": (i % 3) + Math.floor(i / 3) } as CSSProperties}>
            <span className="ai-tile-card">
              <Image src={`/images/ai-tools/${file}`} alt="" width={180} height={76} />
            </span>
            <span className="ai-tile-name">{name}</span>
          </li>
        ))}
      </ul>
      <div className="ai-show-dots" aria-hidden="true">
        {Array.from({ length: PAGES }, (_, i) => <span key={i} className={i === page ? "is-on" : undefined} />)}
      </div>
    </div>
  );
}
