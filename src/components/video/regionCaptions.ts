// Picks a caption language from the visitor's Indian state. This only affects the video, never the site language.

// State and territory codes (ISO 3166-2:IN) and the caption language that suits each one.
// States not listed here, and visitors outside India, start with captions off.
const CAPTIONS_BY_STATE: Record<string, string> = {
  KA: "kn", // Karnataka
  TN: "ta", // Tamil Nadu
  PY: "ta", // Puducherry
  KL: "ml", // Kerala
  LD: "ml", // Lakshadweep
  AP: "te", // Andhra Pradesh
  TG: "te", // Telangana
  TS: "te", // Telangana (older code)
  UP: "hi", // Uttar Pradesh
  MP: "hi", // Madhya Pradesh
  BR: "hi", // Bihar
  RJ: "hi", // Rajasthan
  DL: "hi", // Delhi
  HR: "hi", // Haryana
  JH: "hi", // Jharkhand
  CT: "hi", // Chhattisgarh
  CG: "hi", // Chhattisgarh (older code)
  UT: "hi", // Uttarakhand
  UK: "hi", // Uttarakhand (older code)
  HP: "hi", // Himachal Pradesh
  CH: "hi", // Chandigarh
};

// Remembers the visitor's own choice from the CC menu, which always wins over their location.
const SAVED_CHOICE = "onesky-video-captions";

export function saveCaptionChoice(lang: string | null) {
  try {
    localStorage.setItem(SAVED_CHOICE, lang ?? "off");
  } catch {}
}

// Returns the language to start with: their saved choice first, then their state, otherwise none.
export async function startingCaption(available: string[]): Promise<string | null> {
  let saved: string | null = null;
  try {
    saved = localStorage.getItem(SAVED_CHOICE);
  } catch {}
  if (saved) return available.includes(saved) ? saved : null;

  try {
    const response = await fetch("/api/region", { cache: "no-store" });
    if (!response.ok) return null;
    const { country, region } = (await response.json()) as { country: string; region: string };
    const lang = country === "IN" ? CAPTIONS_BY_STATE[region] : undefined;
    return lang && available.includes(lang) ? lang : null;
  } catch {
    return null;
  }
}
