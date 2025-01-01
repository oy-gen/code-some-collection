import {
  selectBalanceScaleSlice,
  useStore,
} from "../../../shared/store/use-store.ts";

import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { Description } from "../../../shared/components/description.styles.ts";
import { Button } from "../../../shared/components/button.styles.ts";
import { ScaleData } from "../store/balance-scale-state.ts";
import { balanceScaleRule } from "../business/rules/balance-scale-rule.ts";
import { Scale } from "./components/scale.tsx";
import { AvailableWeights } from "./components/available-weights.tsx";
import { Error } from "./components/error.tsx";

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

  useEffect(() => {
    if (leftScalePanSum === rightScalePanSum) {
      setShouldReset(true);
    } else {
      setShouldReset(false);
    }
  }, [weights, leftScalePanSum, rightScalePanSum]);

  const balanceScale = () => {
    if (shouldReset) {
      resetScale();
      setShouldReset(false);
    } else {
      const balancedResult: ScaleData | null = balanceScaleRule(
        leftScalePan,
        rightScalePan,
        weights,
      );

      if (balancedResult === null) {
        setError("no solution found, add new weights to bank or reset");
        setShouldReset(true);
        return;
      }
      setBalance(balancedResult);
      setShouldReset(true);
    }
  };

  return (
    <>
      <h1>Scale Balancing Algorithm</h1>
      <Description>
        The infamous Scale Balance Challenge! This solution dynamically
        calculates the balance between two sides using the available weights and
        intelligently assigns them to the correct scale pan. After evaluating
        all potential configurations in a base-3 system ( left/right/none ) for
        each weight, it selects the simplest possible solution. Try it out!
        Change, add or remove weights the to test the algorithm.
      </Description>
      <Scale onError={setError} />
      <ButtonContainer>
        {error ? (
          <Error />
        ) : (
          <Button onClick={balanceScale} $isWarningColor={shouldReset}>
            {shouldReset ? "reset scale" : "balance scale"}
          </Button>
        )}
      </ButtonContainer>
      <AvailableWeights onError={setError} />
    </>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  height: 3rem;
`;
