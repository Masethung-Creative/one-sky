// Flying gear for the crew, as SVG markup. The owl and bluebird show it through React; the kids and Coco get it inside their running animation.

type Eye = [number, number];

// Round lenses over both eyes on a brown strap. The eyes stay visible through the glass.
export function goggles(left: Eye, right: Eye, r: number, reach: number) {
  const [lx, ly] = left;
  const [rx, ry] = right;
  const lens = (x: number, y: number) =>
    `<circle cx="${x}" cy="${y}" r="${r}" fill="#cdeeff" fill-opacity=".22" stroke="#6f4420" stroke-width="${r * 0.36}"/>` +
    `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#e8b23a" stroke-width="${r * 0.2}"/>` +
    `<path d="M${x - r * 0.62} ${y - r * 0.2} A${r * 0.66} ${r * 0.66} 0 0 1 ${x - r * 0.1} ${y - r * 0.66}" fill="none" stroke="#fff" stroke-opacity=".85" stroke-width="${r * 0.12}" stroke-linecap="round"/>`;
  return (
    `<path d="M${lx - r} ${ly} L${-reach} ${ly - r * 0.15} M${rx + r} ${ry} L${reach} ${ry - r * 0.15}" stroke="#6f4420" stroke-width="${r * 0.42}" stroke-linecap="round" fill="none"/>` +
    `<path d="M${lx + r} ${ly} Q${(lx + rx) / 2} ${(ly + ry) / 2 - r * 0.3} ${rx - r} ${ry}" stroke="#6f4420" stroke-width="${r * 0.3}" fill="none"/>` +
    lens(lx, ly) +
    lens(rx, ry)
  );
}

// A leather flying helmet: dome, ear flaps and chin strap.
export function helmet(top: number, brow: number, width: number, chin: number) {
  const edge = brow + width * 0.25;
  const pull = (top - 0.25 * edge) / 0.75;
  const flap = width * 0.34;
  return (
    `<path d="M${-width} ${brow} H${-width + flap} V${chin - flap * 0.5} Q${-width + flap} ${chin} ${-width + flap * 0.5} ${chin} Q${-width} ${chin} ${-width} ${chin - flap * 0.5} Z" fill="#6f4420"/>` +
    `<path d="M${width} ${brow} H${width - flap} V${chin - flap * 0.5} Q${width - flap} ${chin} ${width - flap * 0.5} ${chin} Q${width} ${chin} ${width} ${chin - flap * 0.5} Z" fill="#6f4420"/>` +
    `<path d="M${-width + flap * 0.5} ${chin - flap * 0.2} Q0 ${chin + flap * 0.9} ${width - flap * 0.5} ${chin - flap * 0.2}" fill="none" stroke="#5a3519" stroke-width="${flap * 0.36}" stroke-linecap="round"/>` +
    `<path d="M${-width} ${edge} C${-width - 6} ${pull} ${width + 6} ${pull} ${width} ${edge} Q0 ${brow - width * 0.34} ${-width} ${edge} Z" fill="#8b5a2b"/>` +
    `<path d="M0 ${top} Q${width * 0.04} ${(top + brow) / 2} 0 ${brow - width * 0.08}" fill="none" stroke="#6f4420" stroke-width="${flap * 0.12}"/>` +
    `<path d="M${-width * 0.62} ${(top + brow) / 2} Q${-width * 0.42} ${top + (brow - top) * 0.12} ${-width * 0.12} ${top + (brow - top) * 0.1}" fill="none" stroke="#b98250" stroke-width="${flap * 0.2}" stroke-linecap="round"/>`
  );
}

// Emma keeps her heart and wings clip, pinned to the side of the helmet.
function hairClip(x: number, y: number) {
  return (
    `<g transform="translate(${x} ${y}) rotate(-24)">` +
    `<path d="M0 0 C-14 -30 -44 -26 -36 -4 C-32 8 -12 8 0 0 C12 8 32 8 36 -4 C44 -26 14 -30 0 0 Z" fill="#ffc93c" stroke="#f2a51d" stroke-width="3"/>` +
    `<path d="M0 14 C-22 -2 -14 -18 0 -8 C14 -18 22 -2 0 14 Z" fill="#3b8df0" stroke="#fff" stroke-width="3"/>` +
    `</g>`
  );
}

// Wrapped round the neck, with the loose end blowing back. The end is two joints, so it bends in the wind.
export function muffler(cx: number, y: number, width: number, height: number, color: string, dark: string) {
  const knot = cx + width * 0.5;
  const first = height * 2;
  const second = height * 1.8;
  const half = height * 0.42;
  const stripes = (from: number, to: number) => `<path d="M${from} ${-half} V${half} M${to} ${-half} V${half}" stroke="#fff" stroke-opacity=".55" stroke-width="${height * 0.14}"/>`;
  return (
    `<g transform="translate(${knot} ${y + height * 0.5})"><g class="crew-scarf-a">` +
    `<path d="M0 ${-half} L${first} ${-half * 0.9} Q${first + height * 0.1} 0 ${first} ${half * 0.9} L0 ${half} Z" fill="${color}"/>` +
    stripes(first * 0.45, first * 0.7) +
    `<g transform="translate(${first * 0.96} 0)"><g class="crew-scarf-b">` +
    `<path d="M0 ${-half * 0.9} L${second} ${-half * 0.8} L${second + height * 0.28} ${-half * 0.4} L${second} 0 L${second + height * 0.28} ${half * 0.4} L${second} ${half * 0.8} L0 ${half * 0.9} Z" fill="${color}"/>` +
    stripes(second * 0.3, second * 0.55) +
    `</g></g></g></g>` +
    `<path d="M${cx - width} ${y + height * 0.14} Q${cx} ${y - height * 0.34} ${cx + width} ${y + height * 0.14} Q${cx + width * 1.08} ${y + height * 0.6} ${cx + width} ${y + height * 0.92} Q${cx} ${y + height * 1.4} ${cx - width} ${y + height * 0.92} Q${cx - width * 1.08} ${y + height * 0.6} ${cx - width} ${y + height * 0.14} Z" fill="${color}"/>` +
    `<path d="M${cx - width * 0.92} ${y + height * 0.52} Q${cx} ${y + height * 0.98} ${cx + width * 0.92} ${y + height * 0.52}" fill="none" stroke="${dark}" stroke-width="${height * 0.09}"/>` +
    `<ellipse cx="${knot}" cy="${y + height * 0.5}" rx="${height * 0.42}" ry="${height * 0.52}" fill="${dark}"/>`
  );
}

// Drawn in the coordinates of each character's head; the muffler's origin is the point the head pivots on, at the chin.
export const CREW_GEAR: Record<string, { face: string; neck: string; without?: string }> = {
  LEO: {
    face: helmet(-168, -20, 128, 104) + goggles([-56, 33], [57, 31], 44, 116),
    neck: muffler(0, -8, 74, 42, "#f4622d", "#c94815"),
  },
  DAVID: {
    face: helmet(-168, -20, 128, 104) + goggles([-54, 34], [56, 23], 44, 116),
    neck: muffler(0, -8, 74, 42, "#ffc93c", "#e3a10f"),
  },
  EMMA: {
    face: helmet(-168, -22, 128, 104) + hairClip(-74, -62) + goggles([-57, 25], [57, 36], 46, 116),
    neck: muffler(0, -6, 74, 42, "#3fd4a0", "#1fa67c"),
  },
  COCO: {
    face: helmet(-150, -44, 116, 96) + goggles([-52, 2], [47, 11], 44, 104),
    neck: muffler(0, -6, 78, 42, "#2f8af0", "#1a63cf"),
    without: "HAT_COCO",
  },
};

// The owl and bluebird, in the coordinates of the mascot picture.
export const OWL_GEAR =
  muffler(280, 268, 124, 46, "#e5484d", "#b5261d") +
  `<g transform="translate(280 0)">${helmet(26, 96, 134, 248) + goggles([-55, 158], [55, 158], 54, 126)}</g>`;

export const BIRD_GEAR =
  muffler(76, 346, 50, 18, "#ffc93c", "#e3a10f") +
  `<g transform="translate(70 314)">${goggles([-16, 0], [18, 0], 15, 40)}</g>`;
