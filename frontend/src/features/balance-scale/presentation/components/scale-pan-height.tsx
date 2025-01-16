import React from "react";
import styled from "styled-components";
import { HeavierSideEnum } from "../../store/balance-scale-state.ts";
import {
  selectBalanceScaleSlice,
  useStore,
} from "../../../../shared/store/use-store.ts";

interface Props {
  isLeftSide: boolean;
}

export const ScalePanHeight: React.FC<Props> = ({ isLeftSide }) => {
  const { heavierSide } = useStore(selectBalanceScaleSlice);

  return (
    <ScaleDistance
      $heavierSide={heavierSide}
      $isLeftSide={isLeftSide}
    ></ScaleDistance>
  );
};

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
