import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

export default function WhyVegan() {
  const [activeTab, setActiveTab] = useState("ethical");

  const tabs = [
    {
      id: "ethical",
      title: "🧘 Ethics",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-serif font-semibold text-[#265947]">
            Because animals are not ours to use
          </h3>
          <p>
            Animals feel pain, form bonds, and experience fear—just like us. They
            seek comfort, safety, and connection. And yet in factory farms,
            they’re treated like machines: packed into crowded cages or stalls,
            mutilated without anesthesia, and denied everything that would make
            their lives worth living.
          </p>
          <p>
            Each year, billions of land animals and trillions of sea creatures
            are bred and killed—not for survival, but because we like the taste.
            Most will never know a moment of freedom or compassion. They are born
            into violence and die in fear.
          </p>
          <p>
            Veganism means opting out of this system. It's about recognizing that
            might does not make right, and that convenience is not a valid excuse
            for cruelty. Just because we can exploit others doesn't mean we
            should. Choosing a vegan lifestyle is a way of saying, “I see you. I
            know you matter. I refuse to be part of your suffering.”
          </p>
          <p>
            And the truth is, we don’t need animal products to live full,
            healthy, happy lives. In a world with alternatives at every grocery
            store and every café, continuing to harm animals becomes a choice—not
            a necessity. Veganism is not about being perfect. It's about doing
            the least harm we can in a deeply flawed system—and aligning our
            actions with our values.
          </p>
          <p>
            If you believe in kindness, fairness, and justice, then veganism is
            simply an extension of those values. It’s about making sure our
            compassion doesn’t stop at the species line.
          </p>
        </div>
      ),
    },
    {
      id: "environment",
      title: "🌍 Environment",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-serif font-semibold text-[#265947]">
            Because we only have one planet
          </h3>
          <p>
            Animal agriculture is one of the most environmentally destructive
            industries on the planet. It’s a leading driver of deforestation,
            water pollution, biodiversity loss, and greenhouse gas emissions.
            Forests are cleared to make room for grazing cattle or to grow crops
            like soy—most of which is fed to livestock, not humans.
          </p>
          <p>
            The industry also consumes staggering amounts of water. It takes
            thousands of liters to produce a single kilogram of beef. Waste from
            factory farms contaminates rivers and groundwater, creating dead zones
            in oceans and harming aquatic ecosystems. And then there’s methane—a
            potent greenhouse gas released by cows and other ruminants in massive
            quantities.
          </p>
          <p>
            What makes this worse is how inefficient it all is. We funnel huge
            quantities of food, water, and land through animals just to get a
            small return in meat, dairy, or eggs. It’s like burning a house to
            toast a marshmallow.
          </p>
          <p>
            Choosing a vegan diet is one of the most effective ways to reduce
            your personal environmental impact. You don’t need to be a climate
            scientist or an activist to make a difference. You just need to eat
            differently. Every plant-based meal is a quiet act of resistance
            against destruction—and a step toward a more sustainable future.
          </p>
        </div>
      ),
    },
    {
      id: "health",
      title: "💪 Health",
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-serif font-semibold text-[#265947]">
            Because your body deserves better too
          </h3>
          <p>
            A well-planned vegan diet can support a strong, healthy body at every
            stage of life—from infancy to old age. It's rich in fiber,
            antioxidants, vitamins, and plant-based proteins, and typically lower
            in saturated fat and cholesterol than animal-heavy diets. That’s not
            fringe science—it’s the position of major health organizations
            worldwide.
          </p>
          <p>
            Research shows that vegans tend to have lower risks of heart disease,
            high blood pressure, type 2 diabetes, and certain cancers. Whole
            plant foods—like legumes, whole grains, nuts, seeds, fruits, and
            vegetables—form the foundation of many of the longest-lived
            populations on Earth. That’s not a coincidence.
          </p>
          <p>
            Of course, like any diet, veganism isn’t automatically healthy. You
            can eat nothing but fries and still call it vegan. But with a little
            intention and variety, you can get everything you need—including
            calcium, iron, omega-3s, and yes, even protein. B₁₂ isn’t found in
            plants, but it’s easy to supplement—and most farm animals are
            supplemented with it anyway.
          </p>
          <p>
            Being healthy on a vegan diet doesn’t require perfection—it just
            takes paying attention. Fortunately, we live in a time when
            plant-based foods and fortified options are everywhere, from grocery
            stores to restaurants to online meal kits. It’s never been easier.
          </p>
          <p>
            Choosing veganism isn’t just about ethics or the planet—it’s also
            about taking care of yourself. It’s about living with more energy,
            more awareness, and fewer compromises. Your body deserves that.
          </p>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* 🔍 SEO Helmet */}
      <Helmet>
        <title>Why Go Vegan? | Plants Over Pain</title>
        <meta
          name="description"
          content="Explore ethical, environmental, and health reasons to go vegan, with evidence-based insights and practical guidance."
        />
        <link rel="canonical" href="https://plantsoverpain.org/whyvegan" />
      </Helmet>

      <div className="px-4 pt-10 pb-20 text-[#3a3a3a]">
        <section className="max-w-4xl mx-auto text-center p-6 border border-gray-200 rounded-2xl shadow-sm bg-[#f9f9f7] mb-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#265947] mb-4">
            Why Vegan?
          </h1>
          <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto text-gray-700 mb-6">
            At its heart, veganism is about compassion for animals—choosing not
            to harm those who can think, feel, and suffer. In doing so, we also
            protect our planet and support our own health, creating a life that
            reflects our values in every bite.
          </p>

          {/* Tabs */}
          <div className="flex justify-center flex-wrap gap-2 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full border transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "bg-[#265947] text-white border-[#265947]"
                    : "bg-white text-[#265947] border-gray-300 hover:bg-gray-50"
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>

          {/* Content */}
          <div
            key={activeTab}
            className="text-left max-w-2xl mx-auto space-y-4 animate-[fadeIn_280ms_ease-out_forwards]"
          >
            {tabs.find((tab) => tab.id === activeTab)?.content}
          </div>
        </section>

        {/* tiny keyframes for the content fade */}
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(4px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </>
  );
}
