import { useEffect, useMemo } from "react";
import { getMatchingInsureNumbersFromDb } from "../../api/services/api-service.ts";
import { highlightSearchResultsRule } from "../rules/highlight-search-results-rule.ts";
import {
  selectSmartHighlightingSearch,
  useStore,
} from "../../../../shared/store/use-store.ts";

export default function useGetSearchResults(searchValue: string): string[] {
  const { setSearchResultsToStore, searchResults } = useStore(
    selectSmartHighlightingSearch,
  );

  useEffect(() => {
    if (!searchValue) {
      setSearchResultsToStore([]);
      return;
    }
    getMatchingInsureNumbersFromDb(searchValue).then((matches) => {
      const highlightedResults = highlightSearchResultsRule(
        searchValue,
        matches,
      );
      setSearchResultsToStore(highlightedResults);
    });
  }, [searchValue, setSearchResultsToStore]);

  return useMemo(() => searchResults, [searchResults]);
}
