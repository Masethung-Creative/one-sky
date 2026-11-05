import Fireflies from "./Fireflies";
import HeroCharacters from "./HeroCharacters";
import HeroCourseScene from "./HeroCourseScene";
import { MascotBird, MascotOwl } from "./Mascots";
import OneSkySections from "./OneSkySections";

export default function OneSkyHero() {
  return (
    <>
        <main>
    <HeroCourseScene>
    <section className="hero" aria-labelledby="hero-title">
      <span className="night-sky" aria-hidden="true" />
      <span className="night-stars" aria-hidden="true" />
      <span className="shooting-star shooting-star-a" aria-hidden="true" />
      <span className="shooting-star shooting-star-b" aria-hidden="true" />
      <span className="shooting-star shooting-star-c" aria-hidden="true" />
      <svg className="cloud cloud-a" viewBox="0 0 120 56" aria-hidden="true"><path d="M4 56 a20 20 0 0 1 32 -16 a30 30 0 0 1 56 2 a16 16 0 0 1 24 14z"/></svg>
      <svg className="cloud cloud-b" viewBox="0 0 120 56" aria-hidden="true"><path d="M4 56 a20 20 0 0 1 32 -16 a30 30 0 0 1 56 2 a16 16 0 0 1 24 14z"/></svg>
    
      <svg className="sparkle s1" viewBox="-10 -10 20 20" aria-hidden="true"><path d="M.557 -7.757 Q2.343 -2.343 7.757 -.557 Q10 0 7.757 .557 Q2.343 2.343 .557 7.757 Q0 10 -.557 7.757 Q-2.343 2.343 -7.757 .557 Q-10 0 -7.757 -.557 Q-2.343 -2.343 -.557 -7.757 Q0 -10 .557 -7.757z"/></svg>
      <svg className="sparkle s2" viewBox="-10 -10 20 20" aria-hidden="true"><path d="M.557 -7.757 Q2.343 -2.343 7.757 -.557 Q10 0 7.757 .557 Q2.343 2.343 .557 7.757 Q0 10 -.557 7.757 Q-2.343 2.343 -7.757 .557 Q-10 0 -7.757 -.557 Q-2.343 -2.343 -.557 -7.757 Q0 -10 .557 -7.757z"/></svg>
      <svg className="sparkle s3" viewBox="-10 -10 20 20" aria-hidden="true"><path d="M.557 -7.757 Q2.343 -2.343 7.757 -.557 Q10 0 7.757 .557 Q2.343 2.343 .557 7.757 Q0 10 -.557 7.757 Q-2.343 2.343 -7.757 .557 Q-10 0 -7.757 -.557 Q-2.343 -2.343 -.557 -7.757 Q0 -10 .557 -7.757z"/></svg>
      <svg className="sparkle s4" viewBox="-10 -10 20 20" aria-hidden="true"><path d="M.557 -7.757 Q2.343 -2.343 7.757 -.557 Q10 0 7.757 .557 Q2.343 2.343 .557 7.757 Q0 10 -.557 7.757 Q-2.343 2.343 -7.757 .557 Q-10 0 -7.757 -.557 Q-2.343 -2.343 -.557 -7.757 Q0 -10 .557 -7.757z"/></svg>
      <svg className="sparkle s5" viewBox="-10 -10 20 20" aria-hidden="true"><path d="M.557 -7.757 Q2.343 -2.343 7.757 -.557 Q10 0 7.757 .557 Q2.343 2.343 .557 7.757 Q0 10 -.557 7.757 Q-2.343 2.343 -7.757 .557 Q-10 0 -7.757 -.557 Q-2.343 -2.343 -.557 -7.757 Q0 -10 .557 -7.757z"/></svg>
      <svg className="sparkle s6" viewBox="-10 -10 20 20" aria-hidden="true"><path d="M.557 -7.757 Q2.343 -2.343 7.757 -.557 Q10 0 7.757 .557 Q2.343 2.343 .557 7.757 Q0 10 -.557 7.757 Q-2.343 2.343 -7.757 .557 Q-10 0 -7.757 -.557 Q-2.343 -2.343 -.557 -7.757 Q0 -10 .557 -7.757z"/></svg>
    
      <div className="plane" aria-hidden="true">
        <svg viewBox="104 0 196 110">
          <defs><linearGradient id="plane-beam" x1="0" x2="1"><stop offset="0" stopColor="#fff6c4" stopOpacity=".85"/><stop offset="1" stopColor="#fff6c4" stopOpacity="0"/></linearGradient></defs>
          <g className="plane-bob">
            <path className="plane-light" d="M286 50 L420 24 L420 92 L286 58z" fill="url(#plane-beam)"/>
            <path d="M124 58 L110 22 Q109 15 118 17 L152 46z" fill="#3fd4a0"/>
            <path d="M112 54 L150 50 L150 60 L116 62z" fill="#ffc93c"/>
            <circle cx="190" cy="32" r="14" fill="#f58a2e"/>
            <circle cx="185" cy="30" r="6" fill="#fff"/><circle cx="197" cy="30" r="6" fill="#fff"/>
            <circle cx="186" cy="30" r="3.4" fill="#14183a"/><circle cx="198" cy="30" r="3.4" fill="#14183a"/>
            <path d="M188 35 L194 35 L191 40z" fill="#ffc93c"/>
            <path d="M172 24 L190 15 L208 24 L190 31z" fill="#27235c"/>
            <path d="M204 24 H250 M212 24 V76 M240 24 V76" stroke="#27235c" strokeWidth="3"/>
            <path d="M125 52 C160 36 235 32 268 44 Q282 52 270 64 C235 84 165 80 125 60z" fill="#ff6f5e"/>
            <path d="M125 60 C165 66 235 66 276 56 Q276 60 270 64 C235 84 165 80 125 60z" fill="#e0483a"/>
            <circle cx="240" cy="50" r="8" fill="#cfe8ff" stroke="#fff" strokeWidth="3"/>
            <path d="M150 52 l2 4 4 .5 -3 3 1 4 -4 -2 -4 2 1 -4 -3 -3 4 -.5z" fill="#ffc93c"/>
            <rect x="196" y="14" width="72" height="11" rx="5.5" fill="#ffc93c"/>
            <rect x="192" y="72" width="66" height="11" rx="5.5" fill="#f2ad1d"/>
            <ellipse className="prop" cx="284" cy="54" rx="4" ry="30" fill="#27235c" opacity=".75"/>
            <circle cx="282" cy="54" r="6" fill="#ffc93c"/>
            <g className="plane-light">
              <circle cx="240" cy="50" r="6" fill="#fff3a8"/>
              <circle cx="240" cy="50" r="13" fill="#fff3a8" opacity=".35"/>
              <circle cx="282" cy="54" r="7" fill="#fffbe0"/>
              <circle className="plane-blink" cx="264" cy="19" r="4.5" fill="#6dff9a"/>
              <circle className="plane-blink plane-blink-late" cx="254" cy="78" r="4.5" fill="#ff5a5a"/>
              <circle className="plane-blink" cx="113" cy="20" r="4.5" fill="#fff"/>
            </g>
          </g>
        </svg>
      </div>
    
      <svg className="rainbow" viewBox="0 0 213 107" aria-hidden="true">
        <g fill="none" strokeWidth="13">
          <path d="M6.5 107 A100 100 0 0 1 206.5 107" stroke="#ff6f61"/>
          <path d="M19 107 A87.5 87.5 0 0 1 194 107" stroke="#ffa24c"/>
          <path d="M31.5 107 A75 75 0 0 1 181.5 107" stroke="#ffdc5e"/>
          <path d="M44 107 A62.5 62.5 0 0 1 169 107" stroke="#5fd068"/>
          <path d="M56.5 107 A50 50 0 0 1 156.5 107" stroke="#4fc3f7"/>
          <path d="M69 107 A37.5 37.5 0 0 1 144 107" stroke="#9b6bf2"/>
        </g>
      </svg>
    
      <svg className="ground" viewBox="0 0 1440 330" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        {/* Village and city, small, behind the trees */}
        <g transform="translate(510 188)"><rect x="-22" y="-26" width="44" height="30" rx="3" fill="#e9b07a"/><path d="M-30 -24 L0 -50 L30 -24z" fill="#c9783f"/><rect x="-6" y="-14" width="12" height="18" rx="2" fill="#8a4f24"/></g>
        <g transform="translate(830 172)"><rect x="-44" y="-32" width="26" height="42" rx="4" fill="#7b5cff"/><rect x="-14" y="-48" width="28" height="58" rx="4" fill="#0c5fc0"/><rect x="18" y="-26" width="24" height="36" rx="4" fill="#ff8a7a"/><g fill="#fff6d6"><rect x="-38" y="-25" width="5" height="6" rx="1.5"/><rect x="-28" y="-25" width="5" height="6" rx="1.5"/><rect x="-8" y="-40" width="5" height="6" rx="1.5"/><rect x="3" y="-40" width="5" height="6" rx="1.5"/><rect x="-8" y="-28" width="5" height="6" rx="1.5"/><rect x="3" y="-28" width="5" height="6" rx="1.5"/><rect x="24" y="-19" width="5" height="6" rx="1.5"/><rect x="33" y="-19" width="5" height="6" rx="1.5"/></g></g>
    
        {/* Treeline */}
        <g fill="#57a845">
          <path d="M200 150 L365 225 L700 180 L925 195 L1205 85 L1440 50 L1440 330 L200 330z"/>
          <circle cx="232" cy="150" r="26"/><circle cx="277" cy="176" r="24"/><circle cx="322" cy="196" r="26"/><circle cx="367" cy="222" r="22"/><circle cx="412" cy="226" r="28"/><circle cx="457" cy="213" r="24"/><circle cx="502" cy="206" r="30"/><circle cx="550" cy="200" r="22"/><circle cx="597" cy="191" r="26"/><circle cx="646" cy="181" r="22"/><circle cx="691" cy="179" r="30"/><circle cx="739" cy="183" r="24"/><circle cx="786" cy="191" r="22"/><circle cx="832" cy="206" r="26"/><circle cx="882" cy="199" r="30"/><circle cx="926" cy="191" r="26"/><circle cx="976" cy="166" r="26"/><circle cx="1031" cy="139" r="28"/><circle cx="1091" cy="113" r="26"/><circle cx="1151" cy="99" r="24"/><circle cx="1206" cy="83" r="26"/><circle cx="1266" cy="73" r="24"/><circle cx="1326" cy="61" r="28"/><circle cx="1391" cy="55" r="30"/><circle cx="1432" cy="51" r="26"/>
        </g>
        <g transform="translate(958 190)"><rect x="-5" y="-14" width="10" height="44" fill="#9c6b54"/><circle cy="-30" r="20" fill="#0f5c52"/><circle cx="-13" cy="-16" r="15" fill="#2e8b47"/><circle cx="12" cy="-18" r="14" fill="#3c9a4a"/></g>
    
        {/* Hills */}
        <g fill="#9ed455">
          <path d="M0 128 C120 128 280 178 382 262 L382 330 L0 330z"/>
          <path d="M345 298 C440 205 580 192 660 194 C760 196 850 212 905 240 L905 330 L345 330z"/>
          <path d="M862 272 C1040 142 1220 92 1440 94 L1440 330 L862 330z"/>
        </g>
    
        {/* Grass marks */}
        <g fill="#74b83c">
          <path d="M210 290 l4 8 h-8z M226 298 l4 8 h-8z M196 304 l4 8 h-8z"/>
          <path d="M560 262 l4 8 h-8z M578 270 l4 8 h-8z M546 276 l4 8 h-8z"/>
          <path d="M770 268 l4 8 h-8z M786 276 l4 8 h-8z"/>
        </g>
    
        {/* Bushes */}
        <g transform="translate(905 300)"><circle r="40" fill="#2e7d32" stroke="#2e7d32" strokeWidth="14" strokeDasharray="0 16" strokeLinecap="round"/></g>
        <g transform="translate(958 322)"><circle r="30" fill="#3f9f48" stroke="#3f9f48" strokeWidth="12" strokeDasharray="0 14" strokeLinecap="round"/></g>
    
        {/* Big tree on the left */}
        <path d="M58 330 L66 170 L94 170 L100 240 L150 200 L164 212 L102 268 L110 330z" fill="#9c6b54"/>
        <circle cx="124" cy="104" r="50" fill="#245e55" stroke="#245e55" strokeWidth="14" strokeDasharray="0 17" strokeLinecap="round"/>
        <circle cx="112" cy="168" r="52" fill="#2e7d32" stroke="#2e7d32" strokeWidth="14" strokeDasharray="0 17" strokeLinecap="round"/>
        <circle cx="82" cy="72" r="44" fill="#2e7d32" stroke="#2e7d32" strokeWidth="14" strokeDasharray="0 17" strokeLinecap="round"/>
        <circle cx="28" cy="130" r="66" fill="#5ba34a" stroke="#5ba34a" strokeWidth="14" strokeDasharray="0 17" strokeLinecap="round"/>
        <g transform="translate(62 326)"><circle r="16" fill="#3f9f48" stroke="#3f9f48" strokeWidth="9" strokeDasharray="0 11" strokeLinecap="round"/></g>
      </svg>
    
      <svg className="mascot" viewBox="0 0 460 396" role="img" aria-label="One Sky's owl mascot in a graduation cap, waving, with a small bluebird friend beside it.">
    
        <ellipse cx="284" cy="382" rx="110" ry="13" fill="#3c7d22" opacity=".3"/>
        <ellipse cx="76" cy="385" rx="44" ry="8" fill="#3c7d22" opacity=".3"/>
    
        <MascotBird />

        <MascotOwl />
      </svg>
    
      <HeroCharacters />
    
      <div className="hero-inner">
        <div className="title-wrap">
          <h1 id="hero-title">
            <span className="ln"><span className="w" style={{ "--i": 0 } as React.CSSProperties}>One</span>{" "}<span className="w" style={{ "--i": 1 } as React.CSSProperties}>Sky.</span>{" "}<span className="w" style={{ "--i": 2 } as React.CSSProperties}>Every</span>{" "}<span className="w" style={{ "--i": 3 } as React.CSSProperties}>Child.</span></span>
            <span className="ln"><span className="w" style={{ "--i": 4 } as React.CSSProperties}>Endless</span>{" "}<span className="w" style={{ "--i": 5 } as React.CSSProperties}>Possibilities</span>{" "}<span className="w" style={{ "--i": 6 } as React.CSSProperties}>with</span>{" "}<span className="w" style={{ "--i": 7 } as React.CSSProperties}>AI.</span></span>
          </h1>
          <svg className="title-moon" viewBox="0 0 80 80" aria-hidden="true"><path d="M52 6a34 34 0 1 0 22 50A28 28 0 0 1 52 6z" fill="#fff4c2"/><circle cx="30" cy="36" r="4" fill="#eadb9c"/><circle cx="40" cy="56" r="3" fill="#eadb9c"/></svg>
          <svg className="title-sun" viewBox="-30 -30 60 60" aria-hidden="true"><g stroke="#ffc93c" strokeWidth="5" strokeLinecap="round"><path d="M0 -27 V-21 M0 21 V27 M-27 0 H-21 M21 0 H27 M-19 -19 L-15 -15 M15 15 L19 19 M-19 19 L-15 15 M15 -15 L19 -19"/></g><circle r="15" fill="#ffc93c"/></svg>
        </div>
        <p className="sub">A fun, parent-guided first step into AI</p>
        <div className="btn-row">
          <a className="btn" href="#course">Explore the Course</a>
          <a className="btn" href="#preview"><svg viewBox="0 0 18 18" aria-hidden="true"><path d="M4 2.5 L15 9 L4 15.5z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>Watch a Free Preview</a>
        </div>
        <p className="note">Self-Paced Course · Just ₹385 · <span className="no-break">Class 3–5,</span> <span className="no-break">6–10,</span> <span className="no-break">11 &amp; 12</span></p>
        <a className="scroll-cue" href="#course" aria-label="Scroll to The Course">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 3v13M4 10.5 10 16.5 16 10.5"/></svg>
        </a>
      </div>
      <Fireflies />
    </section>
    </HeroCourseScene>
    
    <OneSkySections />
    </main>
    </>
  );
}
