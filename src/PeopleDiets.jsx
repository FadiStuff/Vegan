import React, { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import data from "./data/people_diets.json";

// --- helpers for reading URL params ---
function slugify(str = "") {
  return String(str)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[\s/_.]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
function resolveCategoryFromParam(paramValue, categories) {
  if (!paramValue) return null;
  const wanted = slugify(paramValue);
  return (
    categories.find((c) => slugify(c) === wanted) ||
    (wanted === "actors" && categories.find((c) => /actor/i.test(c))) ||
    (wanted === "athletes" && categories.find((c) => /athlete|sport/i.test(c))) ||
    (wanted === "internet-media-public-figures" &&
      categories.find((c) => /internet|media|public/i.test(c))) ||
    null
  );
}
function resolveDietFromParam(paramValue, diets) {
  if (!paramValue) return null;
  const wanted = String(paramValue).toLowerCase();
  return diets.find((d) => String(d).toLowerCase() === wanted) || null;
}

const PeopleDiets = () => {
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [dietFilter, setDietFilter] = useState("All");
  const [countryFilter, setCountryFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Name");
  const [onlyCertified, setOnlyCertified] = useState(false);
  const [filteredPeople, setFilteredPeople] = useState([]);

  const categories = ["All", ...new Set(data.people.map((p) => p.category).filter(Boolean))];
  const diets = ["All", ...new Set(data.people.map((p) => p.diet.type).filter(Boolean))];
  const countries = [
  "All",
  ...new Set(data.people.map((p) => p.country).filter(Boolean)),
].sort((a, b) => a.localeCompare(b));

  // read query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");
    const dietParam = params.get("diet");

    const resolvedCategory = resolveCategoryFromParam(
      categoryParam,
      categories.filter((c) => c !== "All")
    );
    const resolvedDiet = resolveDietFromParam(dietParam, diets.filter((d) => d !== "All"));

    if (resolvedCategory) setCategoryFilter(resolvedCategory);
    if (resolvedDiet) setDietFilter(resolvedDiet);
  }, [location.search]);

  const showCertifiedControl = useMemo(
    () => dietFilter === "All" || dietFilter === "Vegan",
    [dietFilter]
  );

  useEffect(() => {
    if (!showCertifiedControl && onlyCertified) setOnlyCertified(false);
  }, [showCertifiedControl, onlyCertified]);

  // filtering
  useEffect(() => {
    let people = data.people;

    if (searchTerm.trim() !== "") {
      const q = searchTerm.toLowerCase();
      people = people.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.category && p.category.toLowerCase().includes(q)) ||
          (p.country && p.country.toLowerCase().includes(q))
      );
    }
    if (categoryFilter !== "All") people = people.filter((p) => p.category === categoryFilter);
    if (dietFilter !== "All") people = people.filter((p) => p.diet.type === dietFilter);
    if (countryFilter !== "All") people = people.filter((p) => p.country === countryFilter);
    if (showCertifiedControl && onlyCertified) {
      people = people.filter((p) => p.certified_vegan === true);
    }

    if (sortOption === "Name") {
      people = [...people].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "Last verified") {
      people = [...people].sort(
        (a, b) => new Date(b.diet.last_verified) - new Date(a.diet.last_verified)
      );
    } else if (sortOption === "Certified") {
      people = [...people].sort(
        (a, b) =>
          (b.certified_vegan === true) - (a.certified_vegan === true) ||
          a.name.localeCompare(b.name)
      );
    }

    setFilteredPeople(people);
  }, [
    searchTerm,
    categoryFilter,
    dietFilter,
    countryFilter,
    sortOption,
    onlyCertified,
    showCertifiedControl,
  ]);

  const contextLabel = useMemo(() => {
    const parts = [];
    if (dietFilter !== "All") parts.push(dietFilter);
    if (categoryFilter !== "All") parts.push(categoryFilter);
    if (countryFilter !== "All") parts.push(countryFilter);
    return parts.length ? parts.join(" • ") : "All people";
  }, [dietFilter, categoryFilter, countryFilter]);

  return (
    <>
      {/* 🔍 SEO Helmet */}
      <Helmet>
        <title>Vegan & Plant-Based People Directory | Plants Over Pain</title>
        <meta
          name="description"
          content="Browse a directory of vegan and plant-based people, from athletes and actors to activists. Filter by diet type, certification, country, and more."
        />
        <link rel="canonical" href="https://plantsoverpain.org/people" />
      </Helmet>

      <div className="px-6 pt-6 pb-16 max-w-[90rem] mx-auto">
        {/* Context line */}
        <div className="mb-4 flex items-center gap-3 text-sm text-gray-600 flex-wrap">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8f3ee] text-[#1f4a3a] border border-[#cfe6dc] font-medium">
            {contextLabel}
          </span>
          <span className="text-gray-400">•</span>
          <span>{filteredPeople.length} shown</span>
          {showCertifiedControl && onlyCertified && (
            <>
              <span className="text-gray-300">•</span>
              <span className="text-xs text-gray-500 italic">
                Certified = Verified full vegan lifestyle. Not just diet. No use
                of animal products (strict, recent, no contradictions)
              </span>
            </>
          )}
        </div>

        {/* Toolbar */}
        <div className="mb-6">
          <div className="bg-[#f9f9f7] border border-gray-200 rounded-2xl shadow-sm p-3 md:p-4">
            <div className="flex flex-nowrap items-center gap-3 overflow-x-auto">
              {/* Search */}
              <input
                type="search"
                placeholder="Search by name, category, or country"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-[2] min-w-[360px] h-11 border border-gray-300 rounded-md px-3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#265947]/40 focus:border-[#265947]"
                aria-label="Search by name, category, or country"
              />

              {/* Category */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="flex-[1] min-w-[150px] h-11 border border-gray-300 rounded-md px-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#265947]/40 focus:border-[#265947]"
              >
                <option value="All">All categories</option>
                {categories
                  .filter((c) => c !== "All")
                  .map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
              </select>

              {/* Diet */}
              <select
                value={dietFilter}
                onChange={(e) => setDietFilter(e.target.value)}
                className="flex-[1] min-w-[150px] h-11 border border-gray-300 rounded-md px-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#265947]/40 focus:border-[#265947]"
              >
                <option value="All">All diet types</option>
                {diets
                  .filter((d) => d !== "All")
                  .map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
              </select>

              {/* Country */}
              <select
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
                className="flex-[1] min-w-[160px] h-11 border border-gray-300 rounded-md px-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#265947]/40 focus:border-[#265947]"
              >
                <option value="All">All countries</option>
                {countries
                  .filter((c) => c !== "All")
                  .map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
              </select>

              {/* Sort */}
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="flex-[1] min-w-[160px] h-11 border border-gray-300 rounded-md px-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#265947]/40 focus:border-[#265947]"
              >
                <option value="Name">Sort: Name</option>
                <option value="Last verified">Sort: Last verified</option>
                <option value="Certified">Sort: Certified first</option>
              </select>

              {/* Certified toggle */}
              {showCertifiedControl && (
                <label className="ml-auto flex items-center gap-2 text-sm select-none whitespace-nowrap shrink-0">
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={onlyCertified}
                    onChange={(e) => setOnlyCertified(e.target.checked)}
                  />
                  Certified Vegan only
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Results grid */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
          {filteredPeople.map((p) => (
            <li
              key={p.id}
              className="border rounded-xl p-4 shadow-sm bg-white ring-1 ring-black/5"
            >
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-semibold text-lg">{p.name}</h2>
                {p.certified_vegan && (
                  <span
                    title="Verified vegan lifestyle (strict, recent, no contradictions)"
                    aria-label="Certified Vegan: verified vegan lifestyle (strict, recent, no contradictions)"
                    className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 border border-green-200"
                  >
                    Certified Vegan
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-700">{p.category}</p>
              <p className="text-sm text-gray-700">Diet: {p.diet.type}</p>
              <p className="text-sm text-gray-700">Country: {p.country || "N/A"}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PeopleDiets;