import { useEffect, useMemo } from "react";
import { selectSmartSearchHighlight } from "../../../03-data/store/smartHighlightingSearchSlice";
import { useStore } from "../../../03-data/store/useStore";
import { highlightSearchResultsRule } from "../rules/highlightSearchResultsRule";
import { findSearchResultsRule } from "../rules/findSearchResultsRule copy";

export default function useFindSearchResultsAndHighlight(
  searchValue: string
): string[] | null {
  const { contractNumbers, setSearchResults: setSearchResult } = useStore(
    selectSmartSearchHighlight
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
