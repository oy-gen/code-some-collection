import { HeavierSideEnum } from "../../store/balance-scale-state.ts";

export function findHeavierScalePanRule(
  leftPanSum: number,
  rightPanSum: number,
): HeavierSideEnum {
  if (leftPanSum === rightPanSum) {
    return HeavierSideEnum.Equal;
  } else if (leftPanSum > rightPanSum) {
    return HeavierSideEnum.Left;
  } else {
    return HeavierSideEnum.Right;
  }
}
