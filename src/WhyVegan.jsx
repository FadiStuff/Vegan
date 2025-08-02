import React, { useState } from "react";

export default function WhyVegan() {
  const [expanded, setExpanded] = useState({
    ethics: false,
    environment: false,
    health: false,
  });

  const toggle = (section) =>
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));

  return (
    <div className="px-4 pt-8 pb-16 text-[#3a3a3a]">
      <h1 className="text-4xl font-bold text-center text-[#265947] mb-12 font-serif">
        Why Vegan?
      </h1>

      <section className="space-y-12 max-w-3xl mx-auto">
        {/* 🧘 Ethics Section */}
        <div>
          <h2
            className="text-2xl font-semibold mb-2 text-[#265947] font-serif cursor-pointer"
            onClick={() => toggle("ethics")}
          >
            🧘 Ethics: Because animals are not ours to use
          </h2>
          <p className="mb-2">
            Animals feel pain, form bonds, and experience fear—just like us. But in factory farms, they’re treated like machines. Veganism means opting out of that system and choosing compassion over convenience.
          </p>
          {expanded.ethics && (
            <>
              <p className="text-gray-800 mb-4">
                Animals feel pain, form bonds, and experience fear—just like us. They seek comfort, safety, and connection. And yet in factory farms, they’re treated like machines: packed into crowded cages or stalls, mutilated without anesthesia, and denied everything that would make their lives worth living.
              </p>
              <p className="text-gray-800 mb-4">
                Each year, billions of land animals and trillions of sea creatures are bred and killed—not for survival, but because we like the taste. Most will never know a moment of freedom or compassion. They are born into violence and die in fear.
              </p>
              <p className="text-gray-800 mb-4">
                Veganism means opting out of this system. It's about recognizing that might does not make right, and that convenience is not a valid excuse for cruelty. Just because we can exploit others doesn't mean we should. Choosing a vegan lifestyle is a way of saying, “I see you. I know you matter. I refuse to be part of your suffering.”
              </p>
              <p className="text-gray-800 mb-4">
                And the truth is, we don’t need animal products to live full, healthy, happy lives. In a world with alternatives at every grocery store and every café, continuing to harm animals becomes a choice—not a necessity. Veganism is not about being perfect. It's about doing the least harm we can in a deeply flawed system—and aligning our actions with our values.
              </p>
              <p className="text-gray-800">
                If you believe in kindness, fairness, and justice, then veganism is simply an extension of those values. It’s about making sure our compassion doesn’t stop at the species line.
              </p>
            </>
          )}
          <button
            onClick={() => toggle("ethics")}
            className="text-sm text-green-700 underline mt-2"
          >
            {expanded.ethics ? "Read less" : "Read more"}
          </button>
        </div>

        {/* 🌍 Environment Section */}
        <div>
          <h2
            className="text-2xl font-semibold mb-2 text-[#265947] font-serif cursor-pointer"
            onClick={() => toggle("environment")}
          >
            🌍 Environment: Because we only have one planet
          </h2>
          <p className="mb-2">
            Animal agriculture is a leading driver of deforestation, water use, and greenhouse gas emissions. A plant-based diet is one of the simplest ways to reduce your footprint—no protest signs required.
          </p>
          {expanded.environment && (
            <>
              <p className="text-gray-800 mb-4">
                Animal agriculture is one of the most environmentally destructive industries on the planet. It’s a leading driver of deforestation, water pollution, biodiversity loss, and greenhouse gas emissions. Forests are cleared to make room for grazing cattle or to grow crops like soy—most of which is fed to livestock, not humans.
              </p>
              <p className="text-gray-800 mb-4">
                The industry also consumes staggering amounts of water. It takes thousands of liters to produce a single kilogram of beef. Waste from factory farms contaminates rivers and groundwater, creating dead zones in oceans and harming aquatic ecosystems. And then there’s methane—a potent greenhouse gas released by cows and other ruminants in massive quantities.
              </p>
              <p className="text-gray-800 mb-4">
                What makes this worse is how inefficient it all is. We funnel huge quantities of food, water, and land through animals just to get a small return in meat, dairy, or eggs. It’s like burning a house to toast a marshmallow.
              </p>
              <p className="text-gray-800">
                Choosing a vegan diet is one of the most effective ways to reduce your personal environmental impact. You don’t need to be a climate scientist or an activist to make a difference. You just need to eat differently. Every plant-based meal is a quiet act of resistance against destruction—and a step toward a more sustainable future.
              </p>
            </>
          )}
          <button
            onClick={() => toggle("environment")}
            className="text-sm text-green-700 underline mt-2"
          >
            {expanded.environment ? "Read less" : "Read more"}
          </button>
        </div>

        {/* 💪 Health Section */}
        <div>
          <h2
            className="text-2xl font-semibold mb-2 text-[#265947] font-serif cursor-pointer"
            onClick={() => toggle("health")}
          >
            💪 Health: Because your body deserves better too
          </h2>
          <p className="mb-2">
            Done right, a vegan diet is rich in fiber, low in saturated fat, and backed by every major nutrition body on Earth. It won’t make you perfect, but it might just help you thrive.
          </p>
          {expanded.health && (
            <>
              <p className="text-gray-800 mb-4">
                A well-planned vegan diet can support a strong, healthy body at every stage of life—from infancy to old age. It's rich in fiber, antioxidants, vitamins, and plant-based proteins, and typically lower in saturated fat and cholesterol than animal-heavy diets. That’s not fringe science—it’s the position of major health organizations worldwide.
              </p>
              <p className="text-gray-800 mb-4">
                Research shows that vegans tend to have lower risks of heart disease, high blood pressure, type 2 diabetes, and certain cancers. Whole plant foods—like legumes, whole grains, nuts, seeds, fruits, and vegetables—form the foundation of many of the longest-lived populations on Earth. That’s not a coincidence.
              </p>
              <p className="text-gray-800 mb-4">
                Of course, like any diet, veganism isn’t automatically healthy. You can eat nothing but fries and still call it vegan. But with a little intention and variety, you can get everything you need—including calcium, iron, omega-3s, and yes, even protein. B₁₂ isn’t found in plants, but it’s easy to supplement—and most farm animals are supplemented with it anyway.
              </p>
              <p className="text-gray-800 mb-4">
                Being healthy on a vegan diet doesn’t require perfection—it just takes paying attention. Fortunately, we live in a time when plant-based foods and fortified options are everywhere, from grocery stores to restaurants to online meal kits. It’s never been easier.
              </p>
              <p className="text-gray-800">
                Choosing veganism isn’t just about ethics or the planet—it’s also about taking care of yourself. It’s about living with more energy, more awareness, and fewer compromises. Your body deserves that.
              </p>
            </>
          )}
          <button
            onClick={() => toggle("health")}
            className="text-sm text-green-700 underline mt-2"
          >
            {expanded.health ? "Read less" : "Read more"}
          </button>
        </div>
      </section>
    </div>
  );
}
