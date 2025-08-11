// src/Layout.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      {/* Reduced bottom margin & nav padding */}
      <header className="py-5 border-b border-gray-200 mb-6">
        <nav className="max-w-5xl mx-auto px-6 py-4 flex flex-wrap justify-center gap-x-8 gap-y-3 text-base font-medium text-green-700">
          <Link to="/" className="hover:underline hover:text-green-900 transition">
            Veganism is
          </Link>
          <Link to="/whyvegan" className="hover:underline hover:text-green-900 transition">
            Why vegan
          </Link>
          <Link to="/rightsideofhistory" className="hover:underline hover:text-green-900 transition">
            Right side of history
          </Link>
          <Link to="/why-just-some-animals" className="hover:underline hover:text-green-900 transition">
            Why some animals, not others
          </Link>
          <Link to="/sourcesofmeat" className="hover:underline hover:text-green-900 transition">
            Sources of meat
          </Link>
          <Link to="/arguments" className="hover:underline hover:text-green-900 transition">
            But what about...
          </Link>
        </nav>
      </header>

      {/* Keep your original content wrapper so pages render */}
      <main className="max-w-5xl mx-auto px-6 pb-24 flex-grow">{children}</main>

      <footer className="text-center text-sm text-gray-500 pb-6">
        <p>Made with love, quietly.</p>
        <p>
          <Link to="/photo-credits" className="hover:underline hover:text-green-900">
            Photo Credits
          </Link>
        </p>
      </footer>
    </div>
  );
}
