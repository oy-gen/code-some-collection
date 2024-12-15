import React from "react";
import styled from "styled-components";
import { selectBalanceScale, useStore } from "../../03-data/store/useStore";

type Props = {
  weight: number;
  showRemove?: boolean;
};
export const Weight: React.FC<Props> = ({ weight, showRemove = false }) => {
  const { removeWeight } = useStore(selectBalanceScale);

  function handleRemove(): void {
    removeWeight(weight);
  }

  return (
    <>
      <StyledWeight>
        {showRemove && (
          <TrashIcon onClick={handleRemove} title="Remove weight">
            x
          </TrashIcon>
        )}
        {weight}kg
      </StyledWeight>
    </>
  );
};

const TrashIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    color: red;
  }
`;

const StyledWeight = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  font-size: 1.5rem;
  font-weight: bolder;
  text-align: center;
  padding-top: 45px;
  background-image: url("../../../public/weight.svg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;
