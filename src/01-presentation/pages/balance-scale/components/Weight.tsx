import React, { useState } from "react";
import styled from "styled-components";

type Props = {
  weight: number | null;
  showRemove?: boolean;
  onAddWeight?: (weight: number) => void;
  onRemoveWeight?: (weight: number) => void;
  onError?: (message: string) => void;
};
export const Weight: React.FC<Props> = ({
  weight,
  showRemove = false,
  onRemoveWeight = () => {},
  onAddWeight = () => {},
  onError = () => {},
}) => {
  const [newWeight, setNewWeight] = useState<string>("");

  const handleAddWeight = (): void => {
    const cleanedWeightString: string = newWeight.replace(/[^0-9.]/g, "");
    const weight: number = Number(cleanedWeightString);

    if (isNaN(weight) || weight <= 0) {
      onError("Please enter a valid weight");
      return;
    }
    onAddWeight(weight);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (event.key === "Enter") {
      handleAddWeight();
    }
  };

  const handleRemoveWeight = (): void => {
    if (weight !== null) {
      onRemoveWeight(weight);
    }
  };

  return (
    <WeightIcon>
      {showRemove && (
        <WeightDeleteIcon onClick={handleRemoveWeight}>X</WeightDeleteIcon>
      )}
      {weight === null ? (
        <WeightInput
          value={newWeight}
          autoFocus
          onChange={(event) => setNewWeight(event.target.value)}
          onBlur={handleAddWeight}
          onKeyDown={handleKeyDown}
        />
      ) : (
        `${weight}`
      )}
      <span>kg</span>
    </WeightIcon>
  );
};

const WeightIcon = styled.div`
  position: relative;
  width: 5.5rem;
  height: 5.5rem;
  font-size: 1.5rem;
  font-weight: bolder;
  text-align: center;
  align-content: center;
  padding-top: 1rem;
  background-image: url("/src/00-assets/weight.svg");
  background-position: center;
  background-size: contain;
`;

const WeightInput = styled.input<{ value: string }>`
  width: ${(props) => Math.max(props.value.length, 2)}ch;
  border: unset;
  font-size: 1.5rem;
  font-weight: bolder;
  text-align: center;
  outline: 0.3rem solid ${({ theme }) => theme.colors.primary};
  border-radius: 0.1rem;
  margin-right: 0.2rem;

  &:focus {
    outline: 0.3rem solid ${({ theme }) => theme.colors.primary};
  }
`;

const WeightDeleteIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 1rem;
  line-height: 0;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.error};
  }
`;
