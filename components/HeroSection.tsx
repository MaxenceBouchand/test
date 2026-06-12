import Image from "next/image";

const PHONE_HREF = "tel:+330400000000";
const PHONE = "04 XX XX XX XX";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[88svh] flex items-center overflow-hidden bg-[#1A1917]"
      aria-labelledby="hero-heading"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80"
          alt="Artisan plombier au travail"
          fill
          priority
          className="object-cover opacity-20"
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1917] via-[#1A1917]/80 to-transparent" />
      </div>

      {/* Texture grain */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 w-full">
        <div className="max-w-2xl">
          {/* Badge disponibilité */}
          <div className="inline-flex items-center gap-2 bg-[#C0392B]/15 border border-[#C0392B]/30 text-[#E74C3C] text-xs font-semibold px-3 py-1.5 rounded-[4px] mb-6 tracking-widest uppercase">
            <span className="pulse-dot w-2 h-2 rounded-full bg-[#E74C3C] inline-block" />
            Disponible 24h/7j · Intervention rapide
          </div>

          {/* Heading */}
          <h1
            id="hero-heading"
            className="text-[clamp(3rem,9vw,7rem)] text-white leading-[0.95] mb-6"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em" }}
          >
            VOTRE PLOMBIER
            <br />
            <span className="text-[#C8A55A]">DE CONFIANCE</span>
            <br />
            À MONTPELLIER
          </h1>

          <p className="text-[#B8B3A2] text-lg leading-relaxed mb-10 max-w-lg">
            Fuite, bouchon, chauffe-eau, salle de bain — j&apos;interviens vite,
            je travaille bien. Artisan indépendant depuis 12 ans, certifié et
            assurance décennale.
          </p>

          {/* CTA group */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-3 bg-[#C8A55A] hover:bg-[#E2C47A] text-[#1A1917] font-bold text-base px-8 rounded-[4px] transition-all duration-200 hover:shadow-[0_4px_24px_rgba(200,165,90,0.35)]"
              style={{ minHeight: "56px" }}
              aria-label={`Appel d'urgence — ${PHONE}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
              </svg>
              {PHONE}
            </a>
            <a
              href="#devis"
              className="inline-flex items-center justify-center gap-2 border border-[#7A7566] hover:border-[#C8A55A] text-[#D4D0C3] hover:text-[#C8A55A] font-semibold text-base px-8 rounded-[4px] transition-all duration-200"
              style={{ minHeight: "56px" }}
            >
              Devis gratuit
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap gap-6 mt-12 text-sm text-[#7A7566]">
            {[
              { icon: "🛡️", text: "Assurance décennale" },
              { icon: "⭐", text: "4.9/5 · 127 avis" },
              { icon: "⚡", text: "Intervention < 45 min" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2">
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
