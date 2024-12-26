import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { SmartHighlightingSearchStateAware } from "./smart-highlighting-search/SmartHighlightingSearchState.ts";
import { createSmartHighlightingSearchSlice } from "./smart-highlighting-search/smartHighlightingSearchSlice.ts";
import { BalanceScaleStateAware } from "./balance-scale/BalanceScaleState.ts";
import { createBalanceScaleSlice } from "./balance-scale/balanceScaleSlice.ts";

export type AppState = SmartHighlightingSearchStateAware &
  BalanceScaleStateAware;

export const useStore = create<AppState>()(
  devtools(
    (set, get, store) => ({
      ...createSmartHighlightingSearchSlice(set, get, store),
      ...createBalanceScaleSlice(set, get, store),
    }),
    {
      name: "AppStore",
      enabled: true,
    },
  ),
);

export const selectSmartHighlightingSearch = (state: AppState) =>
  state.smartHighlightingSearch;
export const selectBalanceScaleSlice = (state: AppState) => state.balanceScale;
