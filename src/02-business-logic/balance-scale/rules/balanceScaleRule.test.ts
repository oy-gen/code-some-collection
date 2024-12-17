import { ScaleData } from "../../../03-data/store/slices/balanceScaleSlice";
import { balanceScaleRule } from "./balanceScaleRule";

describe("balanceScaleRule", () => {
  const testCases: {
    description: string;
    input: ScaleData;
    expected: ScaleData | null;
  }[] = [
    {
      description: "find balanced scales with one weight added to each sides",
      input: {
        leftScale: [1],
        rightScale: [3],
        weights: [7, 14, 10, 5],
      },
      expected: {
        leftScale: [1, 7],
        rightScale: [3, 5],
        weights: [14, 10],
      },
    },
    {
      description: "test-more",
      input: {
        leftScale: [3],
        rightScale: [7],
        weights: [6, 10, 7, 1, 67, 4],
      },
      expected: {
        leftScale: [3, 4],
        rightScale: [7],
        weights: [6, 10, 7, 1, 67],
      },
    },
    {
      description:
        "find balanced scales with several weights added to both sides",
      input: {
        leftScale: [1],
        rightScale: [3],
        weights: [37, 12, 122, 5, 18, 1],
      },
      expected: {
        leftScale: [1, 18, 1],
        rightScale: [3, 12, 5],
        weights: [37, 122],
      },
    },
    {
      description: "balance the scale with one weight only on the left side",
      input: {
        leftScale: [1],
        rightScale: [3],
        weights: [2, 4],
      },
      expected: {
        leftScale: [1, 2],
        rightScale: [3],
        weights: [4],
      },
    },
    {
      description: "balance the scale with one weight only on the right side",
      input: {
        leftScale: [3],
        rightScale: [1],
        weights: [2, 4],
      },
      expected: {
        leftScale: [3],
        rightScale: [1, 2],
        weights: [4],
      },
    },
    {
      description: "balance the scale with several weights added to one side",
      input: {
        leftScale: [1],
        rightScale: [100],
        weights: [33, 45, 33, 33],
      },
      expected: {
        leftScale: [1, 33, 33, 33],
        rightScale: [100],
        weights: [45],
      },
    },
    {
      description: "return null because there is no possible solution",
      input: {
        leftScale: [1],
        rightScale: [3],
        weights: [1, 4],
      },
      expected: null,
    },
    {
      description:
        "return null because no weights were provided and scale is not in balance",
      input: {
        leftScale: [1],
        rightScale: [3],
        weights: [],
      },
      expected: null,
    },
    {
      description: "return initial scale values without anything added",
      input: {
        leftScale: [10],
        rightScale: [10],
        weights: [4, 688],
      },
      expected: {
        leftScale: [10],
        rightScale: [10],
        weights: [4, 688],
      },
    },
  ];

  testCases.forEach((testCase) => {
    const { description, input, expected } = testCase;
    it(description, () => {
      const result = balanceScaleRule(input);
      expect(result).toEqual(expected);
    });
  });
});
