import { styled } from "styled-components";

export const InputField = styled.input<{
  $width?: "narrow" | "wide";
}>`
  font-size: 1rem;
  padding: 1rem;
  width: ${(props) => {
    switch (props.$width) {
      case "narrow":
        return "8rem";
      case "wide":
        return "12rem";
      default:
        return "10rem";
    }
  }};
  border: none;
  background-color: ${({ theme }) => theme.colors.backgroundDarker};
  &:focus {
    outline: none;
  }
`;
