import {
  selectBalanceScaleSlice,
  useStore,
} from "../../../shared/store/useStore.ts";
import { balanceScaleRule } from "../business/rules/balanceScaleRule.ts";
import { Error } from "./components/Error.tsx";
import { AvailableWeights } from "./components/AvailableWeights.tsx";
import { Scale } from "./components/Scale.tsx";
import styled from "styled-components";
import React, { useState } from "react";
import { Description } from "../../../shared/components/Description.styles.ts";
import { Button } from "../../../shared/components/Button.styles.ts";
import { ScaleData } from "../store/BalanceScaleState.ts";

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
        The infamous Scale Balance Challenge! This solution dynamically
        calculates the balance between two sides using the available weights and
        intelligently assigns them to the correct scale pan. It also selects the
        simplest possible solution after evaluating all potential
        configurations. Try it out! Add or remove weights from the stock to test
        the algorithm.
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
