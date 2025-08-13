import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VeganProfiles from "./components/VeganProfiles";
import AnimalsKilledBox from "./components/AnimalsKilledBox";
import VeganImpactBox from "./components/VeganImpactBox";
import veganTrendChart from "./assets/global_vegan_chart.png";

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

  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % statements.length);
        setVisible(true);
      }, 220);
    }, 7000);
    return () => clearInterval(timer);
  }, [statements.length]);

  return (
    <div className="px-4 pt-10 pb-20 text-[#3a3a3a]">
      {/* Hero section */}
      <section className="max-w-4xl mx-auto text-center p-6 border border-gray-200 rounded-2xl shadow-sm bg-[#f9f9f7] mb-10">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#265947] mb-2">
          The Right Side of History
        </h1>
        <p
          key={idx}
          aria-live="polite"
          className={`text-lg md:text-xl font-serif text-gray-800 mb-6 transition-opacity duration-200 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          {statements[idx]}
        </p>
        <p className="text-lg md:text-xl leading-relaxed">
          The world is moving toward compassion. People are waking up and
          plant-based living is spreading—in shops, schools, stadiums, and
          homes. Movements start as whispers and then become the norm. There
          will be a time when exploiting and killing animals <strong>was</strong> normal.
        </p>
        <p className="mt-4 text-lg italic text-[#265947] tracking-wide font-medium">
          Would you want to be the last person defending an old cruelty?
        </p>
      </section>

      {/* Momentum / data cards */}
      <section className="max-w-4xl mx-auto mt-12 grid md:grid-cols-3 gap-6">
        {/* Box 1 */}
        <AnimalsKilledBox />

        {/* Box 2 */}
        <div className="p-4 rounded-xl border border-gray-200 bg-white/70 shadow-sm flex flex-col">
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
    Still wondering? Start here.
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
            Three huge reasons; morals, environment and your health.
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
            <path d="M9 20v-6h6v6" stroke="#265947" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-[#265947]">Where does my meat come from?</h3>
          <p className="text-sm text-gray-600 mt-1">
            Factories, small, large, local or "humane.
          </p>
          <p className="mt-2 text-sm text-[#265947] group-hover:underline">Read about meat farms →</p>
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
