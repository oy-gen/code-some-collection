import React, { useState } from "react";
import styled from "styled-components";
import {
  selectBalanceScaleSlice,
  useStore,
} from "../../../../03-data/store/useStore.ts";
import { Weight } from "./Weight.tsx";
import PlusIcon from "../../../../00-assets/plus.svg?react";

export const AvailableWeights: React.FC = () => {
  const { weights, setError, addWeightToStock, removeWeightFromStock } =
    useStore(selectBalanceScaleSlice);
  const [blankWeightVisible, setBlankWeightVisible] = useState<boolean>(false);

  const handleAddWeight = (weightToAdd: number) => {
    if (weights.includes(weightToAdd)) {
      setError(`${weightToAdd}kg weight already exists`);
      return;
    }
    if (weights.length > 6) {
      setError(`too many weights`);
      return;
    }
    addWeightToStock(weightToAdd);
    setBlankWeightVisible(false);
  };

  const handleRemoveWeight = (weightToRemove: number) => {
    if (weights.includes(weightToRemove)) {
      removeWeightFromStock(weightToRemove);
    }
  };

  return (
    <WeightsContainer>
      <WeightsDescription>available weights:</WeightsDescription>
      {weights.map((weight, index) => {
        return (
          <Weight
            key={`${weight}-${index}`}
            weight={weight}
            showRemove={true}
            onAddWeight={handleAddWeight}
            onRemoveWeight={handleRemoveWeight}
          ></Weight>
        );
      })}
      {blankWeightVisible && (
        <Weight
          onAddWeight={handleAddWeight}
          onRemoveWeight={handleRemoveWeight}
          onError={(message: string) => setError(message)}
          weight={null}
        ></Weight>
      )}
      <StyledPlusIcon
        onClick={(): void => {
          setBlankWeightVisible(true);
        }}
      ></StyledPlusIcon>
    </WeightsContainer>
  );
};

const WeightsContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.medium};
  padding: ${({ theme }) => theme.spacing.large};
  border: 0.5rem solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.spacing.large};
`;

const WeightsDescription = styled.p`
  position: absolute;
  top: 0.3rem;
  left: 0.7rem;
`;

const StyledPlusIcon = styled(PlusIcon)`
  width: 3rem;
  height: 3rem;

  cursor: pointer;
  padding-left: ${({ theme }) => theme.spacing.small};
  &:hover {
    opacity: 0.9;
  }
`;
