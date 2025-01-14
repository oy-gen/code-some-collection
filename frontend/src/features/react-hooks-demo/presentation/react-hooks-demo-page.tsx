import React from "react";
import { DemoWithoutUseCallback } from "./components/demo-use-callback/demo-without-use-callback.tsx";
import { DemoUseCallback } from "./components/demo-use-callback/demo-use-callback.tsx";
import styled from "styled-components";
import { Description } from "../../../shared/components/description.styles.ts";

export const ReactHooksDemoPage: React.FC = () => {
  return (
    <>
      <h1>useCallback</h1>
      <Description>see console.logs</Description>
      <ResultWrapper>
        <DemoUseCallback />
        <DemoWithoutUseCallback />
      </ResultWrapper>
    </>
  );
};

const ResultWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;
