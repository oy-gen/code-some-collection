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
  gap: 1rem;
  padding: 2rem;
  border: 8px solid var(--accent-background-color);
  border-radius: 2rem;
`;

const WeightsDescription = styled.p`
  position: absolute;
  top: 5px;
  left: 15px;
`;

const StyledPlusIcon = styled(PlusIcon)`
  width: 50px;
  height: 50px;
  cursor: pointer;
`;
