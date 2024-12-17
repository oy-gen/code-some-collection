import { Weight } from "./components/Weight.tsx";
import {
  selectBalanceScale,
  useStore,
} from "../../../03-data/store/useStore.ts";
import styled from "styled-components";
import { StyledContentContainer } from "../../components/shared/StyledContentContainer.ts";
import { StyledDescription } from "../../components/shared/SyledDescription.ts";
import { useEffect, useState } from "react";
import { StyledInputField } from "../../components/shared/StyledInputField.ts";
import { StyledButton } from "../../components/shared/SyledButton.ts";
import { balanceScaleRule } from "../../../02-business-logic/balance-scale/rules/balanceScaleRule.ts";
import { Error } from "./components/Error.tsx";
import { ScaleData } from "../../../03-data/store/slices/balanceScaleSlice.ts";
import { StyledFlexRow } from "../../components/shared/SyledFlexRow.ts";

export const BalanceScalePage: React.FC = () => {
  const { leftScale, rightScale, weights, addWeightToStock, setBalancedScale } =
    useStore(selectBalanceScale);

  const [weightToAdd, setWeightToAdd] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (error !== "") {
      setTimeout(() => setError(""), 3000);
    }
  }, [error, setError]);

  function handleWeightToAdd() {
    const integerWeight = parseInt(weightToAdd ?? "");
    if (!integerWeight) {
      setError("input must be a number");
      return;
    }
    if (weights.includes(integerWeight)) {
      setError(`${weightToAdd} already exists`);
      return;
    }
    if (weights.length > 7) {
      setError(`too many weights`);
      return;
    }
    addWeightToStock(integerWeight);
  }

  function balanceScale() {
    const balancedResult: ScaleData | null = balanceScaleRule({
      leftScale,
      rightScale,
      weights,
    });
    if (!balancedResult) {
      setError("no solution possible");
      return;
    }
    setBalancedScale(balancedResult);
  }

  return (
    <StyledContentContainer>
      <h1>Scale Balancing</h1>
      <StyledDescription>
        placeholder text user-friendly search functionality designed for complex
        strings, such as contract or registration numbers, which may include
        spaces or special-character separators like.
      </StyledDescription>
      <StyledFlexRow>
        <StyledButton
          onClick={(): void => {
            balanceScale();
          }}
        >
          calculate
        </StyledButton>
      </StyledFlexRow>
      <StyledScale>
        <StyledScaleSide>
          {leftScale.map((weight, index) => {
            return (
              <Weight key={`${weight}-${index}-left`} weight={weight}></Weight>
            );
          })}
        </StyledScaleSide>
        <StyledScaleSide>
          {rightScale.map((weight, index) => {
            return (
              <Weight key={`${weight}-${index}-right`} weight={weight}></Weight>
            );
          })}
        </StyledScaleSide>
      </StyledScale>
      <StyledScaleBase></StyledScaleBase>
      <StyledWeightsContainer>
        {weights.map((weight, index) => {
          return (
            <Weight
              key={`${weight}-${index}`}
              weight={weight}
              showRemove={true}
            ></Weight>
          );
        })}
      </StyledWeightsContainer>
      <StyledInputWrapper>
        <StyledInputField
          value={weightToAdd ?? ""}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            setWeightToAdd(event.target.value);
          }}
        ></StyledInputField>
        <StyledButton
          onClick={(): void => {
            handleWeightToAdd();
          }}
        >
          add weight
        </StyledButton>
        <Error>{error}</Error>
      </StyledInputWrapper>
    </StyledContentContainer>
  );
};

const StyledScale = styled.div`
  display: flex;
  margin: 3rem auto;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
  column-gap: 3rem;
`;

const StyledScaleSide = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  gap: 5px;
  padding: 1rem;
  flex-wrap: wrap;

  border-bottom: 8px solid black;
`;

const StyledScaleBase = styled.div`
  width: calc(50% + 2rem);
  height: 50px;
  border-bottom: 8px solid black;
  border-left: 8px solid black;
  border-right: 8px solid black;
  border-radius: 0 0 2rem 2rem;
`;
const StyledInputWrapper = styled.div`
  display: flex;
`;

const StyledWeightsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  border: 1 px solid green;
`;
