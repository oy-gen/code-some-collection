import styled from "styled-components";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export const Error: React.FC<Props> = ({ children }) => {
  return <StyledError>{children}</StyledError>;
};

const StyledError = styled.p`
  color: red;
  font-size: 1.2rem;
  font-weight: bold;
`;
