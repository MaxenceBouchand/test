"use client";

import { useState } from "react";

/* ─── Step 1 data ───────────────────────────────────────── */
const SERVICES = [
  { id: "urgence", icon: "💧", label: "Urgence / Fuite" },
  { id: "sdb", icon: "🚿", label: "Salle de bain" },
  { id: "chauffe", icon: "🔥", label: "Chauffe-eau / Chaudière" },
  { id: "debouchage", icon: "🔧", label: "Débouchage" },
  { id: "renovation", icon: "🏠", label: "Rénovation complète" },
  { id: "autre", icon: "❓", label: "Autre" },
];

/* ─── Step 2 data ───────────────────────────────────────── */
const ZONES = [
  "Montpellier Centre",
  "Montpellier Nord",
  "Montpellier Ouest",
  "Montpellier Est",
  "Lattes / Palavas",
  "Castelnau-le-Lez",
  "Mauguio",
  "Autre commune",
];

type FormData = {
  service: string;
  zone: string;
  nom: string;
  tel: string;
  message: string;
};

const EMPTY: FormData = { service: "", zone: "", nom: "", tel: "", message: "" };

const STEP_LABELS = ["Service", "Localisation", "Contact"];

function StepIndicator({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8" role="list" aria-label="Étapes du formulaire">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2" role="listitem">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
              i < step
                ? "bg-[#C8A55A] text-[#1A1917]"
                : i === step
                ? "bg-[#1A1917] text-white ring-2 ring-[#C8A55A] ring-offset-2"
                : "bg-[#E8E5DB] text-[#7A7566]"
            }`}
            aria-current={i === step ? "step" : undefined}
          >
            {i < step ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            ) : (
              i + 1
            )}
          </div>
          <span className={`text-xs font-semibold tracking-wide hidden sm:block ${i === step ? "text-[#1E1C17]" : "text-[#7A7566]"}`}>
            {STEP_LABELS[i]}
          </span>
          {i < total - 1 && (
            <div className={`flex-1 h-px w-8 mx-1 transition-colors duration-300 ${i < step ? "bg-[#C8A55A]" : "bg-[#E8E5DB]"}`} aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  );
}

export default function QuoteForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  const canNext =
    step === 0
      ? !!data.service
      : step === 1
      ? !!data.zone
      : !!data.nom && data.tel.length >= 10;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="devis"
      className="py-24 bg-[#F4F3EE]"
      aria-labelledby="devis-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left info */}
          <div>
            <p className="text-xs text-[#C8A55A] font-semibold tracking-[0.25em] uppercase mb-3">
              Gratuit & sans engagement
            </p>
            <h2
              id="devis-heading"
              className="text-[clamp(2.5rem,5vw,4.5rem)] text-[#1E1C17] mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              VOTRE DEVIS
              <br />
              EN 3 ÉTAPES
            </h2>
            <div className="w-16 h-[3px] bg-[#C8A55A] rounded-full mb-8" />

            <ul className="space-y-4">
              {[
                { n: "01", t: "Choisissez votre besoin", d: "Urgence, rénovation ou entretien" },
                { n: "02", t: "Votre secteur", d: "J'interviens sur Montpellier et alentours" },
                { n: "03", t: "Vos coordonnées", d: "Rappel sous 30 minutes en journée" },
              ].map((item) => (
                <li key={item.n} className="flex gap-4">
                  <span
                    className="text-3xl text-[#C8A55A] w-10 shrink-0"
                    style={{ fontFamily: "var(--font-display)" }}
                    aria-hidden="true"
                  >
                    {item.n}
                  </span>
                  <div>
                    <p className="font-semibold text-[#1E1C17]">{item.t}</p>
                    <p className="text-sm text-[#7A7566]">{item.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Form card */}
          <div className="bg-white border border-[#E8E5DB] rounded-[4px] p-6 sm:p-8 shadow-[0_2px_12px_rgba(30,28,23,0.10)]">
            {submitted ? (
              <div className="text-center py-8 animate-fade-in">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-[#1E1C17] mb-2" style={{ fontFamily: "var(--font-display)" }}>
                  DEMANDE ENVOYÉE !
                </h3>
                <p className="text-[#5C5849]">
                  Je vous rappelle sous 30 minutes. À tout de suite !
                </p>
                <button
                  onClick={() => { setSubmitted(false); setStep(0); setData(EMPTY); }}
                  className="mt-6 text-sm text-[#C8A55A] underline hover:no-underline"
                >
                  Nouvelle demande
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <StepIndicator step={step} total={3} />

                {/* Step 0 — Service */}
                {step === 0 && (
                  <fieldset className="animate-slide-up">
                    <legend className="text-lg font-bold text-[#1E1C17] mb-5">
                      De quoi avez-vous besoin ?
                    </legend>
                    <div className="grid grid-cols-2 gap-3">
                      {SERVICES.map((s) => (
                        <label
                          key={s.id}
                          className={`flex flex-col items-center gap-2 p-4 border rounded-[4px] cursor-pointer transition-all duration-200 ${
                            data.service === s.id
                              ? "border-[#C8A55A] bg-[#C8A55A]/5 shadow-[0_0_0_2px_#C8A55A]"
                              : "border-[#E8E5DB] hover:border-[#D4D0C3]"
                          }`}
                          style={{ minHeight: "80px" }}
                        >
                          <input
                            type="radio"
                            name="service"
                            value={s.id}
                            checked={data.service === s.id}
                            onChange={() => setData({ ...data, service: s.id })}
                            className="sr-only"
                          />
                          <span className="text-2xl" aria-hidden="true">{s.icon}</span>
                          <span className="text-xs font-semibold text-[#3D3A31] text-center leading-tight">
                            {s.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                )}

                {/* Step 1 — Zone */}
                {step === 1 && (
                  <fieldset className="animate-slide-up">
                    <legend className="text-lg font-bold text-[#1E1C17] mb-5">
                      Où se trouve le chantier ?
                    </legend>
                    <div className="grid grid-cols-2 gap-2">
                      {ZONES.map((z) => (
                        <label
                          key={z}
                          className={`flex items-center gap-2 p-3 border rounded-[4px] cursor-pointer transition-all duration-200 text-sm ${
                            data.zone === z
                              ? "border-[#C8A55A] bg-[#C8A55A]/5 text-[#1E1C17] font-semibold shadow-[0_0_0_2px_#C8A55A]"
                              : "border-[#E8E5DB] text-[#5C5849] hover:border-[#D4D0C3]"
                          }`}
                          style={{ minHeight: "48px" }}
                        >
                          <input
                            type="radio"
                            name="zone"
                            value={z}
                            checked={data.zone === z}
                            onChange={() => setData({ ...data, zone: z })}
                            className="sr-only"
                          />
                          <span
                            className={`w-3.5 h-3.5 rounded-full border-2 shrink-0 transition-colors ${
                              data.zone === z ? "border-[#C8A55A] bg-[#C8A55A]" : "border-[#D4D0C3]"
                            }`}
                            aria-hidden="true"
                          />
                          {z}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                )}

                {/* Step 2 — Contact */}
                {step === 2 && (
                  <div className="animate-slide-up space-y-4">
                    <h3 className="text-lg font-bold text-[#1E1C17] mb-5">
                      Vos coordonnées
                    </h3>
                    <div>
                      <label htmlFor="nom" className="block text-sm font-semibold text-[#3D3A31] mb-1.5">
                        Nom complet *
                      </label>
                      <input
                        id="nom"
                        type="text"
                        required
                        autoComplete="name"
                        value={data.nom}
                        onChange={(e) => setData({ ...data, nom: e.target.value })}
                        className="w-full border border-[#D4D0C3] rounded-[4px] px-4 text-[#1E1C17] placeholder:text-[#B8B3A2] focus:border-[#C8A55A] focus:outline-none focus:ring-2 focus:ring-[#C8A55A]/20 transition-colors"
                        style={{ minHeight: "48px" }}
                        placeholder="Jean Dupont"
                      />
                    </div>
                    <div>
                      <label htmlFor="tel" className="block text-sm font-semibold text-[#3D3A31] mb-1.5">
                        Téléphone *
                      </label>
                      <input
                        id="tel"
                        type="tel"
                        required
                        autoComplete="tel"
                        value={data.tel}
                        onChange={(e) => setData({ ...data, tel: e.target.value })}
                        className="w-full border border-[#D4D0C3] rounded-[4px] px-4 text-[#1E1C17] placeholder:text-[#B8B3A2] focus:border-[#C8A55A] focus:outline-none focus:ring-2 focus:ring-[#C8A55A]/20 transition-colors"
                        style={{ minHeight: "48px" }}
                        placeholder="06 12 34 56 78"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-[#3D3A31] mb-1.5">
                        Description (optionnel)
                      </label>
                      <textarea
                        id="message"
                        rows={3}
                        value={data.message}
                        onChange={(e) => setData({ ...data, message: e.target.value })}
                        className="w-full border border-[#D4D0C3] rounded-[4px] px-4 py-3 text-[#1E1C17] placeholder:text-[#B8B3A2] focus:border-[#C8A55A] focus:outline-none focus:ring-2 focus:ring-[#C8A55A]/20 transition-colors resize-none"
                        placeholder="Décrivez brièvement le problème..."
                      />
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 gap-3">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="flex items-center gap-2 text-sm text-[#7A7566] hover:text-[#1E1C17] transition-colors px-4"
                      style={{ minHeight: "48px" }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                      </svg>
                      Retour
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 2 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step + 1)}
                      disabled={!canNext}
                      className="flex items-center gap-2 bg-[#1A1917] hover:bg-[#3D3A31] disabled:bg-[#D4D0C3] disabled:cursor-not-allowed text-white font-semibold text-sm px-6 rounded-[4px] transition-all duration-200"
                      style={{ minHeight: "48px" }}
                    >
                      Suivant
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!canNext}
                      className="flex items-center gap-2 bg-[#C8A55A] hover:bg-[#E2C47A] disabled:bg-[#D4D0C3] disabled:cursor-not-allowed text-[#1A1917] font-bold text-sm px-6 rounded-[4px] transition-all duration-200 hover:shadow-[0_4px_24px_rgba(200,165,90,0.35)]"
                      style={{ minHeight: "48px" }}
                    >
                      Envoyer ma demande
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                      </svg>
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
