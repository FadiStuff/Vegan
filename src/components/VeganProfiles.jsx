import React from "react";
import { Link } from "react-router-dom";
import veganProfiles from "../data/vegan_people.json";

const VeganProfiles = () => {
  const placeholder = "https://via.placeholder.com/640x360?text=Vegan+profile";

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {veganProfiles.map((category) => {
        let showMorePath = "";
        if (category.category.toLowerCase().includes("athlete")) {
          showMorePath = "/vegan-athletes";
        } else if (category.category.toLowerCase().includes("celebr")) {
          showMorePath = "/vegan-celebrities";
        } else if (category.category.toLowerCase().includes("health")) {
          showMorePath = "/vegan-health-pros";
        }

        return (
          <div key={category.category} className="mb-16">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-3xl font-bold text-[#265947] font-serif">
                {category.category}
              </h2>
              {showMorePath && (
                <Link
                  to={showMorePath}
                  className="text-sm text-[#265947] hover:underline"
                >
                  Show more →
                </Link>
              )}
            </div>
            <p className="text-gray-700 mb-8">{category.description}</p>

            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {category.profiles.map((person) => {
                const role =
                  person.sport || person.specialty || person.field || "";

                return (
                  <div
                    key={person.name}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={person.image || placeholder}
                      alt={person.name}
                      className="w-full h-44 object-cover object-top"
                      loading="lazy"
                      onError={(e) => {
                        if (e.currentTarget.src !== placeholder) {
                          e.currentTarget.src = placeholder;
                        }
                      }}
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-1">
                        {person.name}
                      </h3>
                      {role && (
                        <p className="text-sm text-[#265947] font-medium">
                          {role}
                        </p>
                      )}
                      {person.achievements && (
                        <p className="text-gray-600 text-sm mt-1">
                          {person.achievements}
                        </p>
                      )}
                      {person.veganSince && (
                        <p className="text-xs text-gray-500 mt-2">
                          Vegan since {person.veganSince}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VeganProfiles;
