import { useEffect, useMemo } from "react";
import {
  selectSmartHighlightingSearch,
  useStore,
} from "../../../../shared/store/use-store.ts";
import { findSearchResultsRule } from "../rules/find-search-results-rule.ts";
import { highlightSearchResultsRule } from "../rules/highlight-search-results-rule.ts";

export default function useFindSearchResultsAndHighlight(
  searchValue: string,
): string[] | null {
  const { contractNumbers, setSearchResults: setSearchResult } = useStore(
    selectSmartHighlightingSearch,
  );
  const highlightedMatches = useMemo(() => {
    const foundMatches = findSearchResultsRule(searchValue, contractNumbers);

    return highlightSearchResultsRule(searchValue, foundMatches);
  }, [searchValue, contractNumbers]);

  useEffect(() => {
    setSearchResult(highlightedMatches);
  }, [highlightedMatches, setSearchResult]);
  return null;
}
