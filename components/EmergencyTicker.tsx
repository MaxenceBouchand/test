"use client";

const messages = [
  "🔧 Disponible maintenant — Intervention en moins de 45 min sur Montpellier",
  "⚡ Urgence fuite d'eau ? Appelez au 04 XX XX XX XX",
  "✅ Artisan certifié RGE — Devis gratuit sans engagement",
  "📍 Zone d'intervention : Montpellier, Lattes, Castelnau, Palavas, Mauguio",
  "🛡️ Travaux garantis 2 ans — Pièces d'origine",
];

const repeated = [...messages, ...messages];

export default function EmergencyTicker() {
  return (
    <div
      className="bg-[#C0392B] text-white overflow-hidden py-2.5"
      role="marquee"
      aria-label="Informations de disponibilité d'urgence"
    >
      <div className="ticker-track">
        {repeated.map((msg, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 px-10 text-sm font-medium tracking-wide whitespace-nowrap"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {msg}
            <span className="mx-6 opacity-40">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
