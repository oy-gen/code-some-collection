import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SmartHighlightingSearchPage } from "./01-presentation/pages/SmartHighlightingSearchPage";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, theme } from "./styles/GlobalStyles";
import { Navigation } from "./01-presentation/components/Navigation";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<Navigation />}>
            <Route path="" element={<SmartHighlightingSearchPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
