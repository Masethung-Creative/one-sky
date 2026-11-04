"use client";

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import HomeLink from "./HomeLink";

const NAV_LINKS = [
  { label: "The Course", href: "/#course" },
  { label: "Our Vision", href: "/#vision" },
  { label: "How It Works", href: "/#how" },
  { label: "Giving Back", href: "/giving-back" },
  { label: "FAQ", href: "/#faq" },
];

const LANGUAGES = [
  { code: "en", native: "English", english: "English", badge: "A" },
  { code: "hi", native: "हिन्दी", english: "Hindi", badge: "हि" },
  { code: "kn", native: "ಕನ್ನಡ", english: "Kannada", badge: "ಕ" },
  { code: "ml", native: "മലയാളം", english: "Malayalam", badge: "മ" },
  { code: "ta", native: "தமிழ்", english: "Tamil", badge: "த" },
  { code: "te", native: "తెలుగు", english: "Telugu", badge: "తె" },
];

function readLanguage() {
  const match = document.cookie.match(/googtrans=\/en\/([a-z]+)/);
  return match ? match[1] : "en";
}

// Google Translate reads this cookie when the page loads.
function chooseLanguage(code: string) {
  if (code === "en") {
    document.cookie = "googtrans=; path=/; max-age=0";
  } else {
    document.cookie = `googtrans=/en/${code}; path=/`;
  }
  window.location.reload();
}

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: new (
          options: { pageLanguage: string; includedLanguages: string },
          elementId: string,
        ) => unknown;
      };
    };
  }
}

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    setLanguage(readLanguage());
    window.googleTranslateElementInit = () => {
      new window.google!.translate.TranslateElement(
        { pageLanguage: "en", includedLanguages: "hi,kn,ml,ta,te" },
        "google_translate_element",
      );
    };
  }, []);

  useEffect(() => {
    if (!langOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLangOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [langOpen]);

  const current = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  return (
    <header className="site-header">
      <div className="header-row">
        <HomeLink className="brand" aria-label="One Sky home" translate="no" onClick={() => setMenuOpen(false)}>
          <Image src="/one-sky-logo.png" alt="" width={52} height={40} priority />
          <span className="logo-text">One Sky</span>
        </HomeLink>
        <button
          type="button"
          className="menu-btn notranslate"
          translate="no"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true">{menuOpen ? "✕" : "☰"}</span>
        </button>
        <nav id="site-nav" className={`site-nav${menuOpen ? " open" : ""}`} aria-label="Main">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</Link>
              </li>
            ))}
          </ul>
          <div className="nav-actions">
            <div id="google_translate_element" hidden />
            <div className="lang-menu notranslate" translate="no">
              <button
                type="button"
                className="lang-trigger"
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                aria-label={`Language: ${current.english}`}
                onClick={() => setLangOpen((open) => !open)}
              >
                <span className="lang-badge" aria-hidden="true">
                  {current.badge}
                </span>
                <span className="lang-trigger-name">{current.native}</span>
                <svg className="lang-chevron" viewBox="0 0 12 8" width="12" height="8" aria-hidden="true">
                  <path d="M1 1.5 6 6.5 11 1.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {langOpen && (
                <>
                  <div className="lang-backdrop" onClick={() => setLangOpen(false)} />
                  <ul className="lang-panel" role="listbox" aria-label="Choose language">
                    {LANGUAGES.map((l) => (
                      <li key={l.code} role="option" aria-selected={l.code === language}>
                        <button
                          type="button"
                          className={`lang-item${l.code === language ? " is-selected" : ""}`}
                          onClick={() => chooseLanguage(l.code)}
                        >
                          <span className="lang-badge" aria-hidden="true">
                            {l.badge}
                          </span>
                          <span className="lang-names">
                            <span className="lang-native">{l.native}</span>
                            <span className="lang-english">{l.english}</span>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <Link className="learn-link" title="My Learning" href="/dashboard" onClick={() => setMenuOpen(false)}>
              <span aria-hidden="true">📚</span> <span>My Learning</span>
            </Link>
            <Link className="nav-enrol" href="/courses/ai-foundation" onClick={() => setMenuOpen(false)}>
              Enrol Now — ₹385
            </Link>
          </div>
        </nav>
      </div>
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="lazyOnload"
      />
    </header>
  );
}
