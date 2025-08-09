import React, { useState, useMemo } from "react";
import data from "./data/full_arguments_array.json";

const badgeColors = {
  "Ethical & Moral": "bg-green-100 text-green-800",
  "Environmental": "bg-blue-100 text-blue-800",
  "Health & Nutrition": "bg-red-100 text-red-800",
  "Logical": "bg-purple-100 text-purple-800",
  "Psychological": "bg-pink-100 text-pink-800",
  "Evolutionary": "bg-gray-100 text-gray-800",
  "Cultural & Social": "bg-yellow-100 text-yellow-800",
  "Religion": "bg-indigo-100 text-indigo-800",
};

export default function Arguments() {
  const [responseType, setResponseType] = useState("ethical");
  const [argumentType, setArgumentType] = useState("All");

  const types = useMemo(() => {
    const set = new Set(data.map((d) => d.type).filter(Boolean));
return ["Show all", ...Array.from(set).sort()];
  }, []);

  const filtered = useMemo(() => {
    return argumentType === "All"
      ? data
      : data.filter((d) => d.type === argumentType);
  }, [argumentType]);

  return (
    <div className="px-4 pt-8 pb-16 text-[#3a3a3a]">
      <h1 className="text-4xl font-bold text-center text-[#265947] mb-12 font-serif">
        Arguments Against Veganism (and Responses)
      </h1>

      <div className="flex flex-wrap gap-4 mb-8 justify-center">

        <label className="flex items-center gap-2">
          <span className="font-medium">Argument type:</span>
          <select
            className="border border-gray-300 rounded p-2"
            value={argumentType}
            onChange={(e) => setArgumentType(e.target.value)}
          >
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2">
          <span className="font-medium">Response type:</span>
          <select
            className="border border-gray-300 rounded p-2"
            value={responseType}
            onChange={(e) => setResponseType(e.target.value)}
          >
            <option value="ethical">Ethical</option>
            <option value="practical">Practical</option>
            <option value="factual">Factual</option>
          </select>
        </label>

        
      </div>

      <div className="space-y-6 max-w-3xl mx-auto">
        {filtered.map((arg) => {
          const res = arg.responses?.[responseType] || {};
          return (
            <div key={arg.id} className="border-b pb-6">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <h2 className="text-xl font-semibold font-serif">{arg.argument}</h2>
                {arg.type && (
                  <span
                    className={`text-sm font-medium px-2 py-1 rounded ${
                      badgeColors[arg.type] || "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {arg.type}
                  </span>
                )}
              </div>

              <div className="mt-3 bg-green-50 border-l-4 border-green-400 p-4 rounded-md">
                <p className="font-semibold text-green-900 mb-1">Quick answer:</p>
                <p className="text-gray-800">{res.tldr}</p>
              </div>

              <div className="mt-3 leading-relaxed text-gray-800 whitespace-pre-wrap">
                <p className="font-semibold mb-1 text-[#265947]">Response:</p>
                {res.body}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
