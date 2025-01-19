import styled from "styled-components";

export const Circle = styled.div<{ color: string }>`
  margin: 20px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
