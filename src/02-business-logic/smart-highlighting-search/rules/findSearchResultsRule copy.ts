export const findSearchResultsRule = (
  searchValue: string,
  data: string[] | null
): string[] | null => {
  if (!data || data.length === 0 || !searchValue) {
    return null;
  }
  const nonAlphaNumericRegExp: RegExp = /[^a-zA-Z0-9]/g;

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
};
