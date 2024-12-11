import React from "react";
import styled from "styled-components";

type Props = {
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input: React.FC<Props> = ({ placeholder, value, onChange }) => {
  return (
    <StyledInput
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    ></StyledInput>
  );
};

const StyledInput = styled.input`
  font-size: 1rem;
  padding: 1rem;
  border: none;
  background-color: #eeeeee;

  &:focus {
    outline: none;
  }
`;
