import React from "react";
import { Link } from "react-router-dom";

export default function WhyVegan() {
  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-900">
      <h1 className="text-4xl font-bold mb-6 text-center">Why Vegan?</h1>

      <p className="mb-6 text-lg leading-relaxed text-gray-800">
        <strong>Veganism</strong> is a way of living that avoids using animals for food, clothing, or other purposes. It’s based on the understanding that animals are not ours to exploit. As conscious, intelligent beings, we have a responsibility to protect those who are weaker—not profit from them.
      </p>

      <nav className="mb-10 text-center text-sm">
        <Link to="/" className="text-green-700 underline mr-4">Why Vegan?</Link>
        <Link to="/arguments" className="text-green-700 underline">Arguments</Link>
      </nav>

      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-2">🧘 Ethics: Because animals are not ours to use</h2>
          <p>Animals feel pain, form bonds, and experience fear—just like us. But in factory farms, they’re treated like machines. Veganism means opting out of that system and choosing compassion over convenience.</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">🌍 Environment: Because we only have one planet</h2>
          <p>Animal agriculture is a leading driver of deforestation, water use, and greenhouse gas emissions. A plant-based diet is one of the simplest ways to reduce your footprint—no protest signs required.</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">💪 Health: Because your body deserves better too</h2>
          <p>Done right, a vegan diet is rich in fiber, low in saturated fat, and backed by every major nutrition body on Earth. It won’t make you perfect, but it might just help you thrive.</p>
        </div>
      </section>
    </div>
  );
}
