import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SmartHighlightingSearchPage } from "./01-presentation/pages/SmartHighlightingSearchPage";
import { Navigation } from "./01-presentation/components/Navigation";
import "./main.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Navigation />}>
          <Route path="" element={<SmartHighlightingSearchPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
