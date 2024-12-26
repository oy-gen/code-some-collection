import { highlightSearchResultsRule } from "./highlightSearchResultsRule.ts";

describe("highlightSearchResultsRule", () => {
  const testCases = [
    {
      description: "returns null when matches is null",
      searchValue: "search",
      matches: null,
      expected: null,
    },
    {
      description: "returns null when matches is an empty array",
      searchValue: "search",
      matches: [],
      expected: null,
    },
    {
      description: "returns null when searchValue is an empty string",
      searchValue: "",
      matches: ["match1", "match2"],
      expected: null,
    },
    {
      description:
        "returns null when searchValue has only non-alphanumeric characters",
      searchValue: "!!!",
      matches: ["match1", "match2"],
      expected: null,
    },
    {
      description:
        "returns matches unaltered when searchValue does not match any entry",
      searchValue: "notfound",
      matches: ["match1", "match2"],
      expected: ["match1", "match2"],
    },
    {
      description: "highlights matches correctly for case-insensitive search",
      searchValue: "match",
      matches: ["MaTcH1", "no-match"],
      expected: [
        '<span class="highlight">M</span><span class="highlight">a</span><span class="highlight">T</span><span class="highlight">c</span><span class="highlight">H</span>1',
        'no-<span class="highlight">m</span><span class="highlight">a</span><span class="highlight">t</span><span class="highlight">c</span><span class="highlight">h</span>',
      ],
    },
    {
      description:
        "highlights matches correctly with non-alphanumeric characters in input",
      searchValue: "abc",
      matches: ["a-b-c", "123abc456"],
      expected: [
        '<span class="highlight">a</span>-<span class="highlight">b</span>-<span class="highlight">c</span>',
        '123<span class="highlight">a</span><span class="highlight">b</span><span class="highlight">c</span>456',
      ],
    },
    {
      description: "does not highlight matches without alphanumeric overlap",
      searchValue: "xyz",
      matches: ["abc", "123"],
      expected: ["abc", "123"],
    },
    {
      description:
        "handles mixed alphanumeric and non-alphanumeric characters in matches",
      searchValue: "123",
      matches: ["!123!@"],
      expected: [
        '!<span class="highlight">1</span><span class="highlight">2</span><span class="highlight">3</span>!@',
      ],
    },
  ];

  testCases.forEach(({ description, searchValue, matches, expected }) => {
    test(description, () => {
      expect(highlightSearchResultsRule(searchValue, matches)).toEqual(
        expected,
      );
    });
  });
});
