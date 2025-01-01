import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { SmartHighlightingSearchStateAware } from "../../features/smart-highlighting-search/store/smart-highlighting-search-state.ts";
import { BalanceScaleStateAware } from "../../features/balance-scale/store/balance-scale-state.ts";
import { createSmartHighlightingSearchSlice } from "../../features/smart-highlighting-search/store/smart-highlighting-search-slice.ts";
import { createBalanceScaleSlice } from "../../features/balance-scale/store/balance-scale-slice.ts";

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
