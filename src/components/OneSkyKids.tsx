// Previous hero artwork (three children and the redrawn dog). Not currently used.
export default function OneSkyKids() {
  return (
    <svg className="kids" viewBox="0 0 640 400" role="img" aria-label="Three children and their puppy in a blue cap with a gold medal and backpack standing together on the hill. One child waves, one holds a tablet and one holds up a paper plane.">
        <defs>
          <radialGradient id="dogFur" cx="40%" cy="30%" r="80%"><stop offset="0" stopColor="#b98353"/><stop offset="1" stopColor="#95603a"/></radialGradient>
          <radialGradient id="skinA" cx="40%" cy="32%" r="75%"><stop offset="0" stopColor="#c98d55"/><stop offset="1" stopColor="#99602f"/></radialGradient>
          <radialGradient id="skinB" cx="40%" cy="32%" r="75%"><stop offset="0" stopColor="#a86e3d"/><stop offset="1" stopColor="#744521"/></radialGradient>
          <radialGradient id="skinC" cx="40%" cy="32%" r="75%"><stop offset="0" stopColor="#f3c78f"/><stop offset="1" stopColor="#d79a5c"/></radialGradient>
          <linearGradient id="pinafore" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8366f5"/><stop offset="1" stopColor="#5535d0"/></linearGradient>
          <linearGradient id="tee" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ff8a7a"/><stop offset="1" stopColor="#e65a4c"/></linearGradient>
          <linearGradient id="kurta" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffd65c"/><stop offset="1" stopColor="#f2ad1d"/></linearGradient>
        </defs>
    
        <g fill="#3c7d22" opacity=".28"><ellipse cx="72" cy="386" rx="78" ry="10"/><ellipse cx="248" cy="388" rx="72" ry="10"/><ellipse cx="400" cy="388" rx="76" ry="10"/><ellipse cx="546" cy="388" rx="60" ry="9"/></g>
    
        {/* Dog: bottom to top is arm, far leg, tail, body, medal, backpack, head, near leg */}
    <g className="dog-walk" transform="translate(84 0)"><g className="pup-bob">
      {/* Waving arm */}
      <g className="pup-arm"><path d="M-16 302 Q-50 304 -78 288" stroke="#a9744a" strokeWidth="19" strokeLinecap="round" fill="none"/><circle cx="-82" cy="284" r="16" fill="#b98353"/><path d="M-92 276 l3 5 M-84 271 l1 6 M-75 273 l-1 5" stroke="#7a4a2a" strokeWidth="2.5" strokeLinecap="round"/></g>
      {/* Far leg */}
      <g className="pup-leg pup-leg-b"><rect x="-26" y="334" width="22" height="40" rx="11" fill="#8f5a33"/><ellipse cx="-20" cy="376" rx="18" ry="9" fill="#a9744a"/><path d="M-28 374 v5 M-21 374 v6 M-14 374 v5" stroke="#7a4a2a" strokeWidth="2.5" strokeLinecap="round"/></g>
      {/* Tail */}
      <g className="pup-tail"><path d="M22 342 C48 350 68 340 74 318 C86 334 78 362 54 368 C40 372 26 366 18 358z" fill="#40241e"/></g>
      {/* Body */}
      <ellipse cx="0" cy="316" rx="37" ry="44" fill="url(#dogFur)"/><path d="M18 280 C40 298 42 336 22 354 C30 330 30 302 18 280z" fill="#7a4a2a" opacity=".35"/>
      <ellipse cx="-8" cy="330" rx="23" ry="27" fill="#d8b896"/>
      {/* Medal */}
      <path d="M-24 282 Q-4 298 18 284" stroke="#f4622d" strokeWidth="7" strokeLinecap="round" fill="none"/>
      <circle cx="-6" cy="300" r="12" fill="#ffc93c" stroke="#e39a12" strokeWidth="3"/><circle cx="-6" cy="300" r="5" fill="#fff0b3"/>
      {/* Backpack */}
      <rect x="14" y="292" width="34" height="52" rx="15" fill="#0f86d6"/><rect x="20" y="316" width="26" height="24" rx="9" fill="#0a68ad"/>
      <path d="M18 286 C26 304 24 326 14 344" stroke="#f4622d" strokeWidth="7" strokeLinecap="round" fill="none"/>
      {/* Head, turned towards the viewer's left */}
      <g className="pup-head"><g transform="rotate(-7 -6 210)">
        {/* Far ear */}
        <path d="M-66 168 C-92 176 -100 216 -86 246 C-78 258 -64 250 -62 234 C-60 214 -60 192 -54 178z" fill="#40241e"/>
        <ellipse cx="-8" cy="208" rx="68" ry="64" fill="url(#dogFur)"/>
        {/* Near ear */}
        <path d="M34 156 C76 150 104 194 96 252 C92 280 66 280 56 256 C48 232 42 200 26 178z" fill="#40241e"/>
        <path d="M56 176 C76 192 84 220 80 246" stroke="#6b4032" strokeWidth="6" strokeLinecap="round" fill="none"/>
        {/* Muzzle */}
        <ellipse cx="-26" cy="238" rx="36" ry="25" fill="#c9a07c"/>
        {/* Far eye */}
        <ellipse cx="-46" cy="198" rx="15" ry="22" fill="#fff"/><ellipse cx="-47" cy="200" rx="11" ry="17" fill="#2b160c"/><circle cx="-51" cy="192" r="5" fill="#fff"/><circle cx="-43" cy="208" r="2.4" fill="#fff"/>
        {/* Near eye and its wink */}
        <g className="pup-eye"><ellipse cx="4" cy="198" rx="20" ry="25" fill="#fff"/><ellipse cx="2" cy="200" rx="15" ry="20" fill="#2b160c"/><circle cx="-4" cy="191" r="6.5" fill="#fff"/><circle cx="8" cy="209" r="3" fill="#fff"/></g>
        <path className="pup-wink" d="M-16 202 Q4 186 24 202" stroke="#40241e" strokeWidth="6" strokeLinecap="round" fill="none"/>
        <circle cx="-68" cy="228" r="8" fill="#ff7a6b" opacity=".35"/><circle cx="24" cy="236" r="11" fill="#ff7a6b" opacity=".35"/>
        {/* Nose and mouth */}
        <ellipse cx="-34" cy="226" rx="10" ry="7" fill="#40241e"/><ellipse cx="-37" cy="224" rx="3" ry="2" fill="#fff" opacity=".8"/>
        <path d="M-54 238 Q-26 282 6 236 Q-24 246 -54 238z" fill="#3a1414"/><path d="M-41 254 q15 19 31 0 q-15 -8 -31 0z" fill="#e0342f"/>
        {/* Cap */}
        <path d="M-58 168 C-58 112 -16 92 22 100 C58 108 76 142 68 182 C36 152 -22 148 -58 168z" fill="#0f86d6"/>
        <path d="M38 114 C60 128 74 154 68 182 C58 170 46 162 34 158z" fill="#0a68ad"/>
        <path d="M-58 168 C-22 148 36 152 68 182 C32 168 -6 168 -40 178 C-64 188 -96 186 -106 170 C-98 154 -72 156 -58 168z" fill="#f4622d"/>
        <path d="M-60 168 C-74 156 -98 154 -106 170 C-96 184 -74 186 -52 180z" fill="#b5261d"/>
        <g transform="rotate(24 10 128)" fill="#fff"><rect x="-10" y="123" width="40" height="10" rx="4"/><circle cx="-11" cy="123" r="6.5"/><circle cx="-11" cy="133" r="6.5"/><circle cx="31" cy="123" r="6.5"/><circle cx="31" cy="133" r="6.5"/></g>
      </g></g>
      {/* Near leg */}
      <g className="pup-leg pup-leg-a"><rect x="2" y="336" width="24" height="40" rx="12" fill="#a9744a"/><ellipse cx="12" cy="377" rx="19" ry="9" fill="#b98353"/><path d="M6 375 v5 M13 375 v6 M20 375 v5" stroke="#7a4a2a" strokeWidth="2.5" strokeLinecap="round"/></g>
      {/* Second arm, holding the backpack strap */}
      <path d="M26 288 Q46 308 24 326" stroke="#a9744a" strokeWidth="18" strokeLinecap="round" fill="none"/><circle cx="21" cy="329" r="13.5" fill="#b98353"/><path d="M13 333 l3 4 M20 336 l1 4 M27 334 l-1 4" stroke="#7a4a2a" strokeWidth="2.5" strokeLinecap="round"/>
    </g></g>

    {/* Girl waving, school pinafore, two plaits */}
        <g transform="translate(248 386)">
          <g fill="#1d1a2e"><rect x="-70" y="-240" width="24" height="96" rx="12"/><rect x="46" y="-240" width="24" height="96" rx="12"/></g>
          <circle cx="-58" cy="-146" r="9" fill="#ff5f7a"/><circle cx="58" cy="-146" r="9" fill="#ff5f7a"/>
          <path d="M-18 -70 V-16 M18 -70 V-16" stroke="#a86e3d" strokeWidth="20" strokeLinecap="round"/>
          <path d="M-18 -38 V-16 M18 -38 V-16" stroke="#fff" strokeWidth="21"/>
          <path d="M-34 -6 q0 -14 16 -14 h8 v20 h-24z M34 -6 q0 -14 -16 -14 h-8 v20 h24z" fill="#1d1a2e"/>
          <path d="M38 -152 L58 -108 L26 -94" stroke="url(#skinA)" strokeWidth="19" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <path d="M-36 -168 Q0 -184 36 -168 L44 -128 L-44 -128z" fill="#fff"/>
          <path d="M-40 -150 L40 -150 L56 -58 Q0 -44 -56 -58z" fill="url(#pinafore)"/>
          <path d="M-26 -170 V-146 M26 -170 V-146" stroke="#5535d0" strokeWidth="10"/>
          <g transform="rotate(-8 24 -106)"><rect x="2" y="-128" width="46" height="38" rx="4" fill="#ff8a7a"/><rect x="8" y="-122" width="34" height="5" rx="2" fill="#fff"/></g>
          <circle cx="28" cy="-94" r="11" fill="#b67b45"/>
          <rect x="-10" y="-186" width="20" height="24" rx="8" fill="#99602f"/>
          <circle cx="-58" cy="-228" r="11" fill="#b67b45"/><circle cx="58" cy="-228" r="11" fill="#b67b45"/>
          <circle cy="-232" r="58" fill="url(#skinA)"/>
          <path d="M-60 -226 C-66 -304 66 -304 60 -226 C44 -262 18 -272 0 -264 C-18 -272 -44 -262 -60 -226z" fill="#1d1a2e"/>
          <g className="mascot-blink"><ellipse cx="-22" cy="-228" rx="15" ry="18" fill="#fff"/><ellipse cx="22" cy="-228" rx="15" ry="18" fill="#fff"/><circle cx="-24" cy="-226" r="12" fill="#2b1a10"/><circle cx="20" cy="-226" r="12" fill="#2b1a10"/><circle cx="-28" cy="-231" r="4.5" fill="#fff"/><circle cx="16" cy="-231" r="4.5" fill="#fff"/></g>
          <circle cx="-38" cy="-204" r="9" fill="#ff7a6b" opacity=".45"/><circle cx="38" cy="-204" r="9" fill="#ff7a6b" opacity=".45"/>
          <path d="M-16 -202 Q0 -182 16 -202z" fill="#8c1f2b"/><path d="M-8 -194 Q0 -187 8 -194 Q0 -198 -8 -194z" fill="#ff8a95"/>
          <g className="art-wave"><path d="M-40 -152 L-76 -222" stroke="url(#skinA)" strokeWidth="19" strokeLinecap="round" fill="none"/><circle cx="-78" cy="-228" r="14" fill="#b67b45"/></g>
          <path d="M-36 -166 L-46 -150" stroke="#fff" strokeWidth="24" strokeLinecap="round"/>
        </g>
    
        {/* Boy with glasses and a tablet */}
        <g transform="translate(400 386) scale(1.04)">
          <path d="M-18 -74 V-16 M18 -74 V-16" stroke="#744521" strokeWidth="20" strokeLinecap="round"/>
          <path d="M-42 -96 H42 L38 -50 H-38z" fill="#27235c"/>
          <path d="M-34 -6 q0 -14 16 -14 h8 v20 h-24z M34 -6 q0 -14 -16 -14 h-8 v20 h24z" fill="#fff"/><path d="M-34 -6 h24 v6 h-24z M10 -6 h24 v6 h-24z" fill="#14a89a"/>
          <path d="M-40 -172 Q0 -186 40 -172 L46 -88 Q0 -78 -46 -88z" fill="url(#tee)"/>
          <rect x="-10" y="-188" width="20" height="24" rx="8" fill="#744521"/>
          <circle cx="-58" cy="-228" r="11" fill="#8a5429"/><circle cx="58" cy="-228" r="11" fill="#8a5429"/>
          <circle cy="-232" r="58" fill="url(#skinB)"/>
          <g fill="#14101f"><circle cx="-44" cy="-270" r="20"/><circle cx="-20" cy="-286" r="22"/><circle cx="10" cy="-290" r="22"/><circle cx="38" cy="-276" r="20"/><circle cx="54" cy="-254" r="14"/><circle cx="-56" cy="-250" r="14"/></g>
          <g className="mascot-blink"><ellipse cx="-22" cy="-228" rx="14" ry="16" fill="#fff"/><ellipse cx="22" cy="-228" rx="14" ry="16" fill="#fff"/><circle cx="-24" cy="-226" r="10.5" fill="#1a0f08"/><circle cx="20" cy="-226" r="10.5" fill="#1a0f08"/><circle cx="-28" cy="-230" r="4" fill="#fff"/><circle cx="16" cy="-230" r="4" fill="#fff"/></g>
          <g fill="none" stroke="#ffc93c" strokeWidth="5"><circle cx="-22" cy="-228" r="21"/><circle cx="22" cy="-228" r="21"/><path d="M-1 -230 q1 -3 2 0"/></g>
          <path d="M-18 -198 Q0 -180 18 -198" stroke="#2b120a" strokeWidth="5" fill="none" strokeLinecap="round"/>
          <rect x="-40" y="-152" width="80" height="60" rx="8" fill="#1d1a4a"/><rect x="-34" y="-146" width="68" height="48" rx="4" fill="#8fe0ff"/>
          <path d="M0 -136 Q2 -124 14 -122 Q2 -120 0 -108 Q-2 -120 -14 -122 Q-2 -124 0 -136z" fill="#fff"/>
          <path d="M-44 -158 L-54 -112 L-36 -100 M44 -158 L54 -112 L36 -100" stroke="#8a5429" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <path d="M-40 -164 L-48 -142 M40 -164 L48 -142" stroke="#ff8a7a" strokeWidth="22" strokeLinecap="round"/>
        </g>
    
        {/* Younger child in a kurta with a paper plane */}
        <g transform="translate(546 386) scale(.84)">
          <path d="M-16 -70 V-16 M16 -70 V-16" stroke="#14a89a" strokeWidth="20" strokeLinecap="round"/>
          <path d="M-32 -6 q0 -14 16 -14 h8 v20 h-24z M32 -6 q0 -14 -16 -14 h-8 v20 h24z" fill="#ff5f7a"/>
          <path d="M-40 -152 L-58 -102" stroke="#d79a5c" strokeWidth="18" strokeLinecap="round"/>
          <path d="M-38 -172 Q0 -184 38 -172 L52 -54 Q0 -42 -52 -54z" fill="url(#kurta)"/>
          <path d="M0 -176 V-118" stroke="#d98a0f" strokeWidth="4"/><g fill="#d98a0f"><circle cx="8" cy="-152" r="2.5"/><circle cx="8" cy="-136" r="2.5"/></g>
          <rect x="-10" y="-188" width="20" height="24" rx="8" fill="#d79a5c"/>
          <circle cx="-58" cy="-228" r="11" fill="#e5ad6d"/><circle cx="58" cy="-228" r="11" fill="#e5ad6d"/>
          <circle cy="-232" r="58" fill="url(#skinC)"/>
          <circle cy="-302" r="20" fill="#3b2415"/>
          <path d="M-60 -226 C-66 -304 66 -304 60 -226 C50 -258 24 -276 -8 -272 C-30 -270 -50 -254 -60 -226z" fill="#3b2415"/>
          <g className="mascot-blink"><ellipse cx="-22" cy="-226" rx="16" ry="19" fill="#fff"/><ellipse cx="22" cy="-226" rx="16" ry="19" fill="#fff"/><circle cx="-24" cy="-224" r="13" fill="#2b1a10"/><circle cx="20" cy="-224" r="13" fill="#2b1a10"/><circle cx="-28" cy="-230" r="5" fill="#fff"/><circle cx="16" cy="-230" r="5" fill="#fff"/></g>
          <circle cx="-38" cy="-200" r="10" fill="#ff7a6b" opacity=".45"/><circle cx="38" cy="-200" r="10" fill="#ff7a6b" opacity=".45"/>
          <path d="M-14 -198 Q0 -180 14 -198z" fill="#8c1f2b"/>
          <path d="M38 -156 L78 -206" stroke="#d79a5c" strokeWidth="18" strokeLinecap="round"/>
          <path d="M36 -168 L52 -148" stroke="#ffd65c" strokeWidth="22" strokeLinecap="round"/>
          <circle cx="80" cy="-210" r="13" fill="#e5ad6d"/>
          <path d="M64 -224 L132 -266 L98 -204 L88 -222z" fill="#fff"/><path d="M88 -222 L132 -266 L92 -212z" fill="#cfe8ff"/>
        </g>
      </svg>
  );
}
