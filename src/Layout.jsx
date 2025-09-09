import React, { useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";

export default function Layout({ children }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef(null);

  // Close on outside click + ESC
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    function handleEsc(e) {
      if (e.key === "Escape") setDropdownOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const linkCls = ({ isActive }) =>
    `${isActive ? "text-green-900 font-semibold underline" : "text-green-700"} hover:text-green-900 transition`;

  const closeMenu = () => setDropdownOpen(false);

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      {/* Compact, left-aligned navbar inside same width as body */}
      <header className="border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center gap-x-8 gap-y-2">
          {/* Brand */}
          <Link to="/" className="text-xl font-serif font-bold text-[#265947] hover:opacity-90" onClick={closeMenu}>
            Plants Over Pain
          </Link>

          {/* Links — left-aligned, sit right after the brand */}
          <div className="ml-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm relative">
            <NavLink to="/" className={linkCls} onClick={closeMenu}>Right side of history</NavLink>
            <NavLink to="/veganism-is" className={linkCls} onClick={closeMenu}>Veganism is</NavLink>
            <NavLink to="/whyvegan" className={linkCls} onClick={closeMenu}>Why vegan</NavLink>

            {/* Big Questions dropdown */}
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                className="text-green-700 hover:text-green-900 transition inline-flex items-center gap-1 px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                aria-controls="big-questions-menu"
                onClick={() => setDropdownOpen((v) => !v)}
              >
                Big Questions
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : "rotate-0"}`}>
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                </svg>
              </button>
              {dropdownOpen && (
                <div
                  id="big-questions-menu"
                  role="menu"
                  aria-label="Big Questions"
                  className="absolute mt-2 w-64 rounded-xl shadow-lg bg-white border border-gray-200 z-50 p-2 flex flex-col gap-1"
                >
                  <NavLink to="/why-just-some-animals" className={linkCls} onClick={closeMenu} role="menuitem">
                    Some animals, not others?
                  </NavLink>
                  <NavLink to="/sourcesofmeat" className={linkCls} onClick={closeMenu} role="menuitem">
                    Sources of meat
                  </NavLink>
                  <NavLink to="/first-vegan" className={linkCls} onClick={closeMenu} role="menuitem">
                    The First Vegan
                  </NavLink>
                </div>
              )}
            </div>

            <NavLink to="/arguments" className={linkCls} onClick={closeMenu}>The arguments</NavLink>
            <NavLink to="/people?diet=vegan" className={linkCls} onClick={closeMenu}>Vegans we know</NavLink>
          </div>
        </nav>
      </header>

      {/* Page content uses the same container width */}
      <main className="max-w-7xl mx-auto px-4 pb-16 flex-grow">{children}</main>

      <footer className="text-center text-sm text-gray-500 pb-6">
        <p>
          Made with love, quietly.{" "}
          <Link to="/photo-credits" className="hover:underline hover:text-green-900" onClick={closeMenu}>
            Photo Credits
          </Link>
        </p>
      </footer>
    </div>
  );
}
