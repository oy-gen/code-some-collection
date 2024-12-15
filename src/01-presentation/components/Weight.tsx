import React from "react";
import styled from "styled-components";

type Props = {
  weight: number;
};
export const Weight: React.FC<Props> = ({ weight }) => {
  return (
    <>
      <StyledWeight>{weight}kg</StyledWeight>
      <img src=""></img>
    </>
  );
};

const StyledWeight = styled.div`
  width: 100px;
  height: 100px;
  font-size: 1.5rem;
  font-weight: bolder;
  text-align: center;
  padding-top: 45px;
  background-image: url("../../../public/weight.svg");
`;
