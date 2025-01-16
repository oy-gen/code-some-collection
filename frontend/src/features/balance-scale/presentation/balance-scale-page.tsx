import {
  selectBalanceScaleSlice,
  useStore,
} from "../../../shared/store/use-store.ts";

import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { Description } from "../../../shared/components/description.styles.ts";
import { Button } from "../../../shared/components/button.styles.ts";
import { Scale } from "./components/scale.tsx";
import { AvailableWeights } from "./components/available-weights.tsx";
import { Error } from "./components/error.tsx";
import useBalanceScale from "../business/hooks/use-balance-scale.ts";

export const BalanceScalePage: React.FC = () => {
  const [shouldReset, setShouldReset] = useState<boolean>(false);
  const { leftScalePanSum, rightScalePanSum, error, setError, resetScale } =
    useStore(selectBalanceScaleSlice);

  const balanceScale = useBalanceScale();

  useEffect(() => {
    if (leftScalePanSum === rightScalePanSum || error) {
      setShouldReset(true);
    } else {
      setShouldReset(false);
    }
  }, [leftScalePanSum, rightScalePanSum, error]);

  const handleBalanceScale = (): void => {
    if (shouldReset) {
      resetScale();
      setShouldReset(false);
    } else {
      balanceScale();
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
          <Button onClick={handleBalanceScale} $isWarningColor={shouldReset}>
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
