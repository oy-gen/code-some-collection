import { StateCreator } from "zustand";
import { AppState } from "../../../shared/store/use-store.ts";
import {
  balanceScaleInitialState,
  BalanceScaleStateAware,
  ScaleData,
} from "./balance-scale-state.ts";

export const createBalanceScaleSlice: StateCreator<
  AppState,
  [],
  [],
  BalanceScaleStateAware
> = (set, _get, _store) => ({
  balanceScale: {
    ...balanceScaleInitialState,
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
    setError: (message: string | null) =>
      set((state) => ({
        balanceScale: {
          ...state.balanceScale,
          error: message,
        },
      })),
    setBalance: (scaleData: ScaleData) =>
      set((state) => ({
        balanceScale: {
          ...state.balanceScale,
          leftScalePan: scaleData.leftScalePan,
          rightScalePan: scaleData.rightScalePan,
          weights: scaleData.weights,
          heavierSide: scaleData.heavierSide,
          rightScalePanSum: scaleData.rightScalePanSum,
          leftScalePanSum: scaleData.leftScalePanSum,
        },
      })),
    resetScale: () =>
      set((state) => ({
        balanceScale: {
          ...state.balanceScale,
          leftScalePan: balanceScaleInitialState.leftScalePan,
          rightScalePan: balanceScaleInitialState.rightScalePan,
          weights: balanceScaleInitialState.weights,
          heavierSide: balanceScaleInitialState.heavierSide,
          rightScalePanSum: balanceScaleInitialState.rightScalePanSum,
          leftScalePanSum: balanceScaleInitialState.leftScalePanSum,
        },
      })),
  },
});
