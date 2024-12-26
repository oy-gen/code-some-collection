import React, { useState } from "react";
import styled from "styled-components";
import {
  selectBalanceScaleSlice,
  useStore,
} from "../../../../shared/store/useStore.ts";
import { Weight } from "./Weight.tsx";
import PlusIcon from "../../../../assets/plus.svg?react";

export const AvailableWeights: React.FC<{ onWeightsChanged: () => void }> = ({
  onWeightsChanged,
}) => {
  const { weights, setError, addWeightToStock, removeWeightFromStock } =
    useStore(selectBalanceScaleSlice);
  const [blankWeightVisible, setBlankWeightVisible] = useState<boolean>(false);

  const handleAddWeight = (weightToAdd: number) => {
    if (weights.includes(weightToAdd)) {
      setError(`${weightToAdd}kg weight already exists`);
      return;
    }

    addWeightToStock(weightToAdd);
    onWeightsChanged();
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
      {blankWeightVisible ? (
        <Weight
          onAddWeight={handleAddWeight}
          onRemoveWeight={handleRemoveWeight}
          onError={(message: string) => setError(message)}
          weight={null}
        ></Weight>
      ) : (
        <StyledPlusIcon
          onClick={(): void => {
            setBlankWeightVisible(true);
          }}
        ></StyledPlusIcon>
      )}
    </WeightsContainer>
  );
};

const WeightsContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 2rem;
  border: 0.5rem solid ${({ theme }) => theme.colors.primary};
  border-radius: 2rem;
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
  padding-left: 0.5rem;
  &:hover {
    opacity: 0.9;
  }
`;
