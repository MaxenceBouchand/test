"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#realisations", label: "Réalisations" },
  { href: "#devis", label: "Devis" },
  { href: "#contact", label: "Contact" },
];

const PHONE = "04 XX XX XX XX";
const PHONE_HREF = "tel:+330400000000";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#1A1917]/95 backdrop-blur-md shadow-lg"
          : "bg-[#1A1917]"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link
            href="/"
            className="flex flex-col leading-none"
            aria-label="Accueil — Artisan Plombier Montpellier"
          >
            <span
              className="text-2xl text-[#C8A55A] tracking-widest uppercase"
              style={{ fontFamily: "var(--font-display)" }}
            >
              ArtisanPlombier
            </span>
            <span className="text-[10px] text-[#B8B3A2] tracking-[0.2em] uppercase mt-0.5">
              Montpellier · 34
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Navigation principale">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-[#D4D0C3] hover:text-[#C8A55A] transition-colors duration-200 tracking-wide"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA phone — always visible */}
          <div className="flex items-center gap-3">
            <a
              href={PHONE_HREF}
              className="flex items-center gap-2 bg-[#C0392B] hover:bg-[#A93226] text-white font-semibold text-sm px-4 rounded-[4px] transition-colors duration-200"
              style={{ minHeight: "48px" }}
              aria-label={`Appeler le ${PHONE}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
              </svg>
              <span className="hidden sm:inline">{PHONE}</span>
              <span className="sm:hidden">Urgence</span>
            </a>

            {/* Hamburger */}
            <button
              className="md:hidden p-3 text-[#D4D0C3] hover:text-[#C8A55A] transition-colors"
              style={{ minWidth: "48px", minHeight: "48px" }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label="Menu de navigation"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                {menuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav
            className="md:hidden border-t border-[#3D3A31] py-4 animate-slide-up"
            aria-label="Menu mobile"
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center py-3 px-2 text-[#D4D0C3] hover:text-[#C8A55A] transition-colors border-b border-[#3D3A31]/50 last:border-0"
                style={{ minHeight: "48px" }}
              >
                {l.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
