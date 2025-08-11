import React from "react";
import { Link } from "react-router-dom";
import VeganProfiles from "./components/VeganProfiles";


export default function RightSideOfHistory() {
  return (
    <div className="px-4 pt-10 pb-20 text-[#3a3a3a]">
      {/* Hero */}
      <section className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#265947] mb-4">
          The Right Side of History
        </h1>
        <p className="text-lg md:text-xl leading-relaxed">
          The world is moving toward compassion. Plant-based living keeps spreading—in shops,
          schools, stadiums, and homes. Movements start as whispers, then become the norm.
          The only question is: <span className="font-semibold">when</span> will you join?
        </p>
        <p className="mt-4 text-gray-600 italic">
          Would you want to be the last person defending an old cruelty? Don’t be the last to change.
        </p>
      </section>

      {/* Momentum cards */}
      <section className="max-w-4xl mx-auto mt-12 grid md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl border border-gray-200 bg-white shadow-sm">
          <h3 className="font-serif text-xl text-[#265947] mb-2">Momentum</h3>
          <p className="text-sm">
            Vegan options everywhere. Adoption curves are slow… then sudden. We’re in the “sudden.”
          </p>
        </div>
        <div className="p-5 rounded-2xl border border-gray-200 bg-white shadow-sm">
          <h3 className="font-serif text-xl text-[#265947] mb-2">Why it’s rising</h3>
          <ul className="text-sm list-disc list-inside space-y-1">
            <li>Ethics: less harm.</li>
            <li>Environment: lower footprint.</li>
            <li>Health: fiber up, cholesterol down.</li>
          </ul>
        </div>
        <div className="p-5 rounded-2xl border border-gray-200 bg-white shadow-sm">
          <h3 className="font-serif text-xl text-[#265947] mb-2">Inevitable?</h3>
          <p className="text-sm">
            Culture shifts tip. Every choice nudges the norm from “unusual” to “of course.”
          </p>
        </div>
      </section>

      {/* Role models */}
      <section className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-serif text-[#265947] mb-4">Proof in People</h2>
        <p className="text-sm mb-4">
          The stereotype is toast. Artists and world-class athletes thrive as vegans. See for yourself:
        </p>

        {/* Insert VeganProfiles component here */}
        <VeganProfiles />
      </section>

      {/* Data & links */}
      <section className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-serif text-[#265947] mb-4">Numbers & Next Steps</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl border border-gray-200 bg-white">
            <h4 className="font-semibold">Trends (coming soon)</h4>
            <p className="text-sm">Adoption by country and category, charted.</p>
          </div>
          <Link to="/whyvegan" className="p-5 rounded-2xl border border-gray-200 bg-white hover:shadow">
            <h4 className="font-semibold">Why vegan?</h4>
            <p className="text-sm">Ethics, environment, health—your core case.</p>
          </Link>
          <Link to="/arguments" className="p-5 rounded-2xl border border-gray-200 bg-white hover:shadow">
            <h4 className="font-semibold">Common arguments</h4>
            <p className="text-sm">Fast answers to the usual objections.</p>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto mt-14 text-center">
        <h2 className="text-2xl font-serif text-[#265947] mb-2">Choose your moment</h2>
        <p className="text-sm text-gray-700">Lead or lag. History remembers both—only one gets celebrated.</p>
        <div className="mt-4 flex items-center justify-center gap-3">
          <Link to="/whyvegan" className="px-5 py-2 rounded-full bg-[#265947] text-white hover:opacity-95">
            Start here
          </Link>
          <Link to="/arguments" className="px-5 py-2 rounded-full border border-[#265947] text-[#265947] hover:bg-[#f0f9f5]">
            I have questions
          </Link>
        </div>
      </section>
    </div>
  );
}
