"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";
import { SUPPORTED_LANGUAGES } from "@/lib/i18n";

export default function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: t.nav.home, href: "#home" },
    { label: t.nav.howToVote, href: "#how-to-vote" },
    { label: t.nav.timeline, href: "#timeline" },
    { label: t.nav.eligibility, href: "#eligibility" },
    { label: t.nav.faq, href: "#faq" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.3s ease",
        background: scrolled
          ? "rgba(13,27,62,0.95)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.3)" : "none",
      }}
    >
      {/* Tricolor bar at top */}
      <div
        style={{
          height: "3px",
          background: "linear-gradient(90deg, #FF6B00 33.3%, #F8F8F8 33.3%, #F8F8F8 66.6%, #138808 66.6%)",
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "68px",
        }}
      >
        {/* Logo */}
        <Link
          href="#home"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #FF6B00, #FFD700)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              boxShadow: "0 4px 12px rgba(255,107,0,0.4)",
              flexShrink: 0,
            }}
          >
            🗳️
          </div>
          <div>
            <div
              style={{
                fontSize: "1.15rem",
                fontWeight: 800,
                color: "white",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              Electra<span style={{ color: "#FF8C42" }}>Guide</span>
            </div>
            <div
              style={{
                fontSize: "0.65rem",
                color: "rgba(255,255,255,0.6)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginTop: "2px",
              }}
            >
              {lang === "hi" ? "भारत का चुनाव गाइड" : "India's Election Guide"}
            </div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              style={{ padding: "6px 12px" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Language Toggle */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "9999px",
                padding: "6px 14px",
                color: "white",
                fontSize: "0.85rem",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s ease",
                backdropFilter: "blur(10px)",
              }}
              aria-label="Switch language"
              id="lang-toggle"
            >
              🌐 {lang === "en" ? "EN" : "हि"}
            </button>

            {langOpen && (
              <div
                className="animate-slide-in glass"
                style={{
                  position: "absolute",
                  right: 0,
                  top: "calc(100% + 8px)",
                  borderRadius: "12px",
                  overflow: "hidden",
                  minWidth: "140px",
                  border: "1px solid rgba(255,255,255,0.2)",
                  zIndex: 200,
                }}
              >
                {SUPPORTED_LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "10px 16px",
                      background: lang === l.code ? "rgba(0,102,204,0.15)" : "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: lang === l.code ? "#0066CC" : "#0D1B3E",
                      fontWeight: lang === l.code ? 600 : 400,
                      fontSize: "0.875rem",
                      textAlign: "left",
                      transition: "background 0.15s ease",
                    }}
                  >
                    {l.nativeLabel}
                    {lang === l.code && " ✓"}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Ask AI CTA */}
          <a
            href="#chat"
            className="btn btn-primary"
            style={{
              padding: "8px 20px",
              fontSize: "0.85rem",
              borderRadius: "9999px",
            }}
            id="nav-ask-ai"
          >
            🤖 {t.nav.askAI}
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: "none",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "8px",
              padding: "8px",
              cursor: "pointer",
              color: "white",
              fontSize: "1.2rem",
              lineHeight: 1,
            }}
            aria-label="Toggle menu"
            id="hamburger-btn"
            className="hamburger"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="animate-slide-in glass-dark"
          style={{
            padding: "16px 24px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "10px 0",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                fontSize: "1rem",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
