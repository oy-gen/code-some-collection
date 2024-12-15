import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigation } from "./01-presentation/components/Navigation";
import "./main.css";
import { SmartHighlightingSearchPage } from "./01-presentation/pages/SmartHighlightingSearchPage";
import { BalanceScalesPage } from "./01-presentation/pages/BalanceScalesPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Navigation />}>
          <Route path="" element={<SmartHighlightingSearchPage />} />
          <Route path="/balance-scale" element={<BalanceScalesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
