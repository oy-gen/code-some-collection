import {
  BalanceScaleState,
  ScalesAndWeights,
} from "../../../03-data/store/slices/balanceScaleSlice";

export function balanceScaleRule(
  scalesAndWeights: ScalesAndWeights
): Partial<BalanceScaleState> | null {
  if (
    scalesAndWeights.leftScale === null ||
    scalesAndWeights.rightScale === null
  ) {
    return null;
  }
  if (scalesAndWeights.leftScale === scalesAndWeights.rightScale) {
    return {
      leftScale: scalesAndWeights.leftScale,
      rightScale: scalesAndWeights.rightScale,
      leftWeightsAdded: [],
      rightWeightsAdded: [],
    };
  }

  // limit weights to 10 and sort them accending
  const weights: number[] = scalesAndWeights.weights
    .slice(0, 10)
    .sort((a, b) => a - b);

  // Loop through all combinations of weight assignments
  const possibleCombinations = Math.pow(2, weights.length);
  for (
    let combinationIndex = 0;
    combinationIndex < possibleCombinations;
    combinationIndex++
  ) {
    let leftScale = scalesAndWeights.leftScale;
    let rightScale = scalesAndWeights.rightScale;
    const leftWeightsAdded: number[] = [];
    const rightWeightsAdded: number[] = [];

    // For each combination, check which weights go to the left scale and which go to the right scale.
    for (let i = 0; i < weights.length; i++) {
      const isWeightOnLeft = (combinationIndex & Math.pow(2, i)) !== 0;

      if (isWeightOnLeft) {
        leftScale += weights[i];
        leftWeightsAdded.push(weights[i]);
      } else {
        rightScale += weights[i];
        rightWeightsAdded.push(weights[i]);
      }
      if (leftScale === rightScale) {
        break;
      }
    }

    if (leftScale === rightScale) {
      return {
        leftScale: leftScale,
        rightScale: rightScale,
        leftWeightsAdded: leftWeightsAdded,
        rightWeightsAdded: rightWeightsAdded,
      };
    }
  }
  return null;
}
