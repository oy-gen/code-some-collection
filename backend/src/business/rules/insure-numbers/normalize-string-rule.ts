// This rule is used to normalize a string by removing all non-alphanumeric characters and converting it to uppercase.
export const normalizeStringRule = (searchString: string): string | null => {
  if (!searchString) {
    return null;
  }
  const nonAlphaNumericRegExp: RegExp = /[^a-zA-Z0-9]/g;

  const normalizedSearchString: string = searchString
    .replace(nonAlphaNumericRegExp, "")
    .toUpperCase();

  return normalizedSearchString === "" ? null : normalizedSearchString;
};
