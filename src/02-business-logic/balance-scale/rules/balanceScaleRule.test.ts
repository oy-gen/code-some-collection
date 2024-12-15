import {
  BalanceScaleState,
  ScalesAndWeights,
} from "../../../03-data/store/slices/balanceScaleSlice";
import { balanceScaleRule } from "./balanceScaleRule";

describe("balanceScaleRule", () => {
  const testCases: {
    itShould: string;
    input: ScalesAndWeights;
    expected: Partial<BalanceScaleState> | null;
  }[] = [
    {
      itShould: "find balanced scales with one weight added to both sides",
      input: {
        leftScale: 1,
        rightScale: 3,
        weights: [7, 14, 10, 5],
      },
      expected: {
        leftScale: 8,
        rightScale: 8,
        leftWeightsAdded: [7],
        rightWeightsAdded: [5],
      },
    },
    {
      itShould: "find balanced scales with several weights added to both sides",
      input: {
        leftScale: 1,
        rightScale: 3,
        weights: [37, 12, 122, 5, 18, 1],
      },
      expected: {
        leftScale: 20,
        rightScale: 20,
        leftWeightsAdded: [1, 18],
        rightWeightsAdded: [5, 12],
      },
    },
    {
      itShould: "balance the scale with one weight only on the left side",
      input: {
        leftScale: 1,
        rightScale: 3,
        weights: [2, 4],
      },
      expected: {
        leftScale: 3,
        rightScale: 3,
        leftWeightsAdded: [2],
        rightWeightsAdded: [],
      },
    },
    {
      itShould: "balance the with one weight only on the right side",
      input: {
        leftScale: 3,
        rightScale: 1,
        weights: [2, 4],
      },
      expected: {
        leftScale: 3,
        rightScale: 3,
        leftWeightsAdded: [],
        rightWeightsAdded: [2],
      },
    },
    {
      itShould: "balance the scale with several weights added to one side",
      input: {
        leftScale: 1,
        rightScale: 100,
        weights: [33, 45, 33, 33],
      },
      expected: {
        leftScale: 100,
        rightScale: 100,
        leftWeightsAdded: [33, 33, 33],
        rightWeightsAdded: [],
      },
    },
    {
      itShould: "return null because there is no possible solution",
      input: {
        leftScale: 1,
        rightScale: 3,
        weights: [1, 4],
      },
      expected: null,
    },
    {
      itShould:
        "return null because no weights were provided and cale is not in balance",
      input: {
        leftScale: 1,
        rightScale: 3,
        weights: [],
      },
      expected: null,
    },
    {
      itShould: "return initial scale values without anything added",
      input: {
        leftScale: 10,
        rightScale: 10,
        weights: [4, 688],
      },
      expected: {
        leftScale: 10,
        rightScale: 10,
        leftWeightsAdded: [],
        rightWeightsAdded: [],
      },
    },
  ];
  testCases.forEach((testCase) => {
    const { itShould: name, input, expected } = testCase;
    it(name, () => {
      const result = balanceScaleRule(input);
      expect(result).toEqual(expected);
    });
  });
});
