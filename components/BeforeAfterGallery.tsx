"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

const PROJECTS = [
  {
    title: "Salle de bain complète",
    location: "Montpellier Centre",
    before: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=75",
    after: "https://images.unsplash.com/photo-1620626011761-996317702519?w=800&q=75",
    duration: "5 jours",
  },
  {
    title: "Cuisine rénovée",
    location: "Lattes",
    before: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=75",
    after: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=75",
    duration: "2 jours",
  },
  {
    title: "Douche à l'italienne",
    location: "Castelnau-le-Lez",
    before: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=75",
    after: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=800&q=75",
    duration: "3 jours",
  },
];

function SliderCard({ project }: { project: (typeof PROJECTS)[0] }) {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 2), 98);
    setPosition(pct);
  }, []);

  return (
    <div className="rounded-[4px] overflow-hidden border border-[#E8E5DB] shadow-[0_2px_12px_rgba(30,28,23,0.10)]">
      {/* Slider */}
      <div
        ref={containerRef}
        className="relative h-64 sm:h-80 cursor-ew-resize select-none"
        onMouseDown={(e) => { setDragging(true); updatePosition(e.clientX); }}
        onMouseMove={(e) => { if (dragging) updatePosition(e.clientX); }}
        onMouseUp={() => setDragging(false)}
        onMouseLeave={() => setDragging(false)}
        onTouchStart={(e) => { setDragging(true); updatePosition(e.touches[0].clientX); }}
        onTouchMove={(e) => { if (dragging) updatePosition(e.touches[0].clientX); }}
        onTouchEnd={() => setDragging(false)}
        aria-label={`Comparaison avant/après : ${project.title}`}
        role="img"
      >
        {/* AFTER (base layer) */}
        <Image
          src={project.after}
          alt={`Après rénovation — ${project.title}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        {/* BEFORE (clipped layer) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={project.before}
            alt={`Avant rénovation — ${project.title}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/* Divider */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10 pointer-events-none"
          style={{ left: `${position}%` }}
        >
          {/* Handle */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1917" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M8 3l-5 9 5 9M16 3l5 9-5 9" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <span className="absolute top-3 left-3 bg-[#1A1917]/80 text-white text-xs font-semibold px-2 py-1 rounded-[4px] tracking-wide z-10">
          AVANT
        </span>
        <span className="absolute top-3 right-3 bg-[#C8A55A] text-[#1A1917] text-xs font-semibold px-2 py-1 rounded-[4px] tracking-wide z-10">
          APRÈS
        </span>
      </div>

      {/* Card info */}
      <div className="bg-white px-5 py-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-[#1E1C17]">{project.title}</h3>
            <p className="text-sm text-[#7A7566] mt-0.5">{project.location}</p>
          </div>
          <span className="text-xs text-[#9E7D35] bg-[#C8A55A]/10 border border-[#C8A55A]/20 px-2 py-1 rounded-[4px] font-semibold whitespace-nowrap">
            {project.duration}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function BeforeAfterGallery() {
  return (
    <section
      id="realisations"
      className="py-24 bg-white"
      aria-labelledby="gallery-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-14">
          <p className="text-xs text-[#C8A55A] font-semibold tracking-[0.25em] uppercase mb-3">
            Mes réalisations
          </p>
          <h2
            id="gallery-heading"
            className="text-[clamp(2.5rem,5vw,4.5rem)] text-[#1E1C17]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            AVANT / APRÈS
          </h2>
          <div className="mt-4 w-16 h-[3px] bg-[#C8A55A] rounded-full" />
          <p className="mt-4 text-[#5C5849] max-w-lg">
            Faites glisser le curseur pour comparer. Chaque projet est unique, chaque client mérite le meilleur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p) => (
            <SliderCard key={p.title} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
