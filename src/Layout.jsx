// src/Layout.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="py-6 border-b border-gray-200 mb-8">
        <nav className="max-w-3xl mx-auto px-6 flex justify-between text-sm">
          <Link to="/" className="text-green-700 underline">
            Why Vegan?
          </Link>
          <Link to="/arguments" className="text-green-700 underline">
            Arguments
          </Link>
        </nav>
      </header>

      <main className="max-w-3xl mx-auto px-6 pb-20">{children}</main>
    </div>
  );
}
