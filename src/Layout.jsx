// src/Layout.jsx
import React from "react";
import { NavLink, Link } from "react-router-dom";

export default function Layout({ children }) {
  const linkCls = ({ isActive }) =>
    `${isActive ? "text-green-900 font-semibold underline" : "text-green-700"} hover:text-green-900 transition`;

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      {/* Compact, left-aligned navbar inside same width as body */}
      <header className="border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center gap-x-8 gap-y-2">
          {/* Brand */}
          <Link to="/" className="text-xl font-serif font-bold text-[#265947] hover:opacity-90">
            Plants Over Pain
          </Link>

          {/* Links — left-aligned, sit right after the brand */}
          <div className="ml-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <NavLink to="/" className={linkCls}>Right side of history</NavLink>
            <NavLink to="/veganism-is" className={linkCls}>Veganism is</NavLink>
            <NavLink to="/whyvegan" className={linkCls}>Why vegan</NavLink>
            <NavLink to="/why-just-some-animals" className={linkCls}>Why some animals, not others</NavLink>
            <NavLink to="/sourcesofmeat" className={linkCls}>Sources of meat</NavLink>
            <NavLink to="/arguments" className={linkCls}>But what about...</NavLink>
          </div>
        </nav>
      </header>

      {/* Page content uses the same container width */}
      <main className="max-w-7xl mx-auto px-4 pb-16 flex-grow">{children}</main>

      <footer className="text-center text-sm text-gray-500 pb-6">
        <p>
          Made with love, quietly.{" "}
          <Link to="/photo-credits" className="hover:underline hover:text-green-900">
            Photo Credits
          </Link>
        </p>
      </footer>
    </div>
  );
}
