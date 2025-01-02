export interface SmartHighlightingSearchStateAware {
  smartHighlightingSearch: SmartHighlightingSearchState;
}

export interface SmartHighlightingSearchState {
  insureNumbers: string[];
  searchResults: string[];
  addInsureNumberToStore: (insureNumber: string) => void;
  setSearchResultsToStore: (results: string[]) => void;
  setInsureNumbersToStore: (insureNumbers: string[]) => void;
}
