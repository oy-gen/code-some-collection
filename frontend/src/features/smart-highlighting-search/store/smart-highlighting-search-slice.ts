import { StateCreator } from "zustand";
import { AppState } from "../../../shared/store/use-store.ts";
import { SmartHighlightingSearchStateAware } from "./smart-highlighting-search-state.ts";

export const createSmartHighlightingSearchSlice: StateCreator<
  AppState,
  [],
  [],
  SmartHighlightingSearchStateAware
> = (set, get, _store) => ({
  smartHighlightingSearch: {
    insureNumbers: [],
    searchResults: [],
    addInsureNumberToStore: (newNumber: string) => {
      const insureNumbers = get().smartHighlightingSearch.insureNumbers;
      if (insureNumbers && !insureNumbers.includes(newNumber)) {
        set((state) => ({
          smartHighlightingSearch: {
            ...state.smartHighlightingSearch,
            insureNumbers: [newNumber, ...insureNumbers],
          },
        }));
      }
    },
    setSearchResultsToStore: (results: string[]) => {
      set((state) => ({
        smartHighlightingSearch: {
          ...state.smartHighlightingSearch,
          searchResults: results,
        },
      }));
    },
    setInsureNumbersToStore: (insureNumbers: string[]) => {
      set((state) => ({
        smartHighlightingSearch: {
          ...state.smartHighlightingSearch,
          insureNumbers: insureNumbers,
        },
      }));
    },
  },
});
