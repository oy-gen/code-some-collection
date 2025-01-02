import { useEffect } from "react";
import { getMatchingInsureNumbersFromDb } from "../../api/services/api-service.ts";
import { highlightSearchResultsRule } from "../rules/highlight-search-results-rule.ts";
import {
  selectSmartHighlightingSearch,
  useStore,
} from "../../../../shared/store/use-store.ts";
import { InsureNumber } from "../../api/models/insure-number.model.ts";

export default function useGetSearchResults(searchValue: string): void {
  const { setSearchResultsToStore } = useStore(selectSmartHighlightingSearch);

  useEffect(() => {
    if (!searchValue) {
      setSearchResultsToStore([]);
      return;
    }
    const fetchAndHighlight = async () => {
      const matches: InsureNumber[] =
        await getMatchingInsureNumbersFromDb(searchValue);
      const matchedInsureNumberStrings: string[] = matches.map(
        (match) => match.insureNumber,
      );

      const highlightedResults: string[] = highlightSearchResultsRule(
        searchValue,
        matchedInsureNumberStrings,
      );

      setSearchResultsToStore(highlightedResults);
    };
    fetchAndHighlight();
  }, [searchValue, setSearchResultsToStore]);
}
