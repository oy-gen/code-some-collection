import {
  HeavierSideEnum,
  ScaleData,
} from "../../../03-data/store/slices/balanceScaleSlice";
import { balanceScaleRule } from "./balanceScaleRule";

describe("balanceScaleRule", () => {
  const testCases: {
    description: string;
    input: { leftScale: number[]; rightScale: number[]; weights: number[] };
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
        leftScaleSum: 8,
        rightScaleSum: 8,
        heavierSide: HeavierSideEnum.Equal,
      },
    },
    {
      description: "find balanced scales with the lowest combination possible",
      input: {
        leftScale: [3],
        rightScale: [7],
        weights: [6, 10, 7, 1, 67, 4],
      },
      expected: {
        leftScale: [3, 4],
        rightScale: [7],
        weights: [6, 10, 7, 1, 67],
        leftScaleSum: 7,
        rightScaleSum: 7,
        heavierSide: HeavierSideEnum.Equal,
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
        leftScaleSum: 20,
        rightScaleSum: 20,
        heavierSide: HeavierSideEnum.Equal,
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
        leftScaleSum: 3,
        rightScaleSum: 3,
        heavierSide: HeavierSideEnum.Equal,
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
        leftScaleSum: 3,
        rightScaleSum: 3,
        heavierSide: HeavierSideEnum.Equal,
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
        leftScaleSum: 100,
        rightScaleSum: 100,
        heavierSide: HeavierSideEnum.Equal,
      },
    },
    {
      description:
        "balance the scale with several weights initially on one side",
      input: {
        leftScale: [3, 5],
        rightScale: [9],
        weights: [2, 45, 11, 10],
      },
      expected: {
        leftScale: [3, 5, 11],
        rightScale: [9, 10],
        weights: [2, 45],
        leftScaleSum: 19,
        rightScaleSum: 19,
        heavierSide: HeavierSideEnum.Equal,
      },
    },
    {
      description: "return null when the scale is already balanced in sum",
      input: {
        leftScale: [3, 4],
        rightScale: [7],
        weights: [6, 10, 1],
      },
      expected: null,
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
      description: "return null when the scale is already balanced",
      input: {
        leftScale: [10],
        rightScale: [10],
        weights: [4, 688],
      },
      expected: null,
    },
  ];

  testCases.forEach((testCase) => {
    const { description, input, expected } = testCase;
    it(description, () => {
      const result = balanceScaleRule(
        input.leftScale,
        input.rightScale,
        input.weights,
      );
      expect(result).toEqual(expected);
    });
  });
});
