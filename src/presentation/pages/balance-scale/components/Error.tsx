import styled from "styled-components";
import React, { useEffect } from "react";
import {
  selectBalanceScaleSlice,
  useStore,
} from "../../../../store/useStore.ts";

export const Error: React.FC = () => {
  const duration = 3000;
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
      <ErrorWrapper>{error}</ErrorWrapper>
      <ProgressBar $duration={duration} />
    </>
  );
};

const ErrorWrapper = styled.div`
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.colors.backgroundError};
  color: ${({ theme }) => theme.colors.error};
  position: relative;
  text-align: center;
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
