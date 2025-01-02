import styled from "styled-components";

export const ListItem = styled.li`
  list-style: none;

  .highlight {
    color: ${({ theme }) => theme.colors.warning};
    font-weight: bold;
  }
`;
