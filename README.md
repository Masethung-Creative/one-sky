# One Sky

The website for **One Sky**, a fun, parent-guided first course in AI for children (Class 3 to 12), priced at ₹385.

Live site: https://one-sky-demo.vercel.app

## Run it on your computer

You need [Node.js](https://nodejs.org) (version 20 or newer).

```bash
npm install      # once, to download the packages
npm run dev      # start the site at http://localhost:3000
```

Other commands:

| Command | What it does |
|---|---|
| `npm run build` | Builds the site the way Vercel will. Run it before pushing to catch errors. |
| `npm run start` | Serves that build at http://localhost:3000. |
| `npm run lint` | Checks the code for common mistakes. |

## How it goes live

The site is hosted on **Vercel** and linked to this GitHub repository. Every push to the `main` branch is published automatically, usually within a minute.

## Folders

```
public/                      Files the site serves exactly as they are
├── animations/              The waving characters animation (Lottie JSON)
├── embeds/                  The Coco reward mini-page shown inside the course scene
├── images/
│   ├── ai-tools/            Logos of the AI tools shown in the hero
│   ├── brand/               One Sky logos (header and footer)
│   └── why-one-sky/         The five animated icons on the Why One Sky cards
└── videos/
    └── chapter-1/           Free preview video in 1080p, 720p and 480p, its cover image and English captions

src/
├── app/                     The pages. Each folder is a web address (see "Pages" below)
├── components/              The building blocks the pages are made of
│   ├── layout/              Header, footer and the frame around inner pages
│   ├── home/                The home page
│   │   ├── hero/            The top scene: title, characters, fireflies, AI tools
│   │   └── sections/        The scrolling scenes below: How It Works, Why One Sky, Preview, FAQ
│   ├── illustrations/       Drawn characters and icons (owl, bluebird, planes, step icons)
│   ├── pages/               Sections used by the other pages (About, Schools, Contact…)
│   └── video/               The lesson video player with captions and settings
├── content/                 The words the site shows: courses, FAQs, forms, policies
└── styles/                  The style sheets (colours, spacing, layout)
```

Files that are not part of the website:

| File or folder | Purpose |
|---|---|
| `media-source/` | Original, uncompressed media. Kept on your computer only; it is not uploaded to GitHub. |
| `AGENTS.md`, `CLAUDE.md`, `.claude/` | Notes for AI coding assistants. |
| `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs` | Settings for the tools that build and check the site. |

## Pages

| Address | File |
|---|---|
| `/` | `src/app/page.tsx` |
| `/about`, `/schools`, `/teacher-corner`, `/giving-back`, `/sponsor-learners`, `/book-a-demo`, `/contact`, `/reviews`, `/help`, `/payment-support`, `/dashboard`, `/terms-conditions`, `/privacy-policy`, `/refund-policy` | `src/app/[page]/page.tsx`, with each page's content in `src/components/pages/SitePages.tsx` |
| `/courses/ai-foundation` | `src/app/courses/[slug]/page.tsx` |
| `/courses/ai-foundation/enrol` | `src/app/courses/[slug]/enrol/page.tsx` |

## Common changes

- **Change text, prices or FAQs:** edit `src/content/site.ts`.
- **Change a policy page:** edit `src/content/policies.json`.
- **Replace the preview video:** put new files in `public/videos/chapter-1/` with the same names, or add a folder for a new chapter and point to it in `src/components/home/sections/GuideFrame.tsx`.
- **Add captions in another language:** add a `.vtt` file next to `captions-en.vtt`, then add a line to `captions` in `GuideFrame.tsx`. It appears in the player's CC menu automatically.
- **Change colours or spacing:** edit the files in `src/styles/`.

## Built with

[Next.js](https://nextjs.org) 16 · React 19 · Tailwind CSS 4 · [GSAP](https://gsap.com) for scroll animation · [Motion](https://motion.dev) · [lottie-web](https://github.com/airbnb/lottie-web) for the characters
