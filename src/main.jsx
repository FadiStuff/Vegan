import "./index.css"; // ✅ this loads Tailwind styles
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Arguments from "./Arguments";
import WhyJustSomeAnimals from "./WhyJustSomeAnimals";
import Layout from "./Layout";
import WhyVegan from "./WhyVegan";
import Home from "./Home"; // ✅ NEW: Import your new homepage
import SourcesOfMeat from "./SourcesOfMeat";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />           {/* ✅ New Homepage */}
          <Route path="/arguments" element={<Arguments />} />
          <Route path="/sourcesofmeat" element={<SourcesOfMeat />} />
          <Route path="/why-just-some-animals" element={<WhyJustSomeAnimals />} />
          <Route path="/whyvegan" element={<WhyVegan />} /> {/* ✅ WhyVegan moved to its own route */}
        </Routes>
      </Layout>
    </Router>
  </React.StrictMode>
);
