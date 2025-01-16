import React, { useState } from "react";
import styled from "styled-components";
import {
  selectBalanceScaleSlice,
  useStore,
} from "../../../../shared/store/use-store.ts";
import { Weight } from "./weight.tsx";
import { findHeavierScalePanRule } from "../../business/rules/find-heavier-scale-pan-rule.ts";

interface Props {
  isLeftSide: boolean;
  onError?: (message: string) => void;
}

export const ScalePanContent: React.FC<Props> = ({
  isLeftSide,
  onError = () => {},
}) => {
  const {
    leftScalePan,
    rightScalePan,
    leftScalePanSum,
    rightScalePanSum,
    setPanWeight,
  } = useStore(selectBalanceScaleSlice);

  const [isInEditMode, setIsInEditMode] = useState<boolean>(false);

  const switchEditMode = () => {
    if (leftScalePan.length === 1 && rightScalePan.length === 1) {
      setIsInEditMode(!isInEditMode);
    } else {
      setIsInEditMode(false);
      onError("reset scale to edit pan weights");
    }
  };

  const handlePanChange = (weight: number) => {
    if (leftScalePan.length === 1 && rightScalePan.length === 1) {
      const updatedPan = [weight];
      if (isLeftSide) {
        setPanWeight(
          updatedPan,
          rightScalePan,
          findHeavierScalePanRule(weight, rightScalePan[0]),
        );
      } else {
        setPanWeight(
          leftScalePan,
          updatedPan,
          findHeavierScalePanRule(leftScalePan[0], weight),
        );
      }
      switchEditMode();
    }
  };

  const scalePanWeights: number[] = isLeftSide ? leftScalePan : rightScalePan;

  return (
    <ScalePanContentContainer onClick={switchEditMode}>
      {scalePanWeights.length > 1 ? (
        scalePanWeights.map((weight, index) => (
          <Weight key={`${weight}-${index}`} weight={weight}></Weight>
        ))
      ) : (
        <Weight
          weight={isInEditMode ? null : scalePanWeights[0]}
          onAddWeight={handlePanChange}
        ></Weight>
      )}
      <ScalePanSum $isLeftSide={isLeftSide}>
        total: {isLeftSide ? leftScalePanSum : rightScalePanSum}kg
      </ScalePanSum>
    </ScalePanContentContainer>
  );
};

const ScalePanContentContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  width: 95%;
  flex-wrap: wrap-reverse;
  padding: 0.5rem;
  border-bottom: 0.5rem solid ${({ theme }) => theme.colors.text};
`;

const ScalePanSum = styled.p<{ $isLeftSide?: boolean }>`
  position: absolute;
  bottom: -2rem;
  ${(props) => (props.$isLeftSide ? "left: 0;" : "right: 0;")}
`;
