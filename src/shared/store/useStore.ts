import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { SmartHighlightingSearchStateAware } from "../../features/smart-highlighting-search/store/SmartHighlightingSearchState.ts";
import { createSmartHighlightingSearchSlice } from "../../features/smart-highlighting-search/store/smartHighlightingSearchSlice.ts";
import { BalanceScaleStateAware } from "../../features/balance-scale/store/BalanceScaleState.ts";
import { createBalanceScaleSlice } from "../../features/balance-scale/store/balanceScaleSlice.ts";

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
