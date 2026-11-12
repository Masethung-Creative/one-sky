// The owl and bluebird, drawn once so the hero and the flight show the same characters. Each place using them passes its own prefix for the gradient ids.
export function MascotBird({ prefix = "" }: { prefix?: string }) {
  return (
    <>
      <defs>
        <radialGradient id={`${prefix}birdBody`} cx="40%" cy="32%" r="75%"><stop offset="0" stopColor="#6fd0ff"/><stop offset="1" stopColor="#1668c9"/></radialGradient>
      </defs>
        <g transform="translate(76 322)">
          <path d="M-14 50 v14 m-8 0 h16 M14 50 v14 m-8 0 h16" stroke="#f39a1e" strokeWidth="5" strokeLinecap="round" fill="none"/>
          <path d="M44 6 L72 -8 L66 12 L74 22 L44 28z" fill="#0f4fa8"/>
          <ellipse cx="0" cy="10" rx="50" ry="46" fill={`url(#${prefix}birdBody)`}/>
          <ellipse cx="-6" cy="28" rx="30" ry="26" fill="#fff4dc"/>
          <path d="M22 2 C50 4 54 34 30 42 C22 30 18 16 22 2z" fill="#0f58b6"/>
          <circle cx="-22" cy="-8" r="15" fill="#fff"/><circle cx="12" cy="-8" r="15" fill="#fff"/>
          <g className="mascot-blink"><circle cx="-24" cy="-8" r="10" fill="#14183a"/><circle cx="10" cy="-8" r="10" fill="#14183a"/><circle cx="-28" cy="-12" r="3.6" fill="#fff"/><circle cx="6" cy="-12" r="3.6" fill="#fff"/></g>
          <path d="M-17 4 L-5 2 L-10 14z" fill="#ffc93c"/>
          <circle cx="-34" cy="8" r="6" fill="#ff8a7a" opacity=".6"/>
          <path d="M-4 -35 q6 -14 16 -10 q-6 4 -6 12z" fill="#0f58b6"/>
        </g>
    </>
  );
}

export function MascotOwl({ prefix = "", cap = true }: { prefix?: string; cap?: boolean }) {
  return (
    <>
      <defs>
        <radialGradient id={`${prefix}owlBody`} cx="42%" cy="34%" r="72%"><stop offset="0" stopColor="#ffb65e"/><stop offset=".65" stopColor="#f58a2e"/><stop offset="1" stopColor="#c9601a"/></radialGradient>
        <radialGradient id={`${prefix}owlBelly`} cx="45%" cy="35%" r="70%"><stop offset="0" stopColor="#fff6e2"/><stop offset="1" stopColor="#ffd9a0"/></radialGradient>
        <linearGradient id={`${prefix}owlWing`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e8741f"/><stop offset="1" stopColor="#b9500f"/></linearGradient>
        <radialGradient id={`${prefix}owlEye`} cx="50%" cy="40%" r="60%"><stop offset="0" stopColor="#3b6fd8"/><stop offset=".55" stopColor="#1c2f78"/><stop offset="1" stopColor="#0d1438"/></radialGradient>
      </defs>
        <g transform="translate(100 0)">
          {/* Backpack */}
          <rect x="248" y="196" width="58" height="104" rx="22" fill="#6a48e8"/>
          <rect x="264" y="240" width="42" height="42" rx="12" fill="#ffc93c"/>
          {/* Feet */}
          <g fill="#f4a51c"><ellipse cx="136" cy="374" rx="34" ry="13"/><ellipse cx="228" cy="374" rx="34" ry="13"/></g>
          <path d="M116 374 v9 M136 376 v9 M156 374 v9 M208 374 v9 M228 376 v9 M248 374 v9" stroke="#c97c0d" strokeWidth="4" strokeLinecap="round"/>
          {/* Tufts */}
          <path d="M72 92 L46 34 L120 68z" fill="#d96d1f"/><path d="M288 92 L314 34 L240 68z" fill="#d96d1f"/>
          {/* Body */}
          <path d="M180 48 C266 48 306 118 306 206 C306 304 258 370 180 370 C102 370 54 304 54 206 C54 118 94 48 180 48z" fill={`url(#${prefix}owlBody)`}/>
          {/* Belly */}
          <ellipse cx="180" cy="290" rx="82" ry="80" fill={`url(#${prefix}owlBelly)`}/>
          <path transform="translate(8 0)" d="M124 260 q14 16 28 0 M166 260 q14 16 28 0 M208 260 q10 12 22 2 M102 296 q14 16 28 0 M144 296 q14 16 28 0 M186 296 q14 16 28 0 M128 332 q14 14 28 0 M170 332 q14 14 28 0" stroke="#eba85a" strokeWidth="5" fill="none" strokeLinecap="round"/>
          {/* Strap and pin */}
          <clipPath id={`${prefix}owlBodyClip`}><path d="M180 48 C266 48 306 118 306 206 C306 304 258 370 180 370 C102 370 54 304 54 206 C54 118 94 48 180 48z"/></clipPath>
          <path d="M286 174 C246 230 222 250 186 384" stroke="#6a48e8" strokeWidth="18" fill="none" clipPath={`url(#${prefix}owlBodyClip)`}/>
          <path transform="translate(-11 0)" d="M244 234 l5 11 12 1 -9 8 3 12 -11 -6 -11 6 3 -12 -9 -8 12 -1z" fill="#ffc93c" stroke="#fff" strokeWidth="2.5" strokeLinejoin="round"/>
          {/* Lower wing */}
          <path d="M288 196 C330 226 328 296 290 322 C282 306 268 288 266 256 C264 230 272 208 288 196z" fill={`url(#${prefix}owlWing)`}/>
          {/* Face */}
          <g transform="translate(9 0)">
          <circle cx="116" cy="158" r="66" fill="#ffe7bf"/><circle cx="226" cy="158" r="66" fill="#ffe7bf"/>
          <circle cx="116" cy="158" r="52" fill="#fff"/><circle cx="226" cy="158" r="52" fill="#fff"/>
          <g className="mascot-blink">
            <circle cx="106" cy="160" r="36" fill={`url(#${prefix}owlEye)`}/><circle cx="216" cy="160" r="36" fill={`url(#${prefix}owlEye)`}/>
            <circle cx="92" cy="144" r="13" fill="#fff"/><circle cx="202" cy="144" r="13" fill="#fff"/>
            <circle cx="118" cy="174" r="6" fill="#fff" opacity=".85"/><circle cx="228" cy="174" r="6" fill="#fff" opacity=".85"/>
          </g>
          <circle cx="83" cy="210" r="15" fill="#ff7a6b" opacity=".5"/><circle cx="259" cy="210" r="15" fill="#ff7a6b" opacity=".5"/>
          {/* Beak */}
          <path d="M142 208 Q168 268 196 208 Q168 222 142 208z" fill="#e0453a"/>
          <path d="M156 228 Q168 252 182 228 Q168 222 156 228z" fill="#ff8a7a"/>
          <path d="M136 200 Q168 180 202 200 Q186 224 168 226 Q150 224 136 200z" fill="#ffc93c"/>
          <path d="M150 200 Q168 190 188 200" stroke="#fff3bf" strokeWidth="5" fill="none" strokeLinecap="round"/>
          </g>
          {cap && (
          <>
          {/* Graduation cap */}
          <path d="M100 70 Q180 112 262 70 L258 34 Q180 58 104 34z" fill="#27235c"/>
          <path d="M180 -6 L314 40 L180 88 L46 40z" fill="#3b3580"/>
          <path d="M46 40 L180 88 L314 40 L180 96z" fill="#1d1a4a"/>
          <circle cx="180" cy="40" r="7" fill="#ffc93c"/>
          <path d="M180 40 L94 52 L92 88" stroke="#ffc93c" strokeWidth="5" fill="none" strokeLinecap="round"/>
          <path d="M84 88 h16 l4 24 h-24z" fill="#ffc93c"/>
          </>
          )}
          {/* Waving wing */}
          <g className="art-wave"><path transform="translate(-16 6)" d="M62 212 C24 192 -6 150 -2 96 C14 90 26 102 26 102 C30 90 44 92 50 106 C58 100 68 108 68 122 C76 150 84 188 88 214 C80 226 70 222 62 212z" fill={`url(#${prefix}owlWing)`}/></g>
        </g>
    </>
  );
}
