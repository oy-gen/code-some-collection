import React from "react";
import styled from "styled-components";

type Props = {
  buttonText: string;
  onClick: () => void;
};

export const Button: React.FC<Props> = ({ buttonText, onClick }) => {
  return <StyledButton onClick={onClick}>{buttonText}</StyledButton>;
};

const StyledButton = styled.button`
  font-size: 1rem;
  padding: 1rem;
  font-weight: bold;
  border: none;
  background-color: var(--accent-background-color);
  color: white;
  cursor: pointer;
  transition: background-color 0.25s;

  &:hover {
    background-color: #8086f9;
  }
`;
