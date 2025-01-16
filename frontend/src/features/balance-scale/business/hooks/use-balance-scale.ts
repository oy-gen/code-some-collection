import { ScaleData } from "../../store/balance-scale-state.ts";
import { balanceScaleRule } from "../rules/balance-scale-rule.ts";
import {
  selectBalanceScaleSlice,
  useStore,
} from "../../../../shared/store/use-store.ts";

export default function useBalanceScale(): () => void {
  const { leftScalePan, rightScalePan, weights, setBalance, setError } =
    useStore(selectBalanceScaleSlice);

  return () => {
    const balancedResult: ScaleData | null = balanceScaleRule(
      leftScalePan,
      rightScalePan,
      weights,
    );
    if (balancedResult === null) {
      setError("no solution found, add new weights to bank or reset");
    } else {
      setBalance(balancedResult);
    }
  };
}
