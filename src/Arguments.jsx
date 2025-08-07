import React, { useState } from "react";
import data from "./data/full_arguments_array.json";

export default function Arguments() {
  const [tone, setTone] = useState("ethical");
  const [typeFilter, setTypeFilter] = useState("all");

  const types = Array.from(new Set(data.map(arg => arg.type))).sort();
  const filteredData = typeFilter === "all"
    ? data
    : data.filter(arg => arg.type === typeFilter);

  // 🎨 Badge color classes by type
  const badgeColors = {
    "Ethical & Moral": "bg-green-100 text-green-800",
    "Environmental": "bg-blue-100 text-blue-800",
    "Health & Nutrition": "bg-red-100 text-red-800",
    "Logical": "bg-purple-100 text-purple-800",
    "Cultural and Social": "bg-yellow-100 text-yellow-800",
    "Psychological": "bg-pink-100 text-pink-800",
    "Evolutionary": "bg-gray-100 text-gray-800",
  };

  return (
    <div className="pt-10 pb-20 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center text-[#265947] mb-12 font-serif">
        Arguments Against Veganism (and Responses)
      </h1>

      <div className="flex flex-wrap justify-center gap-6 mb-12">

        {/* Argument Type Filter */}
        <div className="flex items-center gap-3 text-sm">
          <label className="text-gray-700 font-medium">Argument type:</label>
          <select
            className="border border-gray-300 rounded px-3 py-1 bg-white shadow-sm focus:outline-none focus:ring focus:ring-green-300"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">Show all</option>
            {types.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        {/* Response Type Toggle */}
        <div className="flex items-center gap-3 text-sm">
          <label className="text-gray-700 font-medium">Response type:</label>
          <select
            className="border border-gray-300 rounded px-3 py-1 bg-white shadow-sm focus:outline-none focus:ring focus:ring-green-300"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <option value="ethical"> Ethical</option>
            <option value="practical"> Practical</option>
            <option value="factual"> Factual</option>
          </select>
        </div>

        
      </div>

      <div className="space-y-10 max-w-3xl mx-auto">
        {filteredData.map((arg) => (
          <div
            key={arg.id}
            className="border border-gray-200 bg-white p-6 rounded-2xl shadow-sm space-y-4"
          >
            <h2 className="text-2xl font-semibold text-[#265947] font-serif flex flex-wrap items-center gap-3">
              {arg.argument}
              <span
                className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded ${
                  badgeColors[arg.type] || "bg-gray-200 text-gray-800"
                }`}
              >
                {arg.type}
              </span>
            </h2>

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
