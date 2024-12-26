import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SmartHighlightingSearchPage } from "./presentation/pages/smart-highlighting-search/SmartHighlightingSearchPage.tsx";
import { BalanceScalePage } from "./presentation/pages/balance-scale/BalanceScalePage.tsx";
import { PageLayout } from "./presentation/shared-components/PageLayout.tsx";
import { GlobalStyles } from "./styles/GlobalStyles.ts";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme.ts";

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
