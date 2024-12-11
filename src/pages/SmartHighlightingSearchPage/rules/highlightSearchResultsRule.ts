export const highlightSearchResultsRule = (
  searchValue: string,
  matches: string[] | null
): string[] | null => {
  if (!matches || !matches.length || searchValue === "") {
    return null;
  }
  const nonAlphaNumericRegExp: RegExp = /[^a-zA-Z0-9]/g;
  const alphaNumericRegExp: RegExp = /[a-zA-Z0-9]/g;

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
};
