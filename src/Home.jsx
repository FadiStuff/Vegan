// src/Home.jsx
import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-6 px-4 text-center">
      <h1 className="text-5xl font-bold text-[#265947] mb-4 font-serif">
        Veganism is
      </h1>

      <div className="bg-[#eaf6f0] p-6 rounded-xl shadow max-w-2xl mb-2">
        <p className="text-xl italic text-[#3a3a3a] leading-relaxed font-light">
          A way of living that avoids using animals for food, clothing, or other purposes.
          It’s based on the understanding that animals are not ours to exploit. As conscious,
          intelligent beings, we have a responsibility to protect those who are weaker—not
          profit from them.
        </p>
      </div>

      {/* Reflection block, further down */}
      <section className="mt-10">
        <div className="text-gray-600 italic text-sm md:text-base">
          <p className="md:whitespace-nowrap whitespace-normal">
            Let’s not take a life for the taste of a meal
            <span className="mx-3 text-gray-400">•</span>
            Let’s not steal a mother’s milk for the thrill of dessert.
          </p>
          <p className="mt-2">Let’s not wear the skin of another and call it style.</p>
        </div>
      </section>
    </div>
  );
}
