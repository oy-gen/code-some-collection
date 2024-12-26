import { createRoot } from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { PageLayout } from "./shared/components/page-layout.tsx";
import { GlobalStyles } from "./shared/styles/global-styles.ts";
import { ThemeProvider } from "styled-components";
import { theme } from "./shared/styles/theme.ts";
import { SmartHighlightingSearchPage } from "./features/smart-highlighting-search/presentation/smart-highlighting-search-page.tsx";
import { BalanceScalePage } from "./features/balance-scale/presentation/balance-scale-page.tsx";
import { StrictMode } from "react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="/balance-scale" element={<BalanceScalePage />} />
            <Route path="" element={<SmartHighlightingSearchPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
