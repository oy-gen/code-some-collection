import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  createSmartHighlightingSearchSlice,
  SmartHighlightingSearchStateAware,
} from "./slices/smartHighlightingSearchSlice.ts";
import {
  createBalanceScaleSlice,
  BalanceScaleStateAware,
} from "./slices/balanceScaleSlice.ts";

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
