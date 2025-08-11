import React from "react";
import { Link } from "react-router-dom";
import veganCelebs from "./data/vegan_celebrities.json";

const VeganCelebrities = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Vegan Celebrities & Entertainers</h1>

      {/* Cross-links (lighter helper style) */}
      <nav className="mb-6 text-sm text-gray-600">
        <span className="mr-2">See also:</span>
        <Link to="/vegan-athletes" className="text-green-700 hover:underline mr-4">
          Vegan Athletes
        </Link>
        <Link to="/vegan-health-pros" className="text-green-700 hover:underline">
          Vegan Health Pros
        </Link>
      </nav>

      <ul className="space-y-6">
        {veganCelebs.map((person, index) => (
          <li key={`${person.name}-${index}`} className="border-b border-gray-200 pb-4">
            <h2 className="text-xl font-semibold">{person.name}</h2>
            {person.field && <p className="text-sm text-gray-600">{person.field}</p>}
            {person.bio && <p className="mt-2">{person.bio}</p>}
            {person.veganSince && (
              <p className="text-sm text-gray-500 mt-1">Vegan since {person.veganSince}</p>
            )}
            {/* source kept in JSON, intentionally not rendered */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VeganCelebrities;
