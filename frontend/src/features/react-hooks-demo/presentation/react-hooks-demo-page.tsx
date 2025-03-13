import React, { useState } from "react";
import { DemoUseCallback } from "./components/demo-use-callback/demo-use-callback.tsx";
import styled from "styled-components";
import { Description } from "../../../shared/components/description.styles.ts";
import { DemoUseEffectWithoutCleanup } from "./components/demo-use-effect/demo-use-effect-without-cleanup.tsx";
import { DemoUseEffectWithCleanup } from "./components/demo-use-effect/demo-use-effect-with-cleanup.tsx";
import { DemoGalleryUseRef } from "./components/demo-use-ref/demo-gallery-use-ref.tsx";
import { DemoVideoUseRef } from "./components/demo-use-ref/demo-video-use-ref.tsx";
import { DemoTest } from "./components/demo-test/demo-test.tsx";
import { DemoUseContextProvider } from "./components/demo-use-context/demo-use-context-provider.tsx";
import { DemoUseContext } from "./components/demo-use-context/demo-use-context.tsx";

export const ReactHooksDemoPage: React.FC = () => {
  const [sharedColor, setSharedColor] = useState<"pink" | "cyan">("cyan");

  const toggleSharedColor = () => {
    if (sharedColor === "cyan") {
      setSharedColor("pink");
    } else {
      setSharedColor("cyan");
    }
  };

  return (
    <DemoUseContextProvider.Provider value={{ sharedColor, toggleSharedColor }}>
      <DemoTest />
      <Line />
      <h1>useContext</h1>
      <Description>
        state shared between components without prop-drilling
      </Description>
      <DemoUseContext />
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
    </DemoUseContextProvider.Provider>
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
