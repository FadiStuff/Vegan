import './index.css';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import WhyVegan from './WhyVegan.jsx';
import Arguments from './Arguments.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.DEV ? "/" : "/Vegan/"}>
      <Routes>
        <Route path="/" element={<WhyVegan />} />
        <Route path="/arguments" element={<Arguments />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
