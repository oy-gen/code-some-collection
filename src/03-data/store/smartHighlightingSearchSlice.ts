import { StateCreator } from "zustand";
import { AppState } from "./useStore";

export interface SmartHighlightingSearchState {
  smartHighlightingSearch: {
    contractNumbers: string[] | null;
    searchResults: string[] | null;
    addContractNumber: (newNumber: string) => void;
    setSearchResults: (matches: string[] | null) => void;
    initializeContractNumbers: (contractNumbers: string[]) => void;
  };
}

export const createSmartHighlightingSearchSlice: StateCreator<
  AppState,
  [],
  [],
  SmartHighlightingSearchState
> = (set, get, _store) => ({
  smartHighlightingSearch: {
    contractNumbers: null,
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
    initializeContractNumbers: (contractNumbers: string[]) => {
      set((state) => ({
        ...state,
        smartHighlightingSearch: {
          ...state.smartHighlightingSearch,
          contractNumbers,
        },
      }));
    },
  },
});
