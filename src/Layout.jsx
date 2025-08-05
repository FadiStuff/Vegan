// src/Layout.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="py-6 border-b border-gray-200 mb-12">
<nav className="max-w-5xl mx-auto px-6 flex justify-between text-sm">
          <Link to="/" className="text-green-700 underline">
            Veganism is
          </Link>
          <Link to="/whyvegan" className="text-green-700 underline">
            Why Vegan?
          </Link>
          <Link to="/arguments" className="text-green-700 underline">
            but what about...
          </Link>
          <Link to="/sourcesofmeat" className="text-green-700 underline">
            SourcesOfMeat
          </Link>
        </nav>
      </header>

<main className="max-w-5xl mx-auto px-6 pb-24">{children}</main>
    </div>
  );
}
