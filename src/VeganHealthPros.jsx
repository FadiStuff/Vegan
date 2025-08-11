import React from "react";
import { Link } from "react-router-dom";
import veganHealth from "./data/vegan_health_pros.json";

const VeganHealthPros = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Vegan Health Professionals</h1>

      {/* Cross-links (lighter helper style) */}
      <nav className="mb-6 text-sm text-gray-600">
        <span className="mr-2">See also:</span>
        <Link to="/vegan-celebrities" className="text-green-700 hover:underline mr-4">
          Vegan Celebrities
        </Link>
        <Link to="/vegan-athletes" className="text-green-700 hover:underline">
          Vegan Athletes
        </Link>
      </nav>

      <ul className="space-y-6">
        {veganHealth.map((person, index) => (
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

export default VeganHealthPros;
