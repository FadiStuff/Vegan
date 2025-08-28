import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

export default function WhyJustSomeAnimals() {
  const [expanded, setExpanded] = useState({
    doublestandard: true,
    OtherCultures: true,
    health: true,
    pet: true,
    consistency: true, // not used but preserved
    naming: true,
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
    <>
      {/* 🔍 SEO Helmet */}
      <Helmet>
        <title>Why Do We Eat Some Animals but Not Others? | Plants Over Pain</title>
        <meta
          name="description"
          content="Explore the cultural double standards that lead us to love some animals and eat others. A deep dive into tradition, empathy, and ethics."
        />
        <link
          rel="canonical"
          href="https://plantsoverpain.org/why-just-some-animals"
        />
      </Helmet>

      <div className="px-4 pt-10 pb-20 text-[#3a3a3a]">
        {/* Hero / intro */}
        <section className="max-w-4xl mx-auto text-center p-6 border border-gray-200 rounded-2xl shadow-sm bg-[#f9f9f7] mb-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#265947]">
            Why Do We Eat Some Animals but Not Others?
          </h1>
          <p className="mt-3 text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            It isn’t biology—it’s conditioning, shaped by the culture we grow up
            in.
          </p>
        </section>

        {/* Sections */}
        <section className="max-w-4xl mx-auto space-y-5">
          {[
            {
              id: "doublestandard",
              title: "Our Double Standard",
              intro: (
                <>
                  Walk into most Western homes and you’ll find dogs curled up on
                  couches, cats with personalized feeding stations, and framed
                  pet portraits on the wall. Yet just a few blocks away, grocery
                  store shelves are filled with shrink-wrapped packages of beef,
                  pork, and chicken — animals who were just as capable of
                  feeling fear, pain, and love.
                </>
              ),
              body: (
                <>
                  <p>
                    This contradiction isn’t something most people consciously
                    choose. It’s something we’ve inherited. From a young age,
                    we're taught that cows and pigs are food, while dogs and
                    cats are friends. This isn’t a moral judgment we arrived at
                    through logic — it’s cultural conditioning.
                  </p>
                  <p>
                    But here’s the uncomfortable truth: a pig is no less
                    intelligent than a dog. A cow forms social bonds just like a
                    cat. Chickens can recognize individual faces, remember
                    tasks, and show empathy for others. The difference isn’t in
                    the animals themselves — it’s in how we’ve been taught to
                    see them.
                  </p>
                  <p>
                    Once we start seeing all animals as individuals — not just
                    the ones we’ve been trained to love — the double standard
                    begins to dissolve. What’s left is a choice: do we follow
                    tradition without question, or do we choose compassion with
                    intention?
                  </p>
                </>
              ),
            },
            {
              id: "OtherCultures",
              title: "Other Cultures, Other Norms",
              intro: (
                <>
                  In some parts of China, it’s common to find dog meat on the
                  menu. In Indonesia, bats and monkeys are sold in open-air
                  markets. In France, horse meat is a delicacy. In parts of
                  India, cows are sacred and never eaten. Across cultures, the
                  line between “animal” and “edible” shifts dramatically — not
                  based on biology or ethics, but on tradition.
                </>
              ),
              body: (
                <>
                  <p>
                    To someone raised in the U.S. or Europe, eating a dog may
                    feel unthinkable — cruel, even barbaric. But to someone in a
                    different part of the world, eating a pig may seem just as
                    strange. And from the animal’s perspective, there’s no
                    difference. A life is a life. Pain is pain.
                  </p>
                  <p>
                    This isn’t about pointing fingers at other cultures. If
                    anything, it’s about holding up a mirror to our own. We
                    often criticize others for eating animals we love, without
                    realizing that we do the exact same thing — just with
                    different species.
                  </p>
                  <p>
                    When we look at these global differences, one truth becomes
                    clear: there is no objective rule guiding which animals are
                    “okay” to eat. Culture decides. Not ethics. Not necessity.
                    Not logic.
                  </p>
                  <p>
                    Acknowledging cultural differences shouldn’t stop us from
                    questioning them. Every culture, including our own, has
                    blind spots. Some are more visible than others. But all of
                    them deserve to be reexamined, especially when they cause
                    harm. Change doesn't mean erasing culture — it means
                    evolving it.
                  </p>
                </>
              ),
            },
            {
              id: "health",
              title: "Is It About Intelligence?",
              intro: (
                <>
                  Some people try to justify eating certain animals by pointing
                  to intelligence. They say cows aren’t as smart as dogs, or
                  chickens aren’t as clever as dolphins — as if a being’s right
                  to live depends on how well it can do tricks or solve puzzles.
                </>
              ),
              body: (
                <>
                  <p>
                    But this logic breaks down quickly. Pigs, for example, are
                    widely considered more intelligent than dogs. They can play
                    video games, recognize themselves in mirrors, and learn
                    tasks faster than toddlers in some studies. Chickens have
                    over 30 vocalizations, can reason through basic logic
                    problems, and form strong social bonds. Cows remember faces,
                    hold grudges, and even show signs of emotional depth.
                  </p>
                  <p>
                    So if we’re using intelligence as the moral line… we’re on
                    shaky ground. Worse, this kind of reasoning leads to
                    troubling territory. Do humans with cognitive disabilities
                    deserve fewer rights? Should we only protect the “smartest”
                    among us? Of course not. We don’t grant value to a life
                    based on IQ — we do it based on the ability to feel, to
                    suffer, to experience the world.
                  </p>
                  <p>
                    That’s the real ethical line: sentience. Not test scores.
                    Every animal — smart or not — avoids pain, seeks comfort,
                    and forms relationships. They feel fear. They feel joy. And
                    none of them want to die.
                  </p>
                </>
              ),
            },
            {
              id: "pet",
              title: "What If It Were Your Pet?",
              intro: (
                <>
                  Imagine someone hurting your dog. Not out of anger or cruelty,
                  but as part of a system — calmly, routinely, because that’s
                  “just how it’s done.” Now imagine they said, “It’s legal. It’s
                  traditional. It’s profitable.” Would that make it okay?
                </>
              ),
              body: (
                <>
                  <p>
                    Of course not. Most people would do anything to protect
                    their pets. We see them as family. We name them, celebrate
                    their quirks, and hold them when they’re scared. We
                    recognize their personalities, their preferences, and their
                    pain. We know — instinctively — that they are individuals.
                  </p>
                  <p>
                    But the animals we eat are individuals too. Pigs nuzzle each
                    other. Cows cry when their calves are taken. Chickens have
                    best friends. They seek comfort, play, mourn, and form deep
                    bonds — just like the animals we love. The only difference
                    is that we’ve been taught not to see them that way.
                  </p>
                  <p>
                    If a stranger harmed your pet, it would feel like a
                    violation — not just of the animal, but of something sacred.
                    So why doesn’t it feel the same when we pay others to harm
                    animals who are just as sentient, just as sensitive, just as
                    alive? That disconnect isn’t natural — it’s taught. And once
                    we recognize it, we can choose something better.
                  </p>
                  <p>
                    Empathy isn’t limited to who we know. It can stretch beyond
                    our homes, beyond our species. The love we feel for our pets
                    isn’t a weakness — it’s proof that we’re capable of
                    compassion. And that compassion doesn’t have to stop at the
                    edge of a species line.
                  </p>
                </>
              ),
            },
            {
              id: "naming",
              title: "Naming and Distancing",
              intro: (
                <>
                  You don’t eat a pig — you eat pork. You don’t eat a cow — you
                  eat beef. These words aren’t random. They’re designed to
                  create distance — to turn a living being into a product. By
                  the time the animal reaches your plate, it’s been renamed,
                  repackaged, and sanitized. The language hides the life behind
                  the meal.
                </>
              ),
              body: (
                <>
                  <p>
                    This isn’t accidental. For centuries, we’ve used language to
                    soften harsh realities. “Meat” sounds less personal than
                    “body.” “Livestock” feels more neutral than “animal.” Even
                    the way we label cuts of meat — sirloin, tenderloin, wings —
                    avoids saying what they actually are: parts of a once-living
                    creature.
                  </p>
                  <p>
                    These euphemisms make it easier to ignore the ethical weight
                    of our choices. They allow us to consume animals without
                    thinking about who they were. A pig becomes a product. A
                    chicken becomes an entrée. The disconnect becomes habitual.
                  </p>
                  <p>
                    But when we strip away the labels and see the being behind
                    the bite — the pig who played in the dirt, the cow who
                    licked her calf, the chicken who dust-bathed in the sun —
                    the illusion cracks. The meal isn’t just food anymore. It’s
                    a life.
                  </p>
                  <p>
                    Language shapes perception. And perception shapes morality.
                    If we want to live in alignment with our values, we have to
                    call things what they are. Only then can we choose honestly
                    — and ethically.
                  </p>
                </>
              ),
            },
          ].map((sec) => {
            const open = expanded[sec.id];
            const panelId = `panel-${sec.id}`;
            const btnId = `button-${sec.id}`;

            return (
              <article
                key={sec.id}
                className="rounded-2xl border border-gray-200 bg-white/80 shadow-sm overflow-hidden"
              >
                {/* Header / Toggle */}
                <button
                  id={btnId}
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => toggle(sec.id)}
                  className="w-full flex items-center justify-between gap-3 text-left px-5 py-4 hover:bg-gray-50 transition"
                >
                  <h2 className="text-xl md:text-2xl font-serif font-semibold text-[#265947]">
                    {sec.title}
                  </h2>
                  <Chevron open={open} />
                </button>

                {/* Intro always visible */}
                <div className="px-5 pb-3 text-[17px] leading-relaxed text-[#2f2f2f]">
                  <p>{sec.intro}</p>
                </div>

                {/* Body collapsible */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className={`px-5 pb-5 text-[17px] leading-relaxed text-gray-800 transition-[opacity,transform] duration-200 ${
                    open
                      ? "opacity-100 translate-y-0"
                      : "hidden opacity-0 -translate-y-1"
                  }`}
                >
                  {sec.body}
                  <div className="mt-4">
                    <button
                      onClick={() => toggle(sec.id)}
                      className="text-sm font-medium text-[#265947] underline underline-offset-2 hover:no-underline"
                    >
                      {open ? "Read less" : "Read more"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </>
  );
}
