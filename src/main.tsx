import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SmartHighlightingSearchPage } from "./01-presentation/pages/smart-highlighting-search/SmartHighlightingSearchPage.tsx";
import { BalanceScalePage } from "./01-presentation/pages/balance-scale/BalanceScalePage.tsx";
import { PageLayout } from "./01-presentation/components/shared/PageLayout.tsx";
import { GlobalStyles, theme } from "./GlobalStyles.ts";
import { ThemeProvider } from "styled-components";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="" element={<SmartHighlightingSearchPage />} />
            <Route path="/balance-scale" element={<BalanceScalePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
