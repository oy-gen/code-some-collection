import { InsureNumber } from "../api/models/insure-number.model.ts";

export interface SmartHighlightingSearchStateAware {
  smartHighlightingSearch: SmartHighlightingSearchState;
}

export interface SmartHighlightingSearchState {
  insureNumbers: InsureNumber[];
  searchResults: string[];
  addInsureNumberToStore: (insureNumber: InsureNumber) => void;
  setSearchResultsToStore: (results: string[]) => void;
  setInsureNumbersToStore: (insureNumbers: InsureNumber[]) => void;
}
