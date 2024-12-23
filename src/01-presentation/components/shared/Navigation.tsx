import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Navigation: React.FC = () => {
  return (
    <NavList>
      <li>
        <NavLink to="/">SmartHighlightingSearch</NavLink>
      </li>
      <li>
        <NavLink to="/balance-scale">BalanceScalePage</NavLink>
      </li>
    </NavList>
  );
};

const NavList = styled.ul`
  background-color: var(--accent-background-color);
  padding: 2rem;
  display: flex;
  gap: 2rem;
  list-style: none;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;