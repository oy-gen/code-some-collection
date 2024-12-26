import { selectBalanceScaleSlice, useStore } from "../../../store/useStore.ts";
import { balanceScaleRule } from "../../../business-logic/balance-scale/rules/balanceScaleRule.ts";
import { Error } from "./components/Error.tsx";
import { AvailableWeights } from "./components/AvailableWeights.tsx";
import { Scale } from "./components/Scale.tsx";
import styled from "styled-components";
import React, { useState } from "react";
import { Description } from "../../shared-components/Description.styles.ts";
import { Button } from "../../shared-components/Button.styles.ts";
import { ScaleData } from "../../../store/balance-scale/BalanceScaleState.ts";

export const BalanceScalePage: React.FC = () => {
  const {
    leftScalePan,
    rightScalePan,
    leftScalePanSum,
    rightScalePanSum,
    weights,
    setBalance,
    error,
    setError,
    resetScale,
  } = useStore(selectBalanceScaleSlice);
  const [shouldReset, setShouldReset] = useState<boolean>(false);

  const calculateBalance = () => {
    if (shouldReset) {
      resetScale();
      setShouldReset(false);
    } else {
      console.log({ leftScalePanSum, rightScalePanSum });
      if (leftScalePanSum === rightScalePanSum) {
        setError("scale is already balanced");
        setShouldReset(true);
        return;
      }

      const balancedResult: ScaleData | null = balanceScaleRule(
        leftScalePan,
        rightScalePan,
        weights,
      );

      if (balancedResult === null) {
        setError("no solution found");
        setShouldReset(true);
        return;
      }
      setBalance(balancedResult);
    }
  };

  return (
    <>
      <h1>Scale Balancing</h1>
      <Description>
        placeholder text user-friendly search functionality designed for complex
        strings, such as contract or registration numbers, which may include
        spaces or special-character separators like.
      </Description>

      <ButtonContainer>
        <Button onClick={calculateBalance} $isError={shouldReset}>
          {shouldReset ? "reset" : "calculate"}
        </Button>
      </ButtonContainer>
      <Scale />
      <AvailableWeights onWeightsChanged={() => setShouldReset(false)} />

      {error && (
        <ErrorContainer>
          <Error />
        </ErrorContainer>
      )}
    </>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ErrorContainer = styled.div`
  position: absolute;
  left: 1rem;
  right: 1rem;
  bottom: 1rem;
  justify-content: center;
`;
