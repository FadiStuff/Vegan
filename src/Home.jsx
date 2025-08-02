// src/Home.jsx
import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <h1 className="text-5xl font-bold text-[#265947] mb-8 font-serif">
        Veganism is...
      </h1>
      <div className="bg-[#f0f9f5] p-6 rounded-xl shadow max-w-2xl">
        <p className="text-xl italic text-[#3a3a3a] leading-relaxed font-light">
          A way of living that avoids using animals for food, clothing, or other purposes.
          It’s based on the understanding that animals are not ours to exploit. As conscious,
          intelligent beings, we have a responsibility to protect those who are weaker—not
          profit from them.
        </p>
      </div>
    </div>
  );
}
