const nonAlphaNumericRegExp: RegExp = /[^a-zA-Z0-9]/g;
const alphaNumericRegExp: RegExp = /[a-zA-Z0-9]/g;

export default function useHighlightSearchMatch(
  searchValue: string,
  match: string | null
): string | null {
  if (!match || match.length === 0 || !searchValue) {
    return null;
  }

  const normalizedSearchValue = searchValue.replace(nonAlphaNumericRegExp, "");
  const normalizedMatch = match.replace(nonAlphaNumericRegExp, "");

  if (!normalizedMatch || !normalizedSearchValue) {
    return null;
  }

  let highlightedResult = match;

  const offsetPositionOfMatch: number = normalizedMatch
    .toLowerCase()
    .indexOf(normalizedSearchValue.toLowerCase());

  if (offsetPositionOfMatch !== -1) {
    // split all characters of the original matched value into an array
    // replacing all letters and numbers with a '$' placeholders
    // the placeholders will be used to map the highlights in the final step
    const matchAsArrayWithPlaceholders: string[] = Array.from(
      match.replace(alphaNumericRegExp, "$")
    );

    // now we split the original match value into 3 parts: left-of-match, match , right-of-match
    // Example: searchValue = 1234, original-match: abcd1234efg will result in "abcd", "1234", "efg"
    const leftOfMatchedPart: string = normalizedMatch.substring(
      0,
      offsetPositionOfMatch
    );
    const matchedPart: string = normalizedMatch.substring(
      offsetPositionOfMatch,
      offsetPositionOfMatch + normalizedSearchValue.length
    );
    const rightOfMatchedPart: string = normalizedMatch.substring(
      offsetPositionOfMatch + normalizedSearchValue.length
    );

    const matchedAsArrayWithHighlight: string[] = Array.from(matchedPart).map(
      (char) => `<span class="highlight">${char}</span>`
    );

    const matchArrayWithHighlights = [
      ...Array.from(leftOfMatchedPart),
      ...matchedAsArrayWithHighlight,
      ...Array.from(rightOfMatchedPart),
    ];

    const resultArray: string[] = [];
    let replacementIndex = 0;

    // map the array with highlights onto the array with placeholders, to keep all the none matching values unchanged
    for (let i = 0; i < matchAsArrayWithPlaceholders.length; i++) {
      if (matchAsArrayWithPlaceholders[i] === "$") {
        resultArray.push(matchArrayWithHighlights[replacementIndex++]);
      } else {
        resultArray.push(matchAsArrayWithPlaceholders[i]);
      }
    }
    highlightedResult = resultArray.join("");
  }

  return highlightedResult;
}
