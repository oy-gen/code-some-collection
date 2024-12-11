import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  createSmartHighlightingSearchSlice,
  SmartHighlightingSearchState,
} from "./smartHighlightingSearchSlice.ts";

export type AppState = SmartHighlightingSearchState;

export const useStore = create<AppState>()(
  devtools(
    (set, get, store) => ({
      ...createSmartHighlightingSearchSlice(set, get, store),
    }),
    {
      name: "AppStore",
      enabled: true,
    }
  )
);

export const selectSmartHighlightingSearch = (state: AppState) =>
  state.smartHighlightingSearch;
