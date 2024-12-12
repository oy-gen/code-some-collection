import { StateCreator } from "zustand";
import { AppState } from "./useStore";

export interface PlaceholderStateAware {
  placeholder: PlaceholderState;
}

export interface PlaceholderState {
  content: null;
  setContent: () => void;
}

export const createPlaceholderSlice: StateCreator<
  AppState,
  [],
  [],
  PlaceholderStateAware
> = (set, _get, _store) => ({
  placeholder: {
    content: null,
    setContent: () => {
      set((state) => ({
        placeholder: {
          ...state.placeholder,
          content: null,
        },
      }));
    },
  },
});
