import React, { useState } from "react";

export default function SourcesOfMeat() {
  const [expanded, setExpanded] = useState({
    factory: true,
    humane: true,
    backyard: true,
    commonThread: true,
  });

  const toggle = (section) =>
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));

  return (
    <div className="px-4 pt-8 pb-16 text-[#3a3a3a]">
      <h1 className="text-5xl font-bold text-center text-[#265947] mb-12 font-serif">
        Where Does Our Meat Come From?
      </h1>

      <section className="space-y-12 max-w-3xl mx-auto">
        {/*  Section 1: Factory Farms */}
        <div>
          <h2
            className="text-2xl font-semibold mb-2 text-[#265947] font-serif cursor-pointer"
            onClick={() => toggle("factory")}
          >
            Factory Farms: The Hidden Industry
          </h2>
          <p className="mb-2">
Over 90% of the meat we eat comes from factory farms — giant, hidden facilities designed to produce as much meat as possible, as cheaply as possible. Most people never see inside them. That’s not an accident.          </p>
          {expanded.factory && (
            <>
              <p className="text-gray-800 mb-4">
Factory farms are where most animals raised for food spend their short, painful lives. They’re crowded into warehouses by the thousands. Chickens packed so tightly they can’t spread their wings. Pigs stuck in crates so small they can’t even turn around. Cows living on concrete, hooked up to machines, treated like milk-making tools.

              </p>
              <p className="text-gray-800 mb-4">
Imagine living your entire life in a bathroom stall. Imagine never seeing the sun. Never feeling grass. Never being able to move freely. That’s daily reality for animals in factory farms.

              </p>
              <p className="text-gray-800 mb-4">
Many have parts of their bodies cut off to “save space” or stop them from attacking each other out of stress — beaks cut from baby chicks, tails chopped from piglets — all without painkillers. These aren’t rare exceptions. They’re normal.

              </p>
              <p className="text-gray-800 mb-4">
Even the animals themselves have been changed. Chickens are bred to grow so fast their bones break. Cows are forced to produce far more milk than their bodies can handle. It’s not about what’s natural — it’s about what makes the most money.

And the worst part? It’s all hidden from view. No windows. No cameras. No public tours. If factory farms were open to the public, would people still eat what comes out of them?

</p>

<p className="text-gray-800 mb-4">

If we saw what these animals go through, would we call it food — or would we call it cruelty?             

 </p>
            </>
          )}

          <button
            onClick={() => toggle("factory")}
            className="text-sm text-green-700 underline mt-2"
          >
            {expanded.factory ? "Read less" : "Read more"}
          </button>
        </div>

        {/*  Section 2: “Humane” Farms */}
        <div>
          <h2
            className="text-2xl font-semibold mb-2 text-[#265947] font-serif cursor-pointer"
            onClick={() => toggle("humane")}
          >
            “Humane” Farms: A Pretty Label
          </h2>
          <p className="mb-2">
            Some meat is marketed as “free-range,” “organic,” or “humane.” The truth is different. Besides, how humane is killing?
          </p>
          {expanded.humane && (
            <>
              <p className="text-gray-800 mb-4">
Imagine a farm ad: green pastures, smiling farmers, animals living their “best lives.” Now compare that to the reality. On most so-called “humane” farms, animals still live in crowded barns, are separated from their families, and are sent to the same slaughterhouses as factory-farmed animals. The only real difference? The label—and the price tag.              </p>
              <p className="text-gray-800 mb-4">
Labels like “free-range” and “organic” sound comforting, but they often mask the same harsh realities. Many “free-range” animals still spend most of their lives indoors. “Pasture-raised” often means limited outdoor access. And while the conditions may be less extreme than factory farms, the end is the same.

              </p>
              <p className="text-gray-800 mb-4">
Animals on “humane” farms are still separated from their babies, still undergo painful procedures, and still face slaughter at a fraction of their natural lifespan. Whether it’s a gas chamber for pigs or a bolt gun to the head for cows, killing is never kind—especially when it’s avoidable.

              </p>
              <p className="text-gray-800">
Marketing can dress up cruelty in softer language, but it can’t change the reality. If you wouldn’t do it to a dog or cat, why accept it for a cow or chicken? Labels don’t erase suffering. They just make it easier to ignore.

              </p>
            </>
          )}

          <button
            onClick={() => toggle("humane")}
            className="text-sm text-green-700 underline mt-2"
          >
            {expanded.humane ? "Read less" : "Read more"}
          </button>
        </div>

        {/* Backyard Chickens & Local Farms Section */}
<div>
  <h2
    className="text-2xl font-semibold mb-2 text-[#265947] font-serif cursor-pointer"
    onClick={() => toggle("backyard")}
  >
    Backyard Chickens & Local Farms: The Myth of Innocence
  </h2>
  <p className="mb-2">
    At first glance, small-scale farms and backyard chickens seem wholesome — a peaceful alternative to industrial meat. It feels more personal, even compassionate. But behind the cozy imagery, the same pattern remains: animals are used, exploited, and killed.
  </p>
  {expanded.backyard && (
    <>
      <p className="text-gray-800 mb-4">
        Hens are bred to lay far more eggs than nature ever intended — which depletes their bodies and leads to painful health issues. Male chicks, who can’t lay eggs and don’t grow fast enough for meat, are usually killed within days of hatching. Even on small farms.
      </p>
      <p className="text-gray-800 mb-4">
        Many people raise backyard chickens with affection. They name them, feed them scraps, give them room to roam. But when egg production slows or the holidays come around, kindness often turns into slaughter. The same animal, just a different day.
      </p>
      <p className="text-gray-800 mb-4">
        We tell ourselves it’s different when it’s “local.” But local doesn’t mean painless. Familiarity doesn’t erase fear. And proximity doesn’t undo exploitation. Even small-scale farms rely on the same core idea: that animals exist for our use.
      </p>
      <p className="text-gray-800">
        Personal care doesn’t cancel out structural harm. It just hides it behind a friendlier face. If we’re serious about compassion, it shouldn’t stop at scale — it should challenge the very idea of killing animals we claim to care about.
      </p>
    </>
  )}
  <button
    onClick={() => toggle("backyard")}
    className="text-sm text-green-700 underline mt-2"
  >
    {expanded.backyard ? "Read less" : "Read more"}
  </button>
</div>

{/* Section 4 - The Common Thread */}
<div>
  <h2
    className="text-2xl font-semibold mb-2 text-[#265947] font-serif cursor-pointer"
    onClick={() => toggle("commonThread")}
  >
    The Common Thread: Death is the Destination
  </h2>
  <p className="mb-2">
    Whether it’s a vast factory farm or a quiet backyard coop, the journey ends the same. Every animal raised for meat is killed—young, scared, and unwilling.
  </p>
  {expanded.commonThread && (
    <>
      <p className="text-gray-800 mb-4">
        Some are gassed in chambers. Some are shot with bolt guns. Some have their throats slit by hand. It doesn’t matter how nicely they were raised, how organic their feed was, or how green the pasture looked. They all meet the same blade.
      </p>
      <p className="text-gray-800 mb-4">
        These animals aren’t signing up for this. They don’t walk willingly into slaughterhouses. They struggle. They resist. They want to live—just like the dogs we adore or the cats we cradle at night.
      </p>
      <p className="text-gray-800 mb-4">
        We often tell ourselves it’s “just how nature works,” or “they had a good life.” But a good life doesn’t make an unjust death fair. Especially when that death exists purely for our convenience, our habits, or our taste preferences.
      </p>
      <p className="text-gray-800 mb-4">
        So we have to ask ourselves: Is taste really a good enough reason? Is a few minutes of flavor on our tongues worth a lifetime taken from someone else?
      </p>
      <p className="text-gray-800">
        Because no matter how the story begins—big farm, small farm, or backyard coop—it always ends the same. And that ending deserves our full attention.
      </p>
    </>
  )}
  <button
    onClick={() => toggle("commonThread")}
    className="text-sm text-green-700 underline mt-2"
  >
    {expanded.commonThread ? "Read less" : "Read more"}
  </button>
</div>


      </section>
    </div>
  );
}
