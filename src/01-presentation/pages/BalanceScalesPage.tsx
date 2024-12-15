import { Weight } from "../components/Weight";
import { selectBalanceScale, useStore } from "../../03-data/store/useStore";
import styled from "styled-components";
import { StyledContentContainer } from "../components/shared/StyledContentContainer";
import { StyledDescription } from "../components/shared/SyledDescription";
import { useEffect, useState } from "react";
import { StyledInputField } from "../components/shared/StyledInputField";
import { StyledButton } from "../components/shared/SyledButton";
import balanceScale from "../../02-business-logic/balance-scale/hooks/useBalanceScale";
import useBalanceScale from "../../02-business-logic/balance-scale/hooks/useBalanceScale";

export const BalanceScalesPage: React.FC = () => {
  const {
    leftScale,
    rightScale,
    weights,
    addWeight,
    leftWeightsAdded,
    rightWeightsAdded,
  } = useStore(selectBalanceScale);

  const [weightToAdd, setWeightToAdd] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  useBalanceScale();

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
    addWeight(integerWeight);
  }

  function calculateBalance() {
    balanceScale();
  }

  return (
    <StyledContentContainer>
      <h1>Scale balancing</h1>
      <StyledDescription>
        placeholder text user-friendly search functionality designed for complex
        strings, such as contract or registration numbers, which may include
        spaces or special-character separators like.
      </StyledDescription>
      <StyledScale>
        <StyledScaleSide>
          <Weight weight={leftScale ?? 0}></Weight>
        </StyledScaleSide>
        <StyledScaleSide>
          <Weight weight={rightScale ?? 0}></Weight>
        </StyledScaleSide>
        <StyledScaleBase></StyledScaleBase>
      </StyledScale>
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
        {error && <StyledError>{error}</StyledError>}
      </StyledInputWrapper>
      <StyledButton
        onClick={(): void => {
          calculateBalance();
        }}
      >
        calculate
      </StyledButton>
      {rightWeightsAdded} {leftWeightsAdded}
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
  gap: 1rem;
  padding: 1rem;
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
  gap: 1rem;
  padding: 1rem;
  border: 1 px solid green;
`;
const StyledError = styled.p`
  color: red;
  font-weight: bold;
`;
