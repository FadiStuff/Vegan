// src/HomeTest.jsx
import React from "react";
import { Link } from "react-router-dom";
import AnimalsKilledBox from "./components/AnimalsKilledBox";
import VeganImpactBox from "./components/VeganImpactBox";
import veganTrendChart from "./assets/global_vegan_chart.png";

export default function HomeTest() {
  return (
    <div className="px-4 pt-8 pb-16 text-[#3a3a3a]">
      {/* 1) HERO */}
      <section className="max-w-4xl mx-auto text-center p-6 border border-gray-200 rounded-2xl shadow-sm bg-[#f9f9f7] mb-10">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#265947]">
          The world is going vegan.
        </h1>
        <p className="mt-3 text-lg md:text-xl">
          Billions of lives, trillions of litres of water, and our climate future — all moved by one choice.
        </p>
        <div className="mt-5 flex items-center justify-center gap-3">
          <Link to="/whyvegan" className="px-5 py-2 rounded-full bg-[#265947] text-white hover:opacity-95">
            Why Vegan?
          </Link>
          <a href="#momentum" className="px-5 py-2 rounded-full border border-[#265947] text-[#265947] hover:bg-[#f0f9f5]">
            See the movement
          </a>
        </div>
      </section>

      {/* 2) MOMENTUM STATS */}
      <section id="momentum" className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
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

      {/* 3) ANALOGY STRIP */}
      <section className="max-w-4xl mx-auto mt-10 text-center p-5 rounded-xl border border-gray-200 bg-white/60 shadow-sm">
        <p className="text-lg md:text-xl font-serif text-[#265947]">
          People once defended things we now find unthinkable. Today, some defend eating animals.
        </p>
      </section>

      {/* 4) FACES (teaser) */}
      <section className="max-w-4xl mx-auto mt-10">
        <h2 className="text-2xl font-serif text-[#265947] mb-3">Faces of the movement</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-gray-200 bg-white/70 shadow-sm">
            <p className="text-sm text-gray-600">Athletes thriving on plants.</p>
            <Link to="/vegan-athletes" className="text-sm text-[#265947] hover:underline mt-2 inline-block">See athletes →</Link>
          </div>
          <div className="p-4 rounded-xl border border-gray-200 bg-white/70 shadow-sm">
            <p className="text-sm text-gray-600">Artists and public figures speaking up.</p>
            <Link to="/vegan-celebrities" className="text-sm text-[#265947] hover:underline mt-2 inline-block">See celebrities →</Link>
          </div>
          <div className="p-4 rounded-xl border border-gray-200 bg-white/70 shadow-sm">
            <p className="text-sm text-gray-600">Doctors and dietitians leading by example.</p>
            <Link to="/vegan-health-pros" className="text-sm text-[#265947] hover:underline mt-2 inline-block">See health pros →</Link>
          </div>
        </div>
      </section>

      {/* 5) MYTH CARDS (teaser) */}
      <section className="max-w-4xl mx-auto mt-10">
        <h2 className="text-2xl font-serif text-[#265947] mb-3">Myth vs fact</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm">
            <p className="text-sm font-semibold">“Vegans don’t get protein.”</p>
            <p className="text-sm text-gray-600 mt-1">They do. Easily. Beans, tofu, seitan, lentils.</p>
          </div>
          <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm">
            <p className="text-sm font-semibold">“It’s too hard.”</p>
            <p className="text-sm text-gray-600 mt-1">Habit is hard. The swap isn’t.</p>
          </div>
          <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm">
            <p className="text-sm font-semibold">“One person won’t matter.”</p>
            <p className="text-sm text-gray-600 mt-1">But one person is exactly how it starts.</p>
          </div>
        </div>
        <Link to="/arguments" className="inline-block mt-3 text-sm text-[#265947] hover:underline">See all arguments →</Link>
      </section>

      {/* 6) ACTION HUB */}
      <section className="max-w-4xl mx-auto mt-10">
        <h2 className="text-2xl font-serif text-[#265947] mb-4">Still wondering? Start here.</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link to="/whyvegan" className="group p-5 rounded-2xl border border-gray-200 bg-white hover:shadow-md hover:-translate-y-0.5 transition">
            <h3 className="font-semibold text-[#265947]">Why should I be vegan too?</h3>
            <p className="text-sm text-gray-600 mt-1">Ethics, environment, health — the clear case.</p>
            <p className="mt-2 text-sm text-[#265947] group-hover:underline">Open the case →</p>
          </Link>
          <Link to="/sourcesofmeat" className="group p-5 rounded-2xl border border-gray-200 bg-white hover:shadow-md hover:-translate-y-0.5 transition">
            <h3 className="font-semibold text-[#265947]">Where does my meat come from?</h3>
            <p className="text-sm text-gray-600 mt-1">Factory farms, “family” farms, fish — the reality.</p>
            <p className="mt-2 text-sm text-[#265947] group-hover:underline">See the sources →</p>
          </Link>
          <Link to="/arguments" className="group p-5 rounded-2xl border border-gray-200 bg-white hover:shadow-md hover:-translate-y-0.5 transition">
            <h3 className="font-semibold text-[#265947]">I’ve got issues, dilemmas, questions.</h3>
            <p className="text-sm text-gray-600 mt-1">Quick, no-fluff answers to the usual objections.</p>
            <p className="mt-2 text-sm text-[#265947] group-hover:underline">Get answers →</p>
          </Link>
        </div>
      </section>

      {/* 7) FINAL CTA */}
      <section className="max-w-4xl mx-auto mt-12 text-center p-6 rounded-2xl bg-[#eaf6f0] border border-[#cfe6db]">
        <h2 className="text-2xl font-serif text-[#265947]">Join the right side of history.</h2>
        <p className="text-sm text-gray-700 mt-2">Every day you act, you save lives. Every day you wait, you don’t.</p>
        <div className="mt-4 flex items-center justify-center gap-3">
          <Link to="/whyvegan" className="px-5 py-2 rounded-full bg-[#265947] text-white hover:opacity-95">Start here</Link>
          <Link to="/arguments" className="px-5 py-2 rounded-full border border-[#265947] text-[#265947] hover:bg-[#f0f9f5]">I have questions</Link>
        </div>
      </section>
    </div>
  );
}
