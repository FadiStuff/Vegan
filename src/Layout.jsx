// src/Layout.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <header className="py-6 border-b border-gray-200 mb-12">
        <nav className="max-w-5xl mx-auto px-6 py-6 flex flex-wrap justify-center gap-x-10 gap-y-4 text-base font-medium text-green-700">
          <Link to="/" className="hover:underline hover:text-green-900 transition">
            Veganism is
          </Link>
          <Link to="/whyvegan" className="hover:underline hover:text-green-900 transition">
            Why vegan?
          </Link>
          <Link to="/arguments" className="hover:underline hover:text-green-900 transition">
            But what about...
          </Link>
          <Link to="/why-just-some-animals" className="hover:underline hover:text-green-900 transition">
            Why some animals, not others?
          </Link>
          <Link to="/sourcesofmeat" className="hover:underline hover:text-green-900 transition">
            Sources of meat
          </Link>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-6 pb-24 flex-grow">{children}</main>

      <footer className="text-center text-sm text-gray-500 pb-6">
        Made with love, quietly.
      </footer>
    </div>
  );
}
