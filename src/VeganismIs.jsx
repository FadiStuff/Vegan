import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";

function CrossfadeWithGhost({
  statements,
  interval = 9000,
  fadeMs = 2500,
  className = "",
  ghostClass = "text-red-300 blur-[1px]",
  ghostTransform = "translate(4px, 2px)",
  ghostLagMs = 100,
  ghostPeak = 0.45,
}) {
  const [index, setIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [progress, setProgress] = useState(0);

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

  const ghostProgress = Math.min(1, Math.max(0, progress - ghostLagMs / fadeMs));
  const ghostOpacity =
    Math.max(0, Math.min(1, 4 * ghostProgress * (1 - ghostProgress))) * ghostPeak;

  return (
    <div
      className="relative mt-8 flex items-center justify-center overflow-hidden"
      style={{ minHeight: "2.25rem" }}
      aria-live="polite"
    >
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

      <span className={`opacity-0 ${className}`}>
        {statements[index].length > statements[nextIndex].length
          ? statements[index]
          : statements[nextIndex]}
      </span>
    </div>
  );
}

export default function VeganismIs() {
  const statements = [
    "Let’s not take a life for the taste of a meal.",
    "Let’s not steal a mother’s milk for the thrill of dessert.",
    "Let’s not wear the skin of another and call it style.",
  ];

  return (
    <>
      {/* 🔍 SEO Helmet */}
      <Helmet>
        <title>Veganism Is | Plants Over Pain</title>
        <meta
          name="description"
          content="Veganism is a way of living that avoids using animals for food, clothing, or other purposes, rooted in compassion and responsibility."
        />
        <link rel="canonical" href="https://plantsoverpain.org/veganism-is" />
      </Helmet>

      <div className="px-4 py-16 bg-[#f8f9f6]">
        <section className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#265947] mb-8">
            Veganism Is
          </h1>

          <div className="bg-white/80 border border-[#dbe3dd] rounded-2xl shadow-sm p-8 md:p-12">
            <p className="text-xl md:text-2xl font-serif leading-relaxed text-[#2a2a2a]">
              Veganism is a way of living that avoids using animals for food,
              clothing, or other purposes. It’s based on the understanding that{" "}
              <span className="italic text-[#265947]">
                animals are not ours to exploit
              </span>
              . As conscious, intelligent beings, we have a responsibility to
              protect those who are weaker — not profit from them.
            </p>
          </div>

          <CrossfadeWithGhost
            statements={statements}
            interval={9000}
            fadeMs={2500}
            className="text-lg md:text-xl font-serif text-[#2a1717] tracking-tight"
          />

          <div className="mt-10">
            <a
              href="/whyvegan"
              className="inline-block bg-[#265947] text-white text-lg px-6 py-3 rounded-lg shadow-sm hover:bg-[#1e4537] transition"
            >
              Learn Why Vegan
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
