import { StateCreator } from "zustand";
import { AppState } from "../useStore";

export interface BalanceScaleStateAware {
  balanceScale: BalanceScaleState;
}

export interface BalanceScaleState extends ScaleData {
  error: string | null;
  addWeightToStock: (weight: number) => void;
  removeWeightFromStock: (weight: number) => void;
  setBalance: (scaleData: ScaleData) => void;
  resetScale: () => void;
  setError: (message: string | null) => void;
}

export interface ScaleData {
  leftScalePan: number[];
  rightScalePan: number[];
  weights: number[];
  leftScalePanSum: number;
  rightScalePanSum: number;
  heavierSide: HeavierSideEnum;
}

export enum HeavierSideEnum {
  Left = "left",
  Right = "right",
  Equal = "equal",
}

const initialState: BalanceScaleState = {
  leftScalePan: [3],
  rightScalePan: [7],
  weights: [6, 10, 1, 4],
  leftScalePanSum: 3,
  rightScalePanSum: 7,
  heavierSide: HeavierSideEnum.Right,
  error: null,
  addWeightToStock: () => {},
  removeWeightFromStock: () => {},
  resetScale: () => {},
  setBalance: () => {},
  setError: () => {},
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
