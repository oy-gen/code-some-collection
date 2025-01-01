import React from "react";
import styled from "styled-components";
import { ScalePanContent } from "./scale-pan-content.tsx";
import { ScalePanHeight } from "./scale-pan-height.tsx";

export const Scale: React.FC<{
  onError: (message: string) => void;
}> = ({ onError }) => {
  return (
    <ScaleContainer>
      <ScalePan>
        <ScalePanContent isLeftSide={true} onError={onError} />
        <ScalePanHeight isLeftSide={true}></ScalePanHeight>
      </ScalePan>

      <ScalePan>
        <ScalePanContent isLeftSide={false} onError={onError} />
        <ScalePanHeight isLeftSide={false}></ScalePanHeight>
      </ScalePan>
      <ScaleBase></ScaleBase>
    </ScaleContainer>
  );
};

const ScaleContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 3rem;
  margin: -8rem auto 1rem;
  justify-content: center;
  height: 24rem;
`;

const ScalePan = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
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
