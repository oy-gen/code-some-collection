import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  createSmartSearchHighlightSlice,
  SmartSearchHighlightState,
} from "./smartSearchHighlightSlice.ts";

export type AppState = SmartSearchHighlightState;

export const useStore = create<AppState>()(
  devtools(
    (...args) => ({
      ...createSmartSearchHighlightSlice(...args),
    }),
    {
      name: "AppStore",
      enabled: true,
    }
  )
);
