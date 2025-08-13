import React from "react";
import impactData from "../data/vegan_impact.json";

function fmt(n) {
  if (typeof n !== "number" && !/^\d/.test(n)) return n;
  if (typeof n === "number" && n < 1_000) return String(n);
  if (typeof n === "number" && n < 1_000_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  if (typeof n === "number" && n < 1_000_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (typeof n === "number" && n < 1_000_000_000_000) return (n / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  return n;
}

export default function VeganImpactBox() {
  const { impactStats, footnote } = impactData;

  return (
    <div className="p-4 rounded-xl border border-gray-200 bg-white/70 shadow-sm">
     <h3 className="text-lg font-semibold text-gray-500 tracking-wide text-center mb-3">
  Your Vegan Impact
  <span className="block font-normal text-gray-400 text-sm">(per year)</span>
</h3>


      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {impactStats.map((item, idx) => (
          <div
            key={idx}
            className="bg-gray-50 rounded-md p-2 shadow-sm flex flex-col items-center"
          >
            <div className="text-base font-bold text-[#265947] tabular-nums text-center">

              {fmt(item.value)}
            </div>
            <div className="text-[11px] text-gray-700 leading-tight text-center">
              {item.label}
            </div>
          </div>
        ))}
      </div>
      {footnote && (
        <div className="mt-2 text-[10px] text-gray-500">{footnote}</div>
      )}
    </div>
  );
}
