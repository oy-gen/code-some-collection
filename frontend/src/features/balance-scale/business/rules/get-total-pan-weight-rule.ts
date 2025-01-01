export function getTotalPanWeightRule(panWeights: number[]): number {
  return panWeights.reduce((previous, current) => previous + current, 0);
}
