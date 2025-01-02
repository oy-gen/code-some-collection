import { useEffect } from "react";
import { getMatchingInsureNumbersFromDb } from "../../api/services/api-service.ts";
import { highlightSearchResultsRule } from "../rules/highlight-search-results-rule.ts";
import {
  selectSmartHighlightingSearch,
  useStore,
} from "../../../../shared/store/use-store.ts";

export default function useGetSearchResults(searchValue: string): void {
  const { setSearchResultsToStore } = useStore(selectSmartHighlightingSearch);

  useEffect(() => {
    if (!searchValue) {
      setSearchResultsToStore([]);
      return;
    }
    const fetchAndHighlight = async () => {
      const matches: string[] =
        await getMatchingInsureNumbersFromDb(searchValue);

      const highlightedResults: string[] = highlightSearchResultsRule(
        searchValue,
        matches,
      );

      setSearchResultsToStore(highlightedResults);
    };
    fetchAndHighlight();
  }, [searchValue, setSearchResultsToStore]);
}
