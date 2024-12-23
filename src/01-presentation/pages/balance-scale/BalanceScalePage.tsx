import {
  selectBalanceScaleSlice,
  useStore,
} from "../../../03-data/store/useStore.ts";
import { StyledContentContainer } from "../../components/shared/StyledContentContainer.ts";
import { StyledButton } from "../../components/shared/SyledButton.ts";
import { balanceScaleRule } from "../../../02-business-logic/balance-scale/rules/balanceScaleRule.ts";
import { Error } from "./components/Error.tsx";
import { ScaleData } from "../../../03-data/store/slices/balanceScaleSlice.ts";
import { StyledFlexRow } from "../../components/shared/SyledFlexRow.ts";
import { AvailableWeights } from "./components/AvailableWeights.tsx";
import { DescriptionText } from "../../components/shared/DescriptionText.ts";
import { Scale } from "./components/Scale.tsx";

export const BalanceScalePage: React.FC = () => {
  const { leftScalePan, rightScalePan, weights, setBalance, error, setError } =
    useStore(selectBalanceScaleSlice);

  const calculateBalance = () => {
    const balancedResult: ScaleData | null = balanceScaleRule(
      leftScalePan,
      rightScalePan,
      weights,
    );
    if (balancedResult === null) {
      setError("no solution possible");
      return;
    }
    setBalance(balancedResult);
  };

  return (
    <StyledContentContainer>
      <h1>Scale Balancing</h1>
      <DescriptionText>
        placeholder text user-friendly search functionality designed for complex
        strings, such as contract or registration numbers, which may include
        spaces or special-character separators like.
      </DescriptionText>
      <StyledFlexRow>
        <StyledButton onClick={calculateBalance}>calculate</StyledButton>
      </StyledFlexRow>
      <Scale />
      {error && <Error />}
      <AvailableWeights />
    </StyledContentContainer>
  );
};
