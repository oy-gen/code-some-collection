import { StateCreator } from "zustand";
import { AppState } from "../useStore.ts";
import {
  smartHighlightingSearchInitialState,
  SmartHighlightingSearchStateAware,
} from "./SmartHighlightingSearchState.ts";

export const createSmartHighlightingSearchSlice: StateCreator<
  AppState,
  [],
  [],
  SmartHighlightingSearchStateAware
> = (set, get, _store) => ({
  smartHighlightingSearch: {
    contractNumbers: smartHighlightingSearchInitialState,
    searchResults: null,
    addContractNumber: (newNumber: string) => {
      const contractNumbers = get().smartHighlightingSearch.contractNumbers;
      if (newNumber.trim() === "") return;
      if (contractNumbers && !contractNumbers.includes(newNumber)) {
        set((state) => ({
          smartHighlightingSearch: {
            ...state.smartHighlightingSearch,
            contractNumbers: [newNumber, ...contractNumbers],
          },
        }));
      }
    },
    setSearchResults: (matches: string[] | null) => {
      set((state) => ({
        smartHighlightingSearch: {
          ...state.smartHighlightingSearch,
          searchResults: matches,
        },
      }));
    },
  },
});
