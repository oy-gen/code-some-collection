import styled from "styled-components";
import React, { useEffect } from "react";
import {
  selectBalanceScaleSlice,
  useStore,
} from "../../../../shared/store/useStore.ts";

export const Error: React.FC = () => {
  const duration = 2500;
  const { error, setError } = useStore(selectBalanceScaleSlice);
  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => setError(null), duration);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [setError, error]);

  if (!error) {
    return null;
  }

  return (
    <>
      <ErrorWrapper>
        {error}
        <ProgressBar $duration={duration} />
      </ErrorWrapper>
    </>
  );
};

const ErrorWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundError};
  color: ${({ theme }) => theme.colors.error};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ProgressBar = styled.div<{ $duration: number }>`
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 0.3rem;
  background-color: ${({ theme }) => theme.colors.error};
  transform-origin: left;
  transition: transform ${({ $duration }) => $duration}ms ease-in-out;
  animation: shrink ${({ $duration }) => $duration}ms linear forwards;
  @keyframes shrink {
    from {
      transform: scaleX(1);
    }
    to {
      transform: scaleX(0);
    }
  }
`;
