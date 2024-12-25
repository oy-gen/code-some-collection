import styled from "styled-components";

export const Button = styled.button`
  padding: 1rem;
  font-weight: bold;
  border: none;
  background-color: ${({ theme }) => theme.colors.primary};
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
