import React from "react";
import { DemoUseCallback } from "./components/demo-use-callback/demo-use-callback.tsx";
import styled from "styled-components";
import { Description } from "../../../shared/components/description.styles.ts";
import { DemoUseEffectWithoutCleanup } from "./components/demo-use-effect/demo-use-effect-without-cleanup.tsx";
import { DemoUseEffectWithCleanup } from "./components/demo-use-effect/demo-use-effect-with-cleanup.tsx";
import { DemoGalleryUseRef } from "./components/demo-use-ref/demo-gallery-use-ref.tsx";
import { DemoVideoUseRef } from "./components/demo-use-ref/demo-video-use-ref.tsx";
import { DemoTest } from "./components/demo-test/demo-test.tsx";

export const ReactHooksDemoPage: React.FC = () => {
  return (
    <>
      <DemoTest />
      <Line />
      <h1>useCallback</h1>
      <Description>see console.logs</Description>
      <ResultWrapper>
        <DemoUseCallback isUseCallback={true} />
        <DemoUseCallback isUseCallback={false} />
      </ResultWrapper>
      <Line />
      <h1>useEffect</h1>
      <ResultWrapper>
        <DemoUseEffectWithoutCleanup />
        <DemoUseEffectWithCleanup />
      </ResultWrapper>
      <Line />
      <h1>useRef</h1>
      <ResultWrapper>
        <DemoGalleryUseRef />
      </ResultWrapper>
      <ResultWrapper>
        <DemoVideoUseRef />
      </ResultWrapper>
    </>
  );
};

const ResultWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 3rem;
`;

const Line = styled.hr`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;
