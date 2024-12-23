import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./main.css";
import { SmartHighlightingSearchPage } from "./01-presentation/pages/smart-highlighting-search/SmartHighlightingSearchPage.tsx";
import { BalanceScalePage } from "./01-presentation/pages/balance-scale/BalanceScalePage.tsx";
import { PageLayout } from "./01-presentation/components/shared/PageLayout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="" element={<SmartHighlightingSearchPage />} />
          <Route path="/balance-scale" element={<BalanceScalePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
