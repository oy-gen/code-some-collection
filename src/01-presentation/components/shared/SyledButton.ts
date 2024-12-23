import styled from "styled-components";

export const StyledButton = styled.button`
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

  &:disabled {
    filter: grayscale(100);
  }
`;
