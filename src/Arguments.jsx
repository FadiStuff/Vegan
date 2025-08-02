import React, { useState } from "react";
import data from "./data/full_arguments_array.json";

export default function Arguments() {
  const [tone, setTone] = useState("ethical");

  return (
    <div className="pt-10 pb-20 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center text-[#265947] mb-12 font-serif">
        Arguments Against Veganism (and Responses)
      </h1>

      <div className="space-y-10 max-w-3xl mx-auto">
        {data.map((arg) => (
          <div
            key={arg.id}
            className="border border-gray-200 bg-white p-6 rounded-2xl shadow-sm space-y-4"
          >
            <h2 className="text-2xl font-semibold text-[#265947] font-serif">
              {arg.argument}
            </h2>

            <div className="flex items-center gap-3 text-sm">
              <label className="text-gray-700 font-medium">Response type:</label>
              <select
                className="border border-gray-300 rounded px-3 py-1 bg-white shadow-sm focus:outline-none focus:ring focus:ring-green-300"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
              >
                <option value="ethical">🧘 Ethical</option>
                <option value="practical">🔧 Practical</option>
                <option value="factual">📊 Factual</option>
              </select>
            </div>

            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-md">
              <p className="font-semibold text-green-900 mb-1">Quick answer:</p>
              <p className="text-gray-800">{arg.responses[tone].tldr}</p>
            </div>

            <div className="leading-relaxed text-gray-800 whitespace-pre-wrap">
              <p className="font-semibold mb-1 text-[#265947]">Response:</p>
              {arg.responses[tone].body}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
