import { ScaleData } from "../../../03-data/store/slices/balanceScaleSlice";

export function balanceScaleRule(scaleData: ScaleData): ScaleData | null {
  const leftScaleBase: number = scaleData.leftScale[0];
  const rightScaleBase: number = scaleData.rightScale[0];
  if (leftScaleBase === rightScaleBase) {
    return scaleData;
  }
  const weights: number[] = [...scaleData.weights];
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
    let leftScaleSum: number = scaleData.leftScale[0];
    let rightScaleSum: number = scaleData.rightScale[0];
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

      // Example with combinationIndex = 16 (placementIndex starts as 16) and 3 weights:
      // 1. 1st weight: placementIndex = 16 -> 16 % 3 = 1 → place weight on the left scale
      //    Update placementIndex: Math.floor(16 / 3) = 5
      // 2. 2nd weight: placementIndex = 5 -> 5 % 3 = 2 → place weight on the right scale
      //    Update placementIndex: Math.floor(5 / 3) = 1
      // 3. 3rd weight: placementIndex = 1 -> 1 % 3 = 1 → place weight on the left scale
      //    Update placementIndex: Math.floor(1 / 3) = 0 (loop ends)

      if (placement === 1) {
        leftScaleSum += currentWeight;
        leftWeightsAdded.push(currentWeight);
      } else if (placement === 2) {
        rightScaleSum += currentWeight;
        rightWeightsAdded.push(currentWeight);
      }
    }

    // Check if this combination is balanced and track the smallest balanced sum
    if (
      leftScaleSum === rightScaleSum &&
      leftScaleSum < lowestPossibleBalance
    ) {
      lowestPossibleBalance = leftScaleSum;
      const weightsRemaining = weights.filter(
        (weight) =>
          ![...leftWeightsAdded, ...rightWeightsAdded].includes(weight),
      );

      bestResult = {
        leftScale: [...scaleData.leftScale, ...leftWeightsAdded],
        rightScale: [...scaleData.rightScale, ...rightWeightsAdded],
        weights: weightsRemaining,
      };
    }
  }
  return bestResult;
}
