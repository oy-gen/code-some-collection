import React from "react";
import styled from "styled-components";
import {
  selectBalanceScaleSlice,
  useStore,
} from "../../../../03-data/store/useStore.ts";
import { Weight } from "./Weight.tsx";
import { HeavierSideEnum } from "../../../../03-data/store/slices/balanceScaleSlice.ts";

export const Scale: React.FC = () => {
  const { leftScalePan, rightScalePan, heavierSide } = useStore(
    selectBalanceScaleSlice,
  );

  return (
    <ScaleContainer>
      <ScalePan>
        <ScalePanContent>
          {leftScalePan.map((weight, index) => {
            return (
              <Weight key={`${weight}-${index}-left`} weight={weight}></Weight>
            );
          })}
        </ScalePanContent>
        <ScaleHeight
          $heavierSide={heavierSide}
          $isLeftSide={true}
        ></ScaleHeight>
      </ScalePan>
      <ScalePan>
        <ScalePanContent>
          {rightScalePan.map((weight, index) => {
            return (
              <Weight key={`${weight}-${index}-right`} weight={weight}></Weight>
            );
          })}
        </ScalePanContent>
        <ScaleHeight
          $heavierSide={heavierSide}
          $isLeftSide={false}
        ></ScaleHeight>
      </ScalePan>
      <ScaleBase></ScaleBase>
    </ScaleContainer>
  );
};

const ScaleContainer = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 250px 50px;
  margin: 0 auto 2rem;
  justify-content: center;
`;

const ScalePan = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

const ScalePanContent = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  flex-grow: 1;

  height: 200px;
  overflow: visible;
  flex-wrap: wrap-reverse;
  padding: 1rem;
  border-bottom: 8px solid black;
`;

const ScaleHeight = styled.div<{
  $heavierSide: HeavierSideEnum;
  $isLeftSide: boolean;
}>`
  justify-self: center;
  width: 8px;
  background-color: black;
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
  width: calc(50% + 8px);
  justify-self: center;
  border-bottom: 8px solid black;
  border-left: 8px solid black;
  border-right: 8px solid black;
  border-radius: 0 0 2rem 2rem;
`;
