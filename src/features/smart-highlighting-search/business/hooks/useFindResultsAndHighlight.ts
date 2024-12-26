import { useEffect, useMemo } from "react";
import {
  selectSmartHighlightingSearch,
  useStore,
} from "../../../../shared/store/useStore.ts";
import { highlightSearchResultsRule } from "../rules/highlightSearchResultsRule.ts";
import { findSearchResultsRule } from "../rules/findSearchResultsRule.ts";

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
