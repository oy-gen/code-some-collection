import React from "react";
import styled from "styled-components";
import {
  selectBalanceScaleSlice,
  useStore,
} from "../../../../shared/store/useStore.ts";
import { Weight } from "./Weight.tsx";
import { HeavierSideEnum } from "../../store/BalanceScaleState.ts";

export const Scale: React.FC = () => {
  const {
    leftScalePan,
    rightScalePan,
    heavierSide,
    leftScalePanSum,
    rightScalePanSum,
  } = useStore(selectBalanceScaleSlice);

  return (
    <ScaleContainer>
      <ScalePan>
        <ScalePanContent>
          {leftScalePan.map((weight, index) => {
            return (
              <Weight key={`${weight}-${index}-left`} weight={weight}></Weight>
            );
          })}
          <ScalePanSum $isLeftSide={true}>
            total: {leftScalePanSum}kg
          </ScalePanSum>
        </ScalePanContent>
        <ScaleDistance
          $heavierSide={heavierSide}
          $isLeftSide={true}
        ></ScaleDistance>
      </ScalePan>
      <ScalePan>
        <ScalePanContent>
          {rightScalePan.map((weight, index) => {
            return (
              <Weight key={`${weight}-${index}-right`} weight={weight}></Weight>
            );
          })}
          <ScalePanSum>total: {rightScalePanSum}kg</ScalePanSum>
        </ScalePanContent>
        <ScaleDistance
          $heavierSide={heavierSide}
          $isLeftSide={false}
        ></ScaleDistance>
      </ScalePan>
      <ScaleBase></ScaleBase>
    </ScaleContainer>
  );
};

const ScaleContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 3rem;
  margin: -10rem auto 1rem;
  justify-content: center;
  height: 24rem;
`;

const ScalePan = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

const ScalePanContent = styled.div`
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

const ScaleDistance = styled.div<{
  $heavierSide: HeavierSideEnum;
  $isLeftSide: boolean;
}>`
  width: 0.5rem;
  background-color: ${({ theme }) => theme.colors.text};
  height: ${(props) => {
    if (props.$heavierSide === HeavierSideEnum.Equal) {
      return "1rem";
    }
    if (
      (props.$heavierSide === HeavierSideEnum.Left && props.$isLeftSide) ||
      (props.$heavierSide === HeavierSideEnum.Right && !props.$isLeftSide)
    ) {
      return "0";
    }
    return "2rem";
  }};
  transition: height 0.3s ease-in-out;
`;

const ScaleBase = styled.div`
  grid-column: 1 / span 2;
  width: calc(50% + 0.5rem);
  justify-self: center;
  height: 3rem;
  border-bottom: 0.5rem solid ${({ theme }) => theme.colors.text};
  border-left: 0.5rem solid ${({ theme }) => theme.colors.text};
  border-right: 0.5rem solid ${({ theme }) => theme.colors.text};
  border-radius: 0 0 2rem 2rem;
`;
