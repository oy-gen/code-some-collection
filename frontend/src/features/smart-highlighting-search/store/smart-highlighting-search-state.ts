export interface SmartHighlightingSearchStateAware {
  smartHighlightingSearch: SmartHighlightingSearchState;
}

export interface SmartHighlightingSearchState {
  contractNumbers: string[] | null;
  searchResults: string[] | null;
  addContractNumber: (newNumber: string) => void;
  setSearchResults: (matches: string[] | null) => void;
}

export const smartHighlightingSearchInitialState = [
  "12C-bB3-3_cC",
  "_bCCb31-1Cac",
  "C-3B133A-1/A",
  "B3C-C-__Ca_C",
  "13-_3-C-ba-1",
  "1b12C2a_2-2b",
  "/cba2BC2_a/c",
  "231_c_-3A-a_",
  "321/13a--Cab",
  "c-_232-/2231",
  "b2-2Bb-/2c3C",
  "/a/c3c-c33bc",
  "/-CB-bC2-cB2",
  "-2B3abc/bBca",
  "1/2ca-c3-33c",
];
