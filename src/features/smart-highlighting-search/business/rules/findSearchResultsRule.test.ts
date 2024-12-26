import { findSearchResultsRule } from "./findSearchResultsRule.ts";

describe("findSearchResultsRule", () => {
  const testCases = [
    {
      description: "returns null when data is null",
      searchValue: "search",
      data: null,
      expected: null,
    },
    {
      description: "returns null when data is an empty array",
      searchValue: "search",
      data: [],
      expected: null,
    },
    {
      description: "returns null when searchValue is an empty string",
      searchValue: "",
      data: ["value1", "value2"],
      expected: null,
    },
    {
      description:
        "returns null when searchValue has only non-alphanumeric characters",
      searchValue: "!!!",
      data: ["value1", "value2"],
      expected: null,
    },
    {
      description: "returns matching data for case-insensitive search",
      searchValue: "value",
      data: ["Value1", "Other"],
      expected: ["Value1"],
    },
    {
      description:
        "returns matching data with non-alphanumeric characters ignored",
      searchValue: "abc",
      data: ["a-b-c", "123abc456"],
      expected: ["a-b-c", "123abc456"],
    },
    {
      description: "returns empty array when no matches are found",
      searchValue: "xyz",
      data: ["abc", "123"],
      expected: [],
    },
    {
      description: "handles multiple matches in data",
      searchValue: "test",
      data: ["test1", "a test", "no match"],
      expected: ["test1", "a test"],
    },
  ];

  testCases.forEach(({ description, searchValue, data, expected }) => {
    test(description, () => {
      expect(findSearchResultsRule(searchValue, data)).toEqual(expected);
    });
  });
});
