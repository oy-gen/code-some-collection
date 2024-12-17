import { StateCreator } from "zustand";
import { AppState } from "../useStore";

export interface BalanceScaleStateAware {
  balanceScale: BalanceScaleState;
}

export interface BalanceScaleState extends ScaleData {
  addWeightToStock: (weight: number) => void;
  removeWeightFromStock: (weight: number) => void;
  setBalancedScale: (scaleData: ScaleData) => void;
  resetScale: () => void;
}

export interface ScaleData {
  leftScale: number[];
  rightScale: number[];
  weights: number[];
}

const initialState: ScaleData = {
  leftScale: [3],
  rightScale: [7],
  weights: [6, 10, 7, 1, 67, 4],
};

export const createBalanceScaleSlice: StateCreator<
  AppState,
  [],
  [],
  BalanceScaleStateAware
> = (set, _get, _store) => ({
  balanceScale: {
    ...initialState,
    addWeightToStock: (weightToAdd: number) =>
      set((state) => ({
        balanceScale: {
          ...state.balanceScale,
          weights: state.balanceScale.weights.includes(weightToAdd)
            ? state.balanceScale.weights
            : [...state.balanceScale.weights, weightToAdd],
        },
      })),
    removeWeightFromStock: (weightToRemove: number) =>
      set((state) => ({
        balanceScale: {
          ...state.balanceScale,
          weights: state.balanceScale.weights.filter(
            (weight) => weight !== weightToRemove,
          ),
        },
      })),
    setBalancedScale: (scaleData: ScaleData) =>
      set((state) => ({
        balanceScale: {
          ...state.balanceScale,
          leftScale: scaleData.leftScale,
          rightScale: scaleData.rightScale,
          weights: scaleData.weights,
        },
      })),
    resetScale: () =>
      set((state) => ({
        balanceScale: {
          ...state.balanceScale,
          ...initialState,
        },
      })),
  },
});
