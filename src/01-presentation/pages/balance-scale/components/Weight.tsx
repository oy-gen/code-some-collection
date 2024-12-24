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
        <WeightDeleteIcon onClick={handleRemoveWeight}>x</WeightDeleteIcon>
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

const WeightDeleteIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 2rem;
  line-height: 0;
  cursor: pointer;

  &:hover {
    color: red;
  }
`;

const WeightIcon = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  font-size: 1.5rem;
  font-weight: bolder;
  text-align: center;
  padding-top: 45px;
  background-image: url("/src/00-assets/weight.svg");
  background-position: center;
`;

const WeightInput = styled.input<{ value: string }>`
  display: inline-block;
  width: ${(props) => Math.max(props.value.length, 2)}ch;
  border: unset;
  font-size: 1.5rem;
  font-weight: bolder;
  text-align: center;
  outline: 4px solid var(--accent-background-color);
  border-radius: 3px;

  &:focus {
    outline: 4px solid var(--accent-background-color);
    border-radius: 3px;
  }
`;
