import React, { useEffect, useMemo, useState } from "react";
import data from "./data/full_arguments_array.json";

// Tailwind utility: category badge colors
const badgeColors = {
  "Ethical & Moral": "bg-green-100 text-green-800",
  Environmental: "bg-blue-100 text-blue-800",
  "Health & Nutrition": "bg-red-100 text-red-800",
  Logical: "bg-purple-100 text-purple-800",
  Psychological: "bg-pink-100 text-pink-800",
  Evolutionary: "bg-gray-100 text-gray-800",
  "Cultural & Social": "bg-yellow-100 text-yellow-800",
  Religion: "bg-indigo-100 text-indigo-800",
};

export default function Arguments() {
  const [responseType, setResponseType] = useState("ethical");
  const [argumentType, setArgumentType] = useState("All");
  const [query, setQuery] = useState("");
  const [openIds, setOpenIds] = useState(() => new Set());

  useEffect(() => {
    const saved = localStorage.getItem("arguments:prefs");
    if (saved) {
      try {
        const { responseType: rt, argumentType: at, query: q } = JSON.parse(saved);
        if (rt) setResponseType(rt);
        if (at) setArgumentType(at);
        if (typeof q === "string") setQuery(q);
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "arguments:prefs",
      JSON.stringify({ responseType, argumentType, query })
    );
  }, [responseType, argumentType, query]);

  const types = useMemo(() => {
    const set = new Set(data.map((d) => d.type).filter(Boolean));
    return ["All", ...Array.from(set).sort()];
  }, []);

  const filtered = useMemo(() => {
    const base = argumentType === "All" ? data : data.filter((d) => d.type === argumentType);
    if (!query.trim()) return base;
    const q = query.trim().toLowerCase();
    return base.filter((d) => {
      const res = d.responses?.[responseType] || {};
      return (
        d.argument.toLowerCase().includes(q) ||
        (res.tldr || "").toLowerCase().includes(q) ||
        (res.body || "").toLowerCase().includes(q)
      );
    });
  }, [argumentType, query, responseType]);

  const allOpen = filtered.length > 0 && filtered.every((d) => openIds.has(d.id));

  const toggle = (id) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => setOpenIds(new Set(filtered.map((d) => d.id)));
  const collapseAll = () => setOpenIds(new Set());

  return (
    <div className="px-4 py-12 text-[#3a3a3a]">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-5xl font-bold text-[#265947] mb-2 font-serif leading-snug">
            Arguments & Responses
          </h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Explore common concerns and questions about veganism. Select an angle, filter by type, and open the details you want.
          </p>
        </header>

        {/* Controls */}
        <div className="bg-[#f9f9f7] border border-gray-200 rounded-2xl shadow-sm p-4 md:p-5 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 items-end">
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium">🗂 Argument type</span>
              <select
                className="border border-gray-300 rounded-md px-2 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#265947] focus:border-[#265947] transition text-sm"
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

            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium">📄 Response type</span>
              <select
                className="border border-gray-300 rounded-md px-2 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#265947] focus:border-[#265947] transition text-sm"
                value={responseType}
                onChange={(e) => setResponseType(e.target.value)}
              >
                <option value="ethical">Ethical</option>
                <option value="practical">Practical</option>
                <option value="factual">Factual</option>
              </select>
            </label>

            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium">🔎 Search</span>
              <input
                type="search"
                placeholder="Search arguments…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#265947] focus:border-[#265947] text-sm"
                aria-label="Search arguments"
              />
            </label>

            <div className="flex sm:justify-end">
              <button
                type="button"
                onClick={allOpen ? collapseAll : expandAll}
                className="text-sm px-3 py-2 h-[38px] mt-6 sm:mt-0 rounded-md border border-gray-300 bg-white hover:bg-gray-50 shadow-sm w-full sm:w-auto"
              >
                {allOpen ? "Collapse all" : "Expand all"}
              </button>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="space-y-4">
          {filtered.map((arg) => {
            const res = arg.responses?.[responseType] || {};
            const open = openIds.has(arg.id);
            const panelId = `arg-panel-${arg.id}`;
            return (
              <article
                key={arg.id}
                className="bg-white/90 border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggle(arg.id)}
                  className="w-full flex items-center justify-between gap-3 text-left px-4 py-3 md:px-5 md:py-4 hover:bg-gray-50 focus:outline-none"
                  aria-expanded={open}
                  aria-controls={panelId}
                >
                  <div className="min-w-0">
                    <h2 className="text-lg md:text-xl font-semibold font-serif text-[#1f4237] truncate">
                      {arg.argument}
                    </h2>
                    {arg.type && (
                      <span
                        className={`inline-block mt-1 text-[11px] font-medium px-2 py-0.5 rounded ${
                          badgeColors[arg.type] || "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {arg.type}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0 text-sm text-[#265947]">
                    <span>{open ? "Hide details" : "Read more"}</span>
                    <svg
                      className={`h-5 w-5 transition-transform duration-200 ${
                        open ? "rotate-180" : "rotate-0"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </button>

                {res.tldr && (
                  <div className="px-4 md:px-5 pb-4">
                    <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-md max-w-2xl">
                      <p className="font-semibold text-green-900 mb-1 flex items-center gap-2">
                        <LeafIcon /> Quick answer
                      </p>
                      <p className="text-gray-800">{res.tldr}</p>
                    </div>
                  </div>
                )}

                <div
                  id={panelId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 pb-5 md:px-5 md:pb-6">
                      {res.body && (
                        <div className="leading-relaxed text-gray-800 whitespace-pre-wrap">
                          <p className="font-semibold mb-1 text-[#265947]">Full response</p>
                          {res.body}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center text-sm text-gray-500 py-10 border border-dashed border-gray-300 rounded-2xl">
              No arguments match your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function LeafIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 text-green-600"
      aria-hidden="true"
    >
      <path d="M12.763 3.002a.75.75 0 00-1.121-.393C6.87 5.47 4.5 9.028 4.5 13.5a6.75 6.75 0 0013.5 0c0-3.09-1.29-5.64-3.08-7.563-.836-.888-1.804-1.632-2.854-2.203a.75.75 0 00-.303-.732z" />
    </svg>
  );
}
