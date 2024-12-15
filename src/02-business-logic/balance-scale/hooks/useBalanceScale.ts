import { useEffect, useMemo } from "react";
import { selectBalanceScale, useStore } from "../../../03-data/store/useStore";

import { balanceScaleRule } from "../rules/balanceScaleRule";

export default function useBalanceScale(): string[] | null {
  const { leftScale, rightScale, weights, applyBalanceCalculation } =
    useStore(selectBalanceScale);

  const balancedScale = useMemo(() => {
    return balanceScaleRule({ leftScale, rightScale, weights });
  }, [leftScale, rightScale, weights]);

  useEffect(() => {
    applyBalanceCalculation(
      balancedScale?.leftWeightsAdded ?? [],
      balancedScale?.rightWeightsAdded ?? []
    );
  }, [applyBalanceCalculation, balancedScale]);
  return null;
}
