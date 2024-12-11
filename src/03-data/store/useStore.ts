import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  createSmartHighlightingSearchSlice,
  SmartHighlightingSearchStateAware,
} from "./smartHighlightingSearchSlice.ts";
import {
  createPlaceholderSlice,
  PlaceholderStateAware,
} from "./placeholderSlice copy.ts";

export type AppState = SmartHighlightingSearchStateAware &
  PlaceholderStateAware;

export const useStore = create<AppState>()(
  devtools(
    (set, get, store) => ({
      ...createSmartHighlightingSearchSlice(set, get, store),
      ...createPlaceholderSlice(set, get, store),
    }),
    {
      name: "AppStore",
      enabled: true,
    }
  )
);

export const selectSmartHighlightingSearch = (state: AppState) =>
  state.smartHighlightingSearch;
