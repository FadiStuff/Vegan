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

  const Chevron = ({ open }) => (
    <svg
      className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
        open ? "rotate-180" : "rotate-0"
      }`}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 8l5 5 5-5"
        stroke="#265947"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className="px-4 pt-10 pb-20 text-[#3a3a3a]">
      {/* Hero */}
      <section className="max-w-4xl mx-auto text-center p-6 border border-gray-200 rounded-2xl shadow-sm bg-[#f9f9f7] mb-10">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#265947]">
          Where Does Our Meat Come From?
        </h1>
        <p className="mt-3 text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
          From factory farms to “humane” labels and backyard coops — the path
          looks different, but the destination is the same.
        </p>
      </section>

      {/* Sections — match WhyJustSomeAnimals width + cards */}
      <section className="max-w-4xl mx-auto space-y-5">
        {/* Factory Farms */}
        <article className="rounded-2xl border border-gray-200 bg-white/80 shadow-sm overflow-hidden">
          {/* Header / Toggle (full-width button, chevron on right) */}
          <button
            aria-expanded={expanded.factory}
            aria-controls="panel-factory"
            onClick={() => toggle("factory")}
            className="w-full flex items-center justify-between gap-3 text-left px-5 py-4 hover:bg-gray-50 transition"
          >
            <h2 className="text-xl md:text-2xl font-serif font-semibold text-[#265947]">
              Factory Farms: The Hidden Industry
            </h2>
            <Chevron open={expanded.factory} />
          </button>

          {/* Intro (always visible) */}
          <div className="px-5 pb-3 text-[17px] leading-relaxed text-[#2f2f2f]">
            <p>
              Over 90% of the meat we eat comes from factory farms — giant,
              hidden facilities designed to produce as much meat as possible, as
              cheaply as possible. Most people never see inside them. That’s not
              an accident.
            </p>
          </div>

          {/* Body (collapsible) */}
          <div
            id="panel-factory"
            className={`px-5 pb-5 text-[17px] leading-relaxed text-gray-800 transition-[opacity,transform] duration-200 ${
              expanded.factory ? "opacity-100 translate-y-0" : "hidden opacity-0 -translate-y-1"
            }`}
          >
            <p className="mb-4">
              Factory farms are where most animals raised for food spend their
              short, painful lives. They’re crowded into warehouses by the
              thousands. Chickens packed so tightly they can’t spread their
              wings. Pigs stuck in crates so small they can’t even turn around.
              Cows living on concrete, hooked up to machines, treated like
              milk-making tools.
            </p>
            <p className="mb-4">
              Imagine living your entire life in a bathroom stall. Imagine never
              seeing the sun. Never feeling grass. Never being able to move
              freely. That’s daily reality for animals in factory farms.
            </p>
            <p className="mb-4">
              Many have parts of their bodies cut off to “save space” or stop
              them from attacking each other out of stress — beaks cut from baby
              chicks, tails chopped from piglets — all without painkillers.
              These aren’t rare exceptions. They’re normal.
            </p>
            <p className="mb-0">
              Even the animals themselves have been changed. Chickens are bred
              to grow so fast their bones break. Cows are forced to produce far
              more milk than their bodies can handle. It’s not about what’s
              natural — it’s about what makes the most money.
              <br />
              <br />
              And the worst part? It’s all hidden from view. No windows. No
              cameras. No public tours. If factory farms were open to the
              public, would people still eat what comes out of them?
            </p>

            {/* Read less / more */}
            <div className="mt-4">
              <button
                onClick={() => toggle("factory")}
                className="text-sm font-medium text-[#265947] underline underline-offset-2 hover:no-underline"
              >
                {expanded.factory ? "Read less" : "Read more"}
              </button>
            </div>
          </div>
        </article>

        {/* “Humane” Farms */}
        <article className="rounded-2xl border border-gray-200 bg-white/80 shadow-sm overflow-hidden">
          <button
            aria-expanded={expanded.humane}
            aria-controls="panel-humane"
            onClick={() => toggle("humane")}
            className="w-full flex items-center justify-between gap-3 text-left px-5 py-4 hover:bg-gray-50 transition"
          >
            <h2 className="text-xl md:text-2xl font-serif font-semibold text-[#265947]">
              “Humane” Farms: A Pretty Label
            </h2>
            <Chevron open={expanded.humane} />
          </button>

          <div className="px-5 pb-3 text-[17px] leading-relaxed text-[#2f2f2f]">
            <p>
              Some meat is marketed as “free-range,” “organic,” or “humane.” The
              truth is different. Besides, how humane is killing?
            </p>
          </div>

          <div
            id="panel-humane"
            className={`px-5 pb-5 text-[17px] leading-relaxed text-gray-800 transition-[opacity,transform] duration-200 ${
              expanded.humane ? "opacity-100 translate-y-0" : "hidden opacity-0 -translate-y-1"
            }`}
          >
            <p className="mb-4">
              Imagine a farm ad: green pastures, smiling farmers, animals living
              their “best lives.” Now compare that to the reality. On most
              so-called “humane” farms, animals still live in crowded barns, are
              separated from their families, and are sent to the same
              slaughterhouses as factory-farmed animals. The only real
              difference? The label—and the price tag.
            </p>
            <p className="mb-4">
              Labels like “free-range” and “organic” sound comforting, but they
              often mask the same harsh realities. Many “free-range” animals
              still spend most of their lives indoors. “Pasture-raised” often
              means limited outdoor access. And while the conditions may be less
              extreme than factory farms, the end is the same.
            </p>
            <p className="mb-0">
              Animals on “humane” farms are still separated from their babies,
              still undergo painful procedures, and still face slaughter at a
              fraction of their natural lifespan. Whether it’s a gas chamber for
              pigs or a bolt gun to the head for cows, killing is never
              kind—especially when it’s avoidable.
            </p>

            <div className="mt-4">
              <button
                onClick={() => toggle("humane")}
                className="text-sm font-medium text-[#265947] underline underline-offset-2 hover:no-underline"
              >
                {expanded.humane ? "Read less" : "Read more"}
              </button>
            </div>
          </div>
        </article>

        {/* Backyard Chickens & Local Farms */}
        <article className="rounded-2xl border border-gray-200 bg-white/80 shadow-sm overflow-hidden">
          <button
            aria-expanded={expanded.backyard}
            aria-controls="panel-backyard"
            onClick={() => toggle("backyard")}
            className="w-full flex items-center justify-between gap-3 text-left px-5 py-4 hover:bg-gray-50 transition"
          >
            <h2 className="text-xl md:text-2xl font-serif font-semibold text-[#265947]">
              Backyard Chickens & Local Farms: The Myth of Innocence
            </h2>
            <Chevron open={expanded.backyard} />
          </button>

          <div className="px-5 pb-3 text-[17px] leading-relaxed text-[#2f2f2f]">
            <p>
              At first glance, small-scale farms and backyard chickens seem
              wholesome — a peaceful alternative to industrial meat. It feels
              more personal, even compassionate. But behind the cozy imagery, the
              same pattern remains: animals are used, exploited, and killed.
            </p>
          </div>

          <div
            id="panel-backyard"
            className={`px-5 pb-5 text-[17px] leading-relaxed text-gray-800 transition-[opacity,transform] duration-200 ${
              expanded.backyard ? "opacity-100 translate-y-0" : "hidden opacity-0 -translate-y-1"
            }`}
          >
            <p className="mb-4">
              Hens are bred to lay far more eggs than nature ever intended —
              which depletes their bodies and leads to painful health issues.
              Male chicks, who can’t lay eggs and don’t grow fast enough for
              meat, are usually killed within days of hatching. Even on small
              farms.
            </p>
            <p className="mb-4">
              Many people raise backyard chickens with affection. They name them,
              feed them scraps, give them room to roam. But when egg production
              slows or the holidays come around, kindness often turns into
              slaughter. The same animal, just a different day.
            </p>
            <p className="mb-4">
              We tell ourselves it’s different when it’s “local.” But local
              doesn’t mean painless. Familiarity doesn’t erase fear. And
              proximity doesn’t undo exploitation. Even small-scale farms rely on
              the same core idea: that animals exist for our use.
            </p>
            <p className="mb-0">
              Personal care doesn’t cancel out structural harm. It just hides it
              behind a friendlier face. If we’re serious about compassion, it
              shouldn’t stop at scale — it should challenge the very idea of
              killing animals we claim to care about.
            </p>

            <div className="mt-4">
              <button
                onClick={() => toggle("backyard")}
                className="text-sm font-medium text-[#265947] underline underline-offset-2 hover:no-underline"
              >
                {expanded.backyard ? "Read less" : "Read more"}
              </button>
            </div>
          </div>
        </article>

        {/* The Common Thread */}
        <article className="rounded-2xl border border-gray-200 bg-white/80 shadow-sm overflow-hidden">
          <button
            aria-expanded={expanded.commonThread}
            aria-controls="panel-commonThread"
            onClick={() => toggle("commonThread")}
            className="w-full flex items-center justify-between gap-3 text-left px-5 py-4 hover:bg-gray-50 transition"
          >
            <h2 className="text-xl md:text-2xl font-serif font-semibold text-[#265947]">
              The Common Thread: Death is the Destination
            </h2>
            <Chevron open={expanded.commonThread} />
          </button>

          <div className="px-5 pb-3 text-[17px] leading-relaxed text-[#2f2f2f]">
            <p>
              Whether it’s a vast factory farm or a quiet backyard coop, the
              journey ends the same. Every animal raised for meat is killed —
              young, scared, and unwilling.
            </p>
          </div>

          <div
            id="panel-commonThread"
            className={`px-5 pb-5 text-[17px] leading-relaxed text-gray-800 transition-[opacity,transform] duration-200 ${
              expanded.commonThread ? "opacity-100 translate-y-0" : "hidden opacity-0 -translate-y-1"
            }`}
          >
            <p className="mb-4">
              Some are gassed in chambers. Some are shot with bolt guns. Some
              have their throats slit by hand. It doesn’t matter how nicely they
              were raised, how organic their feed was, or how green the pasture
              looked. They all meet the same blade.
            </p>
            <p className="mb-4">
              These animals aren’t signing up for this. They don’t walk willingly
              into slaughterhouses. They struggle. They resist. They want to
              live — just like the dogs we adore or the cats we cradle at night.
            </p>
            <p className="mb-0">
              We often tell ourselves it’s “just how nature works,” or “they had
              a good life.” But a good life doesn’t make an unjust death fair.
              Especially when that death exists purely for our convenience, our
              habits, or our taste preferences.
              <br />
              <br />
              So we have to ask ourselves: Is taste really a good enough reason?
              Is a few minutes of flavor on our tongues worth a lifetime taken
              from someone else?
              <br />
              <br />
              Because no matter how the story begins — big farm, small farm, or
              backyard coop — it always ends the same. And that ending deserves
              our full attention.
            </p>

            <div className="mt-4">
              <button
                onClick={() => toggle("commonThread")}
                className="text-sm font-medium text-[#265947] underline underline-offset-2 hover:no-underline"
              >
                {expanded.commonThread ? "Read less" : "Read more"}
              </button>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
