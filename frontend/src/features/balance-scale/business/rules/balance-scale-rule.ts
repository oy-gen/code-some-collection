import { getTotalPanWeightRule } from "./get-total-pan-weight-rule";
import { HeavierSideEnum, ScaleData } from "../../store/balance-scale-state";

export function balanceScaleRule(
  leftScalePan: number[],
  rightScalePan: number[],
  weights: number[],
): ScaleData | null {
  const leftPanInitialWeight: number = getTotalPanWeightRule(leftScalePan);
  const rightPanInitialWeight: number = getTotalPanWeightRule(rightScalePan);

  if (leftPanInitialWeight === rightPanInitialWeight) {
    return null;
  }

  let lowestPossibleBalance = Infinity;
  let bestResult: ScaleData | null = null;

  // count all possible combinations
  // each weight can have 3 possible placements: left, right, unused
  // in the outer loop we iterate through all possible combinations
  // Example: With 4 weights, 3 positions each (3*3*3*3) there are 81 possible combinations

  const possibleCombinationsCount: number = Math.pow(3, weights.length);
  for (
    let combinationIndex = 1;
    combinationIndex < possibleCombinationsCount;
    combinationIndex++
  ) {
    let leftPanSum: number = leftPanInitialWeight;
    let rightPanSum: number = rightPanInitialWeight;
    const leftWeightsAdded: number[] = [];
    const rightWeightsAdded: number[] = [];
    let placementIndex: number = combinationIndex;

    //  Inner-loop: Iterate through each weight and generate a unique combination of placements
    for (let i = 0; i < weights.length; i++) {
      const currentWeight = weights[i];

      const placement: number = placementIndex % 3;
      placementIndex = Math.floor(placementIndex / 3);
      // Similar to binary system, we create a ternary (base-3) system
      // by taking placementIndex % 3, we determine the placement for the current weight.
      // The modulo operator (%) calculates the remainder of placementIndex divided by 3.
      // Since the remainder when dividing by 3 can only be 0, 1, or 2, we can use it
      //   to represent the 3 possible placements for a weight:
      //     0 → Weight is unused
      //     1 → Weight is placed on the left scale
      //     2 → Weight is placed on the right scale
      // After extracting the placement for the first weight, we divide placementIndex by 3
      // and round down (Math.floor) to shift to the next weight in the base-3 sequence.

      if (placement === 1) {
        leftPanSum += currentWeight;
        leftWeightsAdded.push(currentWeight);
      } else if (placement === 2) {
        rightPanSum += currentWeight;
        rightWeightsAdded.push(currentWeight);
      }
    }

    if (leftPanSum === rightPanSum && leftPanSum < lowestPossibleBalance) {
      lowestPossibleBalance = leftPanSum;
      const weightsRemaining = [...weights].filter(
        (weight) =>
          ![...leftWeightsAdded, ...rightWeightsAdded].includes(weight),
      );

      bestResult = {
        leftScalePan: [...leftScalePan, ...leftWeightsAdded],
        rightScalePan: [...rightScalePan, ...rightWeightsAdded],
        weights: weightsRemaining,
        leftScalePanSum: leftPanSum,
        rightScalePanSum: rightPanSum,
        heavierSide: HeavierSideEnum.Equal,
      };
    }
  }
  return bestResult;
}
