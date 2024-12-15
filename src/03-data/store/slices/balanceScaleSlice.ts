import { StateCreator } from "zustand";
import { AppState } from "../useStore";

export interface BalanceScaleStateAware {
  balanceScale: BalanceScaleState;
}

export interface BalanceScaleState extends ScalesAndWeights {
  leftWeightsAdded: number[];
  rightWeightsAdded: number[];
  addWeight: (weight: number) => void;
  removeWeight: (weight: number) => void;
  applyBalanceCalculation: (
    leftWeightsAdded: number[],
    rightWeightsAdded: number[]
  ) => void;
}

export interface ScalesAndWeights {
  leftScale: number | null;
  rightScale: number | null;
  weights: number[];
}

export const createBalanceScaleSlice: StateCreator<
  AppState,
  [],
  [],
  BalanceScaleStateAware
> = (set, _get, _store) => ({
  balanceScale: {
    leftScale: 3,
    rightScale: 7,
    weights: [6, 10, 7, 1],
    leftWeightsAdded: [],
    rightWeightsAdded: [],
    addWeight: (weightToAdd: number) =>
      set((state) => ({
        balanceScale: {
          ...state.balanceScale,
          weights: state.balanceScale.weights.includes(weightToAdd)
            ? state.balanceScale.weights
            : [...state.balanceScale.weights, weightToAdd],
        },
      })),
    removeWeight: (weightToRemove: number) =>
      set((state) => ({
        balanceScale: {
          ...state.balanceScale,
          weights: state.balanceScale.weights.filter(
            (weight) => weight !== weightToRemove
          ),
        },
      })),
    applyBalanceCalculation: (leftWeights: number[], rightWeights: number[]) =>
      set((state) => ({
        balanceScale: {
          ...state.balanceScale,
          leftWeightsAdded: leftWeights,
          rightWeightsAdded: rightWeights,
        },
      })),
  },
});
