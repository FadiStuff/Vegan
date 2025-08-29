// src/NotFound.jsx
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function NotFound() {
  const { pathname } = useLocation();

  // Add a temporary <meta name="robots" content="noindex, nofollow">
  useEffect(() => {
    let meta = document.querySelector('meta[name="robots"]');
    const prev = meta?.getAttribute("content") ?? null;

    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "robots");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", "noindex, nofollow");

    return () => {
      if (prev !== null) meta.setAttribute("content", prev);
      else meta.parentNode && meta.parentNode.removeChild(meta);
    };
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 text-center">
      <h1 className="text-3xl font-serif">Page not found</h1>
      <p className="mt-4 text-base text-gray-600">
        {pathname === "/vegan-athletes"
          ? "The /vegan-athletes page has been removed."
          : "This route doesn’t exist."}
      </p>
      <div className="mt-6">
        <Link to="/" className="underline">
          Go back home
        </Link>
      </div>
    </div>
  );
}
