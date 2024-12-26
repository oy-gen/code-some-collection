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

export const balanceScaleInitialState: BalanceScaleState = {
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
