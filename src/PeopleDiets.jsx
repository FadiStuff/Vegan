import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import data from "./data/people_diets.json";

// Helper: slugify a category (e.g., "Internet / Media / Public Figures" -> "internet-media-public-figures")
function slugify(str = "") {
  return String(str)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[\s/_.]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// Find a canonical category from the dataset by comparing slugs
function resolveCategoryFromParam(paramValue, categories) {
  if (!paramValue) return null;
  const wanted = slugify(paramValue);
  return (
    categories.find((c) => slugify(c) === wanted) ||
    // tolerate common short-hands
    (wanted === "actors" && categories.find((c) => /actor/i.test(c))) ||
    (wanted === "athletes" && categories.find((c) => /athlete|sport/i.test(c))) ||
    (wanted === "internet-media-public-figures" &&
      categories.find((c) => /internet|media|public/i.test(c))) ||
    null
  );
}

// Find a canonical diet value from the dataset by case-insensitive match
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

  const categories = [
    "All",
    ...new Set(data.people.map((p) => p.category).filter(Boolean)),
  ];
  const diets = [
    "All",
    ...new Set(data.people.map((p) => p.diet.type).filter(Boolean)),
  ];
  const countries = [
    "All",
    ...new Set(data.people.map((p) => p.country).filter(Boolean)),
  ];

  // Read URL query params (?category=...&diet=...)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");
    const dietParam = params.get("diet");

    // Resolve to canonical values from dataset (so dropdowns display the exact items)
    const resolvedCategory = resolveCategoryFromParam(
      categoryParam,
      categories.filter((c) => c !== "All")
    );
    const resolvedDiet = resolveDietFromParam(
      dietParam,
      diets.filter((d) => d !== "All")
    );

    if (resolvedCategory) setCategoryFilter(resolvedCategory);
    if (resolvedDiet) setDietFilter(resolvedDiet);
  }, [location.search]);

  // Certified toggle is only relevant when viewing Vegan or All
  const showCertifiedControl = useMemo(
    () => dietFilter === "All" || dietFilter === "Vegan",
    [dietFilter]
  );

  // If user switches to a non-relevant diet, turn off the toggle
  useEffect(() => {
    if (!showCertifiedControl && onlyCertified) setOnlyCertified(false);
  }, [showCertifiedControl, onlyCertified]);

  useEffect(() => {
    let people = data.people;

    if (searchTerm.trim() !== "") {
      const lowerSearch = searchTerm.toLowerCase();
      people = people.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerSearch) ||
          (p.category && p.category.toLowerCase().includes(lowerSearch)) ||
          (p.country && p.country.toLowerCase().includes(lowerSearch))
      );
    }

    if (categoryFilter !== "All") {
      people = people.filter((p) => p.category === categoryFilter);
    }

    if (dietFilter !== "All") {
      people = people.filter((p) => p.diet.type === dietFilter);
    }

    if (countryFilter !== "All") {
      people = people.filter((p) => p.country === countryFilter);
    }

    // Apply certified filter only when it's relevant
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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">People Diets</h1>

      {/* Filter Toolbar */}
      <div className="mb-6">
        <div className="flex flex-wrap md:flex-nowrap items-center gap-3 bg-gray-50 p-3 rounded-lg shadow-sm">
          <input
            type="text"
            placeholder="Search by name, category, or country"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded flex-[2] min-w-[160px] h-[42px]
                       focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border p-2 rounded flex-1 min-w-[120px] h-[42px]
                       focus:ring-2 focus:ring-blue-400 focus:outline-none"
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

          <select
            value={dietFilter}
            onChange={(e) => setDietFilter(e.target.value)}
            className="border p-2 rounded flex-1 min-w-[120px] h-[42px]
                       focus:ring-2 focus:ring-blue-400 focus:outline-none"
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

          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="border p-2 rounded flex-1 min-w-[120px] h-[42px]
                       focus:ring-2 focus:ring-blue-400 focus:outline-none"
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

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border p-2 rounded flex-1 min-w-[120px] h-[42px]
                       focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="Name">Sort: Name</option>
            <option value="Last verified">Sort: Last verified</option>
            <option value="Certified">Sort: Certified first</option>
          </select>

          {/* Certified toggle: only show when relevant */}
          {showCertifiedControl && (
            <label className="flex items-center gap-2 text-sm ml-auto">
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

      {/* Counter */}
      <div className="mb-4 text-gray-700 font-medium flex items-center gap-3 flex-wrap">
        <span>Showing {filteredPeople.length} people</span>
        {onlyCertified && (dietFilter === "All" || dietFilter === "Vegan") && (
          <span className="text-xs text-gray-500 italic">
            Certified = Verified full vegan lifestyle. Nost just diet. No use of animal products (strict, recent, no contradictions)
          </span>
        )}
      </div>

      {/* Results grid */}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPeople.map((p) => (
          <li key={p.id} className="border rounded p-4 shadow bg-white">
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
  );
};

export default PeopleDiets;
