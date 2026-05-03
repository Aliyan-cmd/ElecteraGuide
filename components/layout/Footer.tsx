"use client";

import { useLanguage } from "@/components/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #0D1B3E 0%, #0A1530 100%)",
        color: "white",
        paddingTop: "64px",
      }}
    >
      {/* Tricolor Accent */}
      <div
        style={{
          height: "4px",
          background: "linear-gradient(90deg, #FF6B00 33.3%, #F8F8F8 33.3%, #F8F8F8 66.6%, #138808 66.6%)",
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "48px 24px",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          gap: "48px",
        }}
        className="footer-grid"
      >
        {/* Brand Column */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div
              style={{
                width: "44px", height: "44px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #FF6B00, #FFD700)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "22px",
                boxShadow: "0 4px 12px rgba(255,107,0,0.4)",
              }}
            >
              🗳️
            </div>
            <div>
              <div style={{ fontSize: "1.3rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
                Electra<span style={{ color: "#FF8C42" }}>Guide</span>
              </div>
              <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                India's Election Guide
              </div>
            </div>
          </div>

          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: "20px", maxWidth: "340px" }}>
            {t.footer.tagline}
          </p>

          <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.6, maxWidth: "360px" }}>
            {t.footer.disclaimer}
          </p>

          {/* Social Links */}
          <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
            {[
              { icon: "🐦", label: "Twitter" },
              { icon: "📘", label: "Facebook" },
              { icon: "📷", label: "Instagram" },
              { icon: "▶️", label: "YouTube" },
            ].map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                style={{
                  width: "36px", height: "36px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "16px",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#FF8C42",
              marginBottom: "20px",
            }}
          >
            {t.footer.links.title}
          </h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { label: t.footer.links.voterPortal, href: "https://voters.eci.gov.in" },
              { label: t.footer.links.eciWebsite, href: "https://eci.gov.in" },
              { label: t.footer.links.voterHelpline, href: "tel:1950" },
              { label: t.footer.links.cVigil, href: "#" },
            ].map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    transition: "color 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span style={{ color: "#138808", fontSize: "0.6rem" }}>▶</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Election Types */}
        <div>
          <h4
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#FF8C42",
              marginBottom: "20px",
            }}
          >
            {t.footer.elections.title}
          </h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              t.footer.elections.lokSabha,
              t.footer.elections.stateAssembly,
              t.footer.elections.rajyaSabha,
              t.footer.elections.byElections,
            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    transition: "color 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span style={{ color: "#0066CC", fontSize: "0.6rem" }}>▶</span>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1280px",
          margin: "0 auto",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>
          {t.footer.copyright}
        </p>
        <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>
          {t.footer.madeWith}
        </p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </footer>
  );
}
