// src/components/VeganProfiles.jsx
import React from "react";
import { Link } from "react-router-dom";
import veganProfiles from "../data/vegan_people.json";

export default function VeganProfiles() {
  const placeholder = "https://via.placeholder.com/640x360?text=Vegan+profile";

  return (
    <div className="max-w-6xl mx-auto px-4 pt-6 pb-4">
      {/* Section heading */}
      <header className="mb-8">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#265947]">Vegan people you know</h2>
        <p className="text-sm md:text-base text-gray-700 mt-2">
          Real people across sports, entertainment, and public life—thriving on a vegan lifestyle.
        </p>
      </header>

      {veganProfiles.map((category, idx) => {
        // Bulletproof: map by section position (1: Athletes, 2: Actors, 3: Internet/Media/Public Figures)
        let to = "/people?diet=vegan"; // safe fallback
        if (idx === 0) to = "/people?category=athletes&diet=vegan";
        else if (idx === 1) to = "/people?category=actors&diet=vegan";
        else if (idx === 2) to = "/people?category=internet-media-public-figures&diet=vegan";

        return (
          <section key={category.category || idx} className="mb-10 last:mb-4">
            {/* Category heading + Show more */}
            <div className="flex items-end justify-between mb-2">
              <h3 className="text-2xl font-bold text-[#265947] font-serif">{category.category}</h3>

              <Link
                to={to}
                className="group inline-flex items-center gap-1 text-sm font-semibold text-[#1f4a3a] px-3 py-1.5 rounded-full hover:bg-[#e8f3ee] hover:underline focus:outline-none focus:ring-2 focus:ring-[#265947]/40 transition"
              >
                <span>More</span>
                <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </Link>
            </div>

            {/* Category blurb */}
            <p className="text-gray-700 mb-8">{category.description}</p>

            {/* Card grid */}
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {category.profiles.map((person) => {
                const role = person.sport || person.specialty || person.field || "";
                return (
                  <article
                    key={person.name}
                    className="group bg-white rounded-xl shadow-sm ring-1 ring-black/5 hover:ring-[#265947]/20 transition hover:-translate-y-0.5 duration-200 overflow-hidden"
                  >
                    {/* Image */}
                    <div className="relative">
                      <img
                        src={person.image || placeholder}
                        alt={person.name}
                        className="w-full h-48 object-cover object-top"
                        loading="lazy"
                        onError={(e) => {
                          if (e.currentTarget.src !== placeholder) {
                            e.currentTarget.src = placeholder;
                          }
                        }}
                      />
                    </div>

                    {/* Body */}
                    <div className="p-4">
                      <h4 className="text-lg font-semibold mb-0.5">{person.name}</h4>
                      {role && <p className="text-sm text-[#265947] font-medium">{role}</p>}
                      {person.achievements && (
                        <p className="mt-2 text-sm text-gray-700 line-clamp-3 overflow-hidden">{person.achievements}</p>
                      )}
                      {person.veganSince && (
                        <p className="mt-2 text-xs text-gray-500">Vegan since {person.veganSince}</p>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
