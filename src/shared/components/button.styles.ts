import styled from "styled-components";

export const Button = styled.button<{ $isError?: boolean }>`
  padding: 1rem;
  font-weight: bold;
  border: none;
  background-color: ${(props) =>
    props.$isError
      ? props.theme.colors.backgroundError
      : props.theme.colors.primary};
  color: white;
  cursor: pointer;
  transition: background-color 0.25s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    filter: grayscale(100);
  }
`;
