import styled from "styled-components";
import React, { useEffect } from "react";
import {
  selectBalanceScaleSlice,
  useStore,
} from "../../../../03-data/store/useStore.ts";

export const Error: React.FC = () => {
  const { error, setError } = useStore(selectBalanceScaleSlice);
  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => setError(null), 3000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [setError, error]);

  if (!error) {
    return null;
  }

  return <ErrorMessage>{error}</ErrorMessage>;
};

const ErrorMessage = styled.p`
  color: red;
  font-size: 1.2rem;
  font-weight: bold;
`;
