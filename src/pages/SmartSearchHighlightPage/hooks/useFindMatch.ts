const nonAlphaNumericRegExp: RegExp = /[^a-zA-Z0-9]/g;

export default function useFindMatch(
  searchValue: string,
  data: string[] | null
): string | null {
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

  const match =
    normalizedData.find((item) =>
      item.normalized.includes(normalizedSearchValue)
    ) ?? null;

  return match ? match.original : null;
}
