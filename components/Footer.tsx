const PHONE = "04 XX XX XX XX";
const PHONE_HREF = "tel:+330400000000";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1917] text-[#B8B3A2]" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Pied de page</h2>

      {/* CTA band */}
      <div className="border-b border-[#3D3A31]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p
              className="text-3xl text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              UNE URGENCE ?
            </p>
            <p className="text-[#7A7566] mt-1 text-sm">
              Disponible 24h/7j — Intervention rapide sur Montpellier
            </p>
          </div>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-3 bg-[#C0392B] hover:bg-[#A93226] text-white font-bold text-lg px-8 rounded-[4px] transition-colors whitespace-nowrap"
            style={{ minHeight: "56px" }}
            aria-label={`Appeler le ${PHONE}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
            </svg>
            {PHONE}
          </a>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-10">
        <div>
          <p
            className="text-xl text-[#C8A55A] tracking-widest uppercase mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ArtisanPlombier
          </p>
          <p className="text-sm leading-relaxed text-[#7A7566]">
            Artisan plombier indépendant à Montpellier. Qualité, réactivité et
            honnêteté depuis 2012.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#5C5849] mb-4">
            Services
          </p>
          <ul className="space-y-2 text-sm">
            {["Urgence fuite", "Salle de bain", "Chauffe-eau", "Débouchage", "Rénovation"].map((s) => (
              <li key={s}>
                <a href="#services" className="hover:text-[#C8A55A] transition-colors">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#5C5849] mb-4">
            Contact
          </p>
          <address className="not-italic text-sm space-y-2 text-[#7A7566]">
            <p>Montpellier (34000)</p>
            <p>Hérault — Occitanie</p>
            <a href={PHONE_HREF} className="text-[#C8A55A] hover:text-[#E2C47A] transition-colors font-semibold">
              {PHONE}
            </a>
          </address>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[#3D3A31]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#5C5849]">
          <p>© {year} ArtisanPlombier Montpellier — Tous droits réservés</p>
          <div className="flex gap-4">
            <a href="/mentions-legales" className="hover:text-[#C8A55A] transition-colors">Mentions légales</a>
            <a href="/politique-confidentialite" className="hover:text-[#C8A55A] transition-colors">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
