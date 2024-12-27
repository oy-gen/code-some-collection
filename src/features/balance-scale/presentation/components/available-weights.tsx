import React, { useState } from "react";
import styled from "styled-components";
import {
  selectBalanceScaleSlice,
  useStore,
} from "../../../../shared/store/use-store.ts";
import { Weight } from "./weight.tsx";
import PlusIcon from "../../../../assets/plus.svg?react";

export const AvailableWeights: React.FC<{
  onError: (message: string) => void;
}> = ({ onError }) => {
  const { weights, addWeightToStock, removeWeightFromStock } = useStore(
    selectBalanceScaleSlice,
  );
  const [blankWeightVisible, setBlankWeightVisible] = useState<boolean>(false);

  const handleAddWeight = (weight: number) => {
    if (weights.includes(weight)) {
      onError(`${weight}kg weight already exists`);
      return;
    }
    addWeightToStock(weight);
    setBlankWeightVisible(false);
  };

  const handleRemoveWeight = (weight: number) => {
    if (weights.includes(weight)) {
      removeWeightFromStock(weight);
    } else {
      onError(`${weight} not found`);
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
            onRemoveWeight={handleRemoveWeight}
          ></Weight>
        );
      })}
      {blankWeightVisible ? (
        <Weight
          onAddWeight={handleAddWeight}
          onError={onError}
          weight={null}
        ></Weight>
      ) : (
        <StyledPlusIcon
          onClick={() => setBlankWeightVisible(true)}
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
