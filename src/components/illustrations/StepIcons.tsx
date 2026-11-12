// The three How It Works icons. Scrolling sets --icon-time, in seconds, which moves their animations; their styles are in one-sky-sections.css.
// Tailwind has its own utility classes, such as outline, so these class names need to stay clear of them.

export function BookIcon() {
  return (
    <svg className="step-icon step-icon-book" viewBox="0 0 80 80" aria-hidden="true">
      <g className="i-book">
        {/* Covers */}
        <g className="i-book-cover-left">
          <path className="cover inked" d="M40 36 C30 31 18 30 9 32 Q7 32.5 7 35 L7 60 Q7 63 10 62.5 C19 61 30 61.5 40 66 Z" />
        </g>
        <g className="i-book-cover-right">
          <path className="cover inked" d="M40 36 C50 31 62 30 71 32 Q73 32.5 73 35 L73 60 Q73 63 70 62.5 C61 61 50 61.5 40 66 Z" />
        </g>

        {/* Pages */}
        <g className="i-page-left">
          <path className="page inked" d="M40 34 C31 29 20 28 12.5 30 Q10 30.6 10 33 L10 57 Q10 59.5 12.5 59 C21 57.5 31 58.5 40 63 Z" />
          <path className="lines" d="M16 37 Q24 35.5 33 38.5 M16 43 Q24 41.5 33 44.5 M16 49 Q21 48 26 49" />
        </g>
        <g className="i-page-right">
          <path className="page inked" d="M40 34 C49 29 60 28 67.5 30 Q70 30.6 70 33 L70 57 Q70 59.5 67.5 59 C59 57.5 49 58.5 40 63 Z" />
          <path className="lines" d="M64 37 Q56 35.5 47 38.5 M64 43 Q56 41.5 47 44.5 M64 49 Q59 48 54 49" />
        </g>

        {/* Turning page (hidden except during the flip) */}
        <g className="i-page-flip" opacity="0">
          <path className="flip inked" d="M40 34 C49 29 60 28 67.5 30 Q70 30.6 70 33 L70 57 Q70 59.5 67.5 59 C59 57.5 49 58.5 40 63 Z" />
        </g>
      </g>

      {/* Magic curve rising from the spine */}
      <g className="i-magic-curve">
        <path d="M40 35 C35 31 45 29 40 24" pathLength="1" fill="none" stroke="#FFC83D" strokeWidth="2.2" strokeLinecap="round" />
      </g>

      {/* Sparkles */}
      <g className="i-sparkle-left">
        <path className="light" transform="translate(26 21)" d="M0 -4.5 Q0.9 -0.9 4.5 0 Q0.9 0.9 0 4.5 Q-0.9 0.9 -4.5 0 Q-0.9 -0.9 0 -4.5 Z" />
      </g>
      <g className="i-sparkle-right">
        <path className="gold" transform="translate(55 17)" d="M0 -3.5 Q0.7 -0.7 3.5 0 Q0.7 0.7 0 3.5 Q-0.7 0.7 -3.5 0 Q-0.7 -0.7 0 -3.5 Z" />
        <circle className="light" cx="60" cy="23" r="1.4" />
      </g>

      {/* Main star */}
      <g className="i-magic-star-main">
        <path className="gold inked" strokeWidth="1.6" transform="translate(40 22)" d="M0 -8 L2.12 -2.91 L7.61 -2.47 L3.42 1.11 L4.7 6.47 L0 3.6 L-4.7 6.47 L-3.42 1.11 L-7.61 -2.47 L-2.12 -2.91 Z" />
      </g>
    </svg>
  );
}

export function BackpackIcon() {
  return (
    <svg className="step-icon step-icon-backpack" viewBox="0 0 80 80" aria-hidden="true">
      {/* Handle sits behind the card so the card reads as entering the bag */}
      <g className="i-backpack-handle">
        <path className="inked" d="M29 31 V27 Q29 23 33 23 H39 Q43 23 43 27 V31" fill="none" strokeWidth="2.6" />
      </g>

      {/* Enrolment card (layered behind the backpack body so it disappears inside) */}
      <g className="i-enrolment-card">
        <rect className="gold inked" x="26" y="6" width="20" height="14" rx="3.5" strokeWidth="1.8" />
        <g className="i-price-symbol">
          <path d="M32.5 9.6 H39.5 M32.5 12.3 H39.5 M33.6 9.6 C37.6 9.6 37.9 14.8 33.6 14.8 L37.8 18.2" fill="none" stroke="#1A4E9E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>

      <g className="i-backpack">
        {/* Two tiny side details (side pockets) */}
        <g className="i-backpack-details">
          <rect className="light inked" x="13.5" y="43" width="6" height="14" rx="3" strokeWidth="1.8" />
          <rect className="light inked" x="52.5" y="43" width="6" height="14" rx="3" strokeWidth="1.8" />
        </g>

        {/* Main body + opening seam */}
        <g className="i-backpack-body">
          <rect className="white inked" x="18" y="30" width="36" height="38" rx="11" />
          <path d="M24 37 Q36 40 48 37" fill="none" stroke="#9FD3FF" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Front pocket with gold button */}
        <g className="i-backpack-pocket">
          <rect className="light inked" x="24" y="47" width="24" height="15" rx="5" strokeWidth="1.8" />
          <path d="M24.5 52.5 H47.5" fill="none" stroke="#1A4E9E" strokeWidth="1.6" strokeLinecap="round" />
          <circle className="gold inked" cx="36" cy="52.5" r="2.2" strokeWidth="1.4" />
        </g>
      </g>

      {/* Success badge */}
      <g className="i-success-circle">
        <circle className="green inked" cx="63" cy="31" r="8.5" strokeWidth="1.8" />
      </g>
      <g className="i-success-check">
        <path d="M59 31.2 L62 34.2 L67.4 28.2" pathLength="1" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Celebration sparkles */}
      <g className="i-sparkle-left">
        <path className="gold" transform="translate(12 36)" d="M0 -4 Q0.8 -0.8 4 0 Q0.8 0.8 0 4 Q-0.8 0.8 -4 0 Q-0.8 -0.8 0 -4 Z" />
      </g>
      <g className="i-sparkle-right">
        <circle className="light" cx="70" cy="52" r="2" />
        <circle className="gold" cx="74" cy="47" r="1.2" />
      </g>
      <g className="i-sparkle-top">
        <path className="light" transform="translate(53 16)" d="M0 -3.2 Q0.6 -0.6 3.2 0 Q0.6 0.6 0 3.2 Q-0.6 0.6 -3.2 0 Q-0.6 -0.6 0 -3.2 Z" />
      </g>
    </svg>
  );
}

export function ScreenIcon() {
  return (
    <svg className="step-icon step-icon-screen" viewBox="0 0 80 80" aria-hidden="true">
      {/* Learning screen (tablet) */}
      <g className="i-screen">
        <g className="i-screen-border">
          <rect className="white inked" x="12" y="26" width="46" height="36" rx="8" />
        </g>
        <g className="i-learning-screen">
          <rect className="screen" x="16.5" y="30.5" width="37" height="27" rx="4.5" stroke="#9FD3FF" strokeWidth="1.4" />
          {/* progress track + moving activity line */}
          <path d="M21.5 54 H48.5" fill="none" stroke="#BFE6FF" strokeWidth="2" strokeLinecap="round" />
          <path className="i-progress-fill" d="M21.5 54 H48.5" pathLength="1" fill="none" stroke="#FFC83D" strokeWidth="2" strokeLinecap="round" />
        </g>
        <g className="i-play-ripple">
          <circle cx="35" cy="44" r="8" fill="none" stroke="#5AA9F0" strokeWidth="2" />
        </g>
        <g className="i-play-button">
          <circle className="gold inked" cx="35" cy="44" r="8" strokeWidth="1.8" />
          <path className="white inked" strokeWidth="1.6" d="M32.6 40.6 Q32.6 39.4 33.7 40 L39.1 43.2 Q40.2 44 39.1 44.8 L33.7 48 Q32.6 48.6 32.6 47.4 Z" />
        </g>
      </g>

      {/* Tiny rocket (launches up-right) */}
      <g className="i-rocket">
        <g transform="translate(66 60) rotate(30)">
          <g className="i-rocket-flame">
            <path className="gold" d="M-2.6 5.5 Q-1.8 9.5 0 12 Q1.8 9.5 2.6 5.5 Z" />
          </g>
          <g className="i-rocket-body">
            <path className="light inked" strokeWidth="1.5" d="M-4 1.5 L-7 6 L-3.8 5.2 Z M4 1.5 L7 6 L3.8 5.2 Z" />
            <path className="white inked" strokeWidth="1.6" d="M0 -8.5 C4.2 -5.5 4.6 0 4 5.5 H-4 C-4.6 0 -4.2 -5.5 0 -8.5 Z" />
          </g>
          <g className="i-rocket-window">
            <circle className="light inked" cx="0" cy="-2" r="1.8" strokeWidth="1.3" />
          </g>
        </g>
      </g>

      {/* Quiz star badge with check */}
      <g className="i-quiz-star">
        <path className="gold inked" strokeWidth="1.7" transform="translate(36 14)" d="M0 -9.5 L2.7 -3.72 L9.03 -2.94 L4.37 1.42 L5.58 7.69 L0 4.6 L-5.58 7.69 L-4.37 1.42 L-9.03 -2.94 L-2.7 -3.72 Z" />
      </g>
      <g className="i-quiz-check">
        <path transform="translate(36 14)" d="M-2.5 0.6 L-0.6 2.4 L2.7 -1.3" pathLength="1" fill="none" stroke="#1A4E9E" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Celebration sparkles */}
      <g className="i-sparkle-left">
        <path className="gold" transform="translate(7 38)" d="M0 -3.8 Q0.75 -0.75 3.8 0 Q0.75 0.75 0 3.8 Q-0.75 0.75 -3.8 0 Q-0.75 -0.75 0 -3.8 Z" />
      </g>
      <g className="i-sparkle-right">
        <circle className="light" cx="74" cy="62" r="2" />
        <circle className="gold" cx="76.5" cy="68" r="1.2" />
      </g>
      <g className="i-sparkle-top">
        <path className="light" transform="translate(54 13)" d="M0 -3.2 Q0.6 -0.6 3.2 0 Q0.6 0.6 0 3.2 Q-0.6 0.6 -3.2 0 Q-0.6 -0.6 0 -3.2 Z" />
      </g>
    </svg>
  );
}
