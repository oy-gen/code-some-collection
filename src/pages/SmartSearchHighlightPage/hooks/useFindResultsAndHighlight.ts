import { useEffect, useMemo } from "react";
import { selectSmartSearchHighlight } from "../../../store/smartSearchHighlightSlice";
import { useStore } from "../../../store/useStore";

const nonAlphaNumericRegExp: RegExp = /[^a-zA-Z0-9]/g;
const alphaNumericRegExp: RegExp = /[a-zA-Z0-9]/g;

export default function useFindResultsAndHighlight(
  searchValue: string
): string[] | null {
  const { contractNumbers, setSearchResults: setSearchResult } = useStore(
    selectSmartSearchHighlight
  );
  const highlightedMatches = useMemo(() => {
    const foundMatches = findResults(searchValue, contractNumbers);

    return highlightResults(searchValue, foundMatches);
  }, [searchValue, contractNumbers]);

  useEffect(() => {
    setSearchResult(highlightedMatches);
  }, [highlightedMatches, setSearchResult]);
  return null;
}

function findResults(
  searchValue: string,
  data: string[] | null
): string[] | null {
  if (!data || data.length === 0 || !searchValue) {
    return null;
  }

  const normalizedSearchValue = searchValue
    .replace(nonAlphaNumericRegExp, "")
    .toLowerCase();

  if (!normalizedSearchValue) {
    return null;
  }

  const normalizedData = data.map((value) => ({
    original: value,
    normalized: value.replace(nonAlphaNumericRegExp, "").toLowerCase(),
  }));

  const matches = normalizedData.reduce<string[]>((acc, item) => {
    if (item.normalized.includes(normalizedSearchValue)) {
      acc.push(item.original);
    }
    return acc;
  }, []);
  return matches;
}

function highlightResults(
  searchValue: string,
  matches: string[] | null
): string[] | null {
  if (!matches || !matches.length || searchValue === "") {
    return null;
  }

  const normalizedSearchValue = searchValue.replace(nonAlphaNumericRegExp, "");
  if (normalizedSearchValue === "") {
    return null;
  }

  const highlightedMatches: string[] = matches.map((match) => {
    const normalizedMatch = match.replace(nonAlphaNumericRegExp, "");
    const matchStartIndex = normalizedMatch
      .toLowerCase()
      .indexOf(normalizedSearchValue.toLowerCase());

    if (matchStartIndex === -1) {
      return match;
    }

    const originalToPlaceholder = Array.from(
      match.replace(alphaNumericRegExp, "$")
    );
    const highlightedParts = Array.from(normalizedMatch).map((char, index) => {
      if (
        index >= matchStartIndex &&
        index < matchStartIndex + normalizedSearchValue.length
      ) {
        return `<span class="highlight">${char}</span>`;
      }
      return char;
    });

    let highlightIndex = 0;
    const highlightedResult = originalToPlaceholder.map((char) =>
      char === "$" ? highlightedParts[highlightIndex++] : char
    );

    return highlightedResult.join("");
  });

  return highlightedMatches;
}
