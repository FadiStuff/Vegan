import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import VeganProfiles from "./components/VeganProfiles";
import AnimalsKilledBox from "./components/AnimalsKilledBox";
import VeganImpactBox from "./components/VeganImpactBox";
import veganTrendChart from "./assets/global_vegan_chart.png";

/* Crossfade with a lagged, subtle ghost that appears only during fade */
function CrossfadeWithGhost({
  statements,
  interval = 9000,
  fadeMs = 2500,
  className = "",
  ghostClass = "text-red-200 blur-[2px]",
  ghostTransform = "translate(6px, 3px)",
  ghostLagMs = 100, // ~0.1s lag so it trails
  ghostPeak = 0.6,  // max opacity at mid-fade
}) {
  const [index, setIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [progress, setProgress] = useState(0); // 0..1

  const rafRef = useRef(null);
  const startRef = useRef(null);
  const armedRef = useRef(false);

  useEffect(() => {
    const loop = (now) => {
      if (!startRef.current) startRef.current = now;
      const elapsed = now - startRef.current;
      const crossfadeStart = interval - fadeMs;

      if (elapsed >= crossfadeStart && !armedRef.current) {
        setNextIndex((index + 1) % statements.length);
        armedRef.current = true;
      }
      if (elapsed >= crossfadeStart) {
        const p = Math.min(1, (elapsed - crossfadeStart) / fadeMs);
        setProgress(p);
      }
      if (elapsed >= interval) {
        setIndex((i) => (i + 1) % statements.length);
        setProgress(0);
        startRef.current = now;
        armedRef.current = false;
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [index, interval, fadeMs, statements.length]);

  // Bell curve for ghost (only during fade), with a small lag
  const ghostProgress = Math.min(
    1,
    Math.max(0, progress - ghostLagMs / fadeMs)
  );
  const ghostOpacity = Math.max(0, Math.min(1, 4 * ghostProgress * (1 - ghostProgress))) * ghostPeak;

  return (
    <div
      className="relative mt-6 flex items-center justify-center overflow-hidden"
      style={{ minHeight: "2.25rem" }}
      aria-live="polite"
    >
      {/* GHOST (behind) — lagged and subtle */}
      <span
        className={`absolute ${className} ${ghostClass} select-none z-0`}
        style={{ opacity: ghostOpacity, transform: ghostTransform }}
        aria-hidden
      >
        {statements[index]}
      </span>
      <span
        className={`absolute ${className} ${ghostClass} select-none z-0`}
        style={{ opacity: ghostOpacity, transform: ghostTransform }}
        aria-hidden
      >
        {statements[nextIndex]}
      </span>

      {/* MAIN (front) */}
      <span
        className={`absolute transition-opacity ${className} z-10`}
        style={{ opacity: 1 - progress }}
      >
        {statements[index]}
      </span>
      <span
        className={`absolute transition-opacity ${className} z-10`}
        style={{ opacity: progress }}
      >
        {statements[nextIndex]}
      </span>

      {/* Spacer to stabilize width */}
      <span className={`opacity-0 ${className}`}>
        {statements[index].length > statements[nextIndex].length
          ? statements[index]
          : statements[nextIndex]}
      </span>
    </div>
  );
}

export default function RightSideOfHistory() {
  const statements = [
    "There was a time when slavery was normal.",
    "There was a time when women being property was normal.",
    "There was a time when children working in mines was normal.",
    "There was a time when humans being bought and sold was normal.",
    "There was a time when public hangings were normal.",
    "There was a time when paying to watch animals kill each other was normal.",
    "There was a time when dumping sewage into drinking water was normal.",
    "There was a time when segregated schools were normal.",
    "There was a time when wife-beating was normal.",
    "There was a time when killing whales for lamp oil was normal.",
    "There was a time when chaining elephants for entertainment was normal.",
    "There was a time when poisoning the air with lead was normal.",
  ];

  return (
    <div className="px-4 pt-10 pb-20 text-[#3a3a3a]">
      {/* Hero section */}
      <section className="max-w-4xl mx-auto text-center p-6 border border-gray-200 rounded-2xl shadow-sm bg-[#f9f9f7] mb-10">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#265947] mb-10">
          The Right Side of History
        </h1>

        {/* Crossfade + lagged, subtle ghost */}
        <CrossfadeWithGhost
          statements={statements}
          interval={9000}
          fadeMs={2500}
          className="text-lg md:text-xl font-serif font-semibold tracking-tight uppercase text-[#2a1717] leading-snug"
          // You can tweak these if you want it even subtler:
          // ghostClass="text-red-300 blur-[1px]"
          // ghostTransform="translate(4px, 2px)"
          // ghostLagMs={120}
          // ghostPeak={0.5}
        />

        <p className="text-lg md:text-xl leading-relaxed mt-2">
          Around the world, more people are awakening to the suffering we’ve long ignored — the cages, the chains, the cries of animals. 
          Menus are shifting, store shelves evolving, conversations changing. 
          One day, the idea of exploiting animals will seem as unthinkable as the cruelties we now condemn in history.
        </p>
        <p className="mt-4 text-lg italic text-[#265947] tracking-wide font-medium">
          When that day comes, will you be proud of the side you stood on… or haunted by it?
        </p>
      </section>

      {/* Momentum / data cards */}
      <section className="max-w-4xl mx-auto mt-12 grid md:grid-cols-3 gap-6">
        {/* Box 1 */}
        <AnimalsKilledBox />

        {/* Box 2 */}
        <div className="p-4 rounded-2xl border border-gray-200 bg-white/70 shadow-sm flex flex-col">
          <h3 className="text-lg font-semibold text-gray-500 tracking-wide text-center mb-3">
            % Global Vegan Over Time
          </h3>
          <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-md p-2 shadow-sm">
            <img
              src={veganTrendChart}
              alt="Estimated % of global population that is vegan, 2000–2025"
              className="w-full max-w-[640px] max-h-[400px] object-contain"
              loading="lazy"
            />
          </div>
        </div>

        {/* Box 3 */}
        <VeganImpactBox />
      </section>

      {/* Divider for profiles */}
      <div className="max-w-4xl mx-auto mt-14 mb-2 flex items-center gap-3">
        <span className="h-px bg-gray-200 flex-1" />
      </div>

      {/* Role models */}
      <section className="max-w-4xl mx-auto">
        <VeganProfiles />
      </section>

      {/* Action hub */}
      <section className="max-w-4xl mx-auto mt-4">
        <h2 className="text-2xl font-serif text-[#265947] mb-4">
          Join the right side of history.  
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Why Vegan */}
          <Link
            to="/whyvegan"
            className="group p-5 rounded-2xl border border-gray-200 bg-white hover:shadow-md hover:-translate-y-0.5 transition"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#e8f3ee] flex items-center justify-center shrink-0">
                {/* Leaf/heart icon */}
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 21s-7.5-4.9-7.5-10.3A4.7 4.7 0 0 1 9.3 6c1.4 0 2.3.6 2.7 1.3C12.4 6.6 13.3 6 14.7 6A4.7 4.7 0 0 1 19.5 10.7C19.5 16.1 12 21 12 21Z" stroke="#265947" strokeWidth="1.5" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[#265947]">Why should I be vegan too?</h3>
                <p className="text-sm text-gray-600 mt-1">
                  The big reasons:  Morals. Environment. Health
                </p>
                <p className="mt-2 text-sm text-[#265947] group-hover:underline">Read more →</p>
              </div>
            </div>
          </Link>

          {/* Sources of Meat */}
          <Link
            to="/sourcesofmeat"
            className="group p-5 rounded-2xl border border-gray-200 bg-white hover:shadow-md hover:-translate-y-0.5 transition"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#e8f3ee] flex items-center justify-center shrink-0">
                {/* Barn icon */}
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M4 20v-8l8-5 8 5v8M4 12h16" stroke="#265947" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path dName="M9 20v-6h6v6" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[#265947]">Where does my meat come from?</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Factories, small, large, local or "humane.
                </p>
                <p className="mt-2 text-sm text-[#265947] group-hover:underline">Meat farms →</p>
              </div>
            </div>
          </Link>

          {/* Arguments */}
          <Link
            to="/arguments"
            className="group p-5 rounded-2xl border border-gray-200 bg-white hover:shadow-md hover:-translate-y-0.5 transition"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#e8f3ee] flex items-center justify-center shrink-0">
                {/* Question bubble icon */}
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 19c4.4 0 8-2.9 8-6.5S16.4 6 12 6 4 8.9 4 12.5c0 1.5.6 2.8 1.7 3.9L5 20l3.8-1.4c1.1.3 2.3.4 3.2.4Z" stroke="#265947" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="14.5" r="0.9" fill="#265947"/>
                  <path d="M10.8 11.2c0-1 1-1.7 2.2-1.6 1 .1 1.7.6 1.8 1.4.1.7-.4 1.2-1.2 1.6-.7.3-1.2.7-1.2 1.4" stroke="#265947" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[#265947]">I’ve got issues, dilemmas, questions.</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Everyone does. Here's a collection of all arguments and responses.
                </p>
                <p className="mt-2 text-sm text-[#265947] group-hover:underline">Dive in →</p>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
