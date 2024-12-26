import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SmartHighlightingSearchPage } from "./features/smart-highlighting-search/presentation/SmartHighlightingSearchPage.tsx";
import { BalanceScalePage } from "./features/balance-scale/presentation/BalanceScalePage.tsx";
import { PageLayout } from "./shared/components/PageLayout.tsx";
import { GlobalStyles } from "./shared/styles/GlobalStyles.ts";
import { ThemeProvider } from "styled-components";
import { theme } from "./shared/styles/theme.ts";

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
