import "./index.css"; // ✅ Tailwind
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async"; // ✅ NEW
import Arguments from "./Arguments";
import NotFound from "./NotFound";
import WhyJustSomeAnimals from "./WhyJustSomeAnimals";
import RightSideOfHistory from "./RightSideOfHistory";
import Layout from "./Layout";
import WhyVegan from "./WhyVegan";
import VeganismIs from "./VeganismIs";
import SourcesOfMeat from "./SourcesOfMeat";
import PhotoCredits from "./PhotoCredits.jsx";

import HomeTest from "./HomeTest.jsx";
import PeopleDiets from "./PeopleDiets.jsx";

// ✅ ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider> {/* ✅ Wrap everything in HelmetProvider */}
      <Router>
        <ScrollToTop /> {/* ✅ Scroll to top on every route change */}
        <Layout>
          <Routes>
            {/* ✅ Home */}
            <Route path="/" element={<RightSideOfHistory />} />

            {/* ✅ Old link redirect */}
            <Route path="/rightsideofhistory" element={<Navigate to="/" replace />} />

            {/* ✅ Veganism definition page */}
            <Route path="/veganism-is" element={<VeganismIs />} />

            {/* Other routes */}
            <Route path="/arguments" element={<Arguments />} />
            <Route path="/sourcesofmeat" element={<SourcesOfMeat />} />
            <Route path="/why-just-some-animals" element={<WhyJustSomeAnimals />} />
            <Route path="/whyvegan" element={<WhyVegan />} />
            <Route path="/photo-credits" element={<PhotoCredits />} />
            <Route path="/people" element={<PeopleDiets />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </HelmetProvider>
  </React.StrictMode>
);
