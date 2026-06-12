const SERVICES = [
  {
    icon: "💧",
    title: "Urgence Fuite",
    desc: "Détection et réparation de fuites visibles ou cachées. Intervention en moins de 45 min.",
    tag: "24h/7j",
    tagColor: "bg-[#C0392B]/10 text-[#C0392B] border-[#C0392B]/20",
  },
  {
    icon: "🚿",
    title: "Salle de Bain",
    desc: "Installation complète, rénovation, remplacement de baignoire, douche à l'italienne.",
    tag: "Sur devis",
    tagColor: "bg-[#C8A55A]/10 text-[#9E7D35] border-[#C8A55A]/20",
  },
  {
    icon: "🔥",
    title: "Chauffe-eau & Chaudière",
    desc: "Dépannage, entretien et remplacement. Toutes marques, chauffe-eau thermodynamique.",
    tag: "Certifié",
    tagColor: "bg-[#C8A55A]/10 text-[#9E7D35] border-[#C8A55A]/20",
  },
  {
    icon: "🔧",
    title: "Débouchage",
    desc: "WC, évier, baignoire, colonnes. Hydrocurage haute pression, caméra d'inspection.",
    tag: "Rapide",
    tagColor: "bg-[#3D3A31]/10 text-[#5C5849] border-[#3D3A31]/20",
  },
  {
    icon: "🏠",
    title: "Rénovation Complète",
    desc: "Refonte totale des réseaux d'eau, mise aux normes, plomberie neuf ou ancien.",
    tag: "Devis gratuit",
    tagColor: "bg-[#C8A55A]/10 text-[#9E7D35] border-[#C8A55A]/20",
  },
  {
    icon: "🌿",
    title: "Économies d'Eau",
    desc: "Robinetterie économique, mitigeurs thermostatiques, récupérateurs — éco-gestes.",
    tag: "RGE",
    tagColor: "bg-green-50 text-green-700 border-green-200",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="py-24 bg-[#F4F3EE]"
      aria-labelledby="services-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-14">
          <p className="text-xs text-[#C8A55A] font-semibold tracking-[0.25em] uppercase mb-3">
            Ce que je fais
          </p>
          <h2
            id="services-heading"
            className="text-[clamp(2.5rem,5vw,4.5rem)] text-[#1E1C17]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            MES SERVICES
          </h2>
          <div className="mt-4 w-16 h-[3px] bg-[#C8A55A] rounded-full" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s) => (
            <article
              key={s.title}
              className="group bg-white border border-[#E8E5DB] rounded-[4px] p-6 hover:border-[#C8A55A] hover:shadow-[0_4px_24px_rgba(200,165,90,0.12)] transition-all duration-300"
            >
              <div className="text-3xl mb-4" aria-hidden="true">{s.icon}</div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-xl text-[#1E1C17] font-bold">{s.title}</h3>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-[4px] border whitespace-nowrap tracking-wide uppercase ${s.tagColor}`}
                >
                  {s.tag}
                </span>
              </div>
              <p className="text-sm text-[#5C5849] leading-relaxed">{s.desc}</p>
              <div className="mt-5 flex items-center gap-1 text-xs text-[#C8A55A] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                Demander un devis
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
