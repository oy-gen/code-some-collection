import { useEffect, useMemo } from "react";
import {
  selectSmartHighlightingSearch,
  useStore,
} from "../../../03-data/store/useStore";
import { highlightSearchResultsRule } from "../rules/highlightSearchResultsRule";
import { findSearchResultsRule } from "../rules/findSearchResultsRule";

export default function useFindSearchResultsAndHighlight(
  searchValue: string
): string[] | null {
  const { contractNumbers, setSearchResults: setSearchResult } = useStore(
    selectSmartHighlightingSearch
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
