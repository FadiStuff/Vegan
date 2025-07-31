import React, { useState } from "react";
import data from "./data/full_arguments_array.json";

export default function App() {
  const [tone, setTone] = useState("ethical");

  return (
    <div className="p-6 max-w-5xl mx-auto text-gray-900">

      {/* Veganism definition box */}
      <div className="mb-10 p-4 bg-gray-100 border-l-4 border-green-600 rounded-xl shadow-sm text-base leading-relaxed">
        <p>
          <strong>Veganism</strong> is a way of living that avoids using animals for food, clothing, or other purposes. It’s based on the understanding that animals are not ours to exploit. As conscious, intelligent beings, we have a responsibility to protect those who are weaker—not profit from them.
        </p>
      </div>

      <h1 className="text-4xl font-extrabold mb-10 text-center">
        Top Arguments Against Veganism (and Responses)
      </h1>

      <div className="space-y-10">
        {data.map((arg) => (
          <div
            key={arg.id}
            className="border border-gray-300 bg-white p-6 rounded-xl shadow-md space-y-4"
          >
            <h2 className="text-2xl font-bold text-gray-800">{arg.argument}</h2>

            <div className="flex items-center gap-3">
              <label className="font-medium">Response type:</label>
              <select
                className="border rounded px-3 py-1 bg-white shadow-sm"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
              >
                <option value="ethical">🧘 Ethical</option>
                <option value="practical">🔧 Practical</option>
                <option value="factual">📊 Factual</option>
              </select>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mb-2">
              <p className="font-semibold mb-1">Quick answer:</p>
              <p className="text-gray-800">{arg.responses[tone].tldr}</p>
            </div>

            <div className="leading-relaxed text-gray-700 whitespace-pre-wrap">
              <p className="font-semibold mb-1">Response:</p>
              {arg.responses[tone].body}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
