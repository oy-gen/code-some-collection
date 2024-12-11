import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  createSmartHighlightingSearchSlice,
  SmartHighlightingSearchState,
} from "./smartHighlightingSearchSlice.ts";

export type AppState = SmartHighlightingSearchState;

export const useStore = create<AppState>()(
  devtools(
    (...args) => ({
      ...createSmartHighlightingSearchSlice(...args),
    }),
    {
      name: "AppStore",
      enabled: true,
    }
  )
);
