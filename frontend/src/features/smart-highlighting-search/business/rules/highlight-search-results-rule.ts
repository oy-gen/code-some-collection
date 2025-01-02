export const highlightSearchResultsRule = (
  searchValue: string,
  searchResults: string[],
): string[] => {
  if (!searchResults || !searchResults.length || searchValue === "") {
    return [];
  }
  const nonAlphaNumericRegExp: RegExp = /[^a-zA-Z0-9]/g;
  const alphaNumericRegExp: RegExp = /[a-zA-Z0-9]/g;

  const normalizedSearchValue = searchValue.replace(nonAlphaNumericRegExp, "");
  if (normalizedSearchValue === "") {
    return [];
  }

  return searchResults.map((result) => {
    const normalizedMatch = result.replace(nonAlphaNumericRegExp, "");
    const matchStartIndex = normalizedMatch
      .toLowerCase()
      .indexOf(normalizedSearchValue.toLowerCase());

    if (matchStartIndex === -1) {
      return result;
    }

    const originalToPlaceholder = Array.from(
      result.replace(alphaNumericRegExp, "$"),
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
      char === "$" ? highlightedParts[highlightIndex++] : char,
    );

    return highlightedResult.join("");
  });
};
