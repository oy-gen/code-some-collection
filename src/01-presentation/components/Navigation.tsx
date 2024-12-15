import React from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

export const Navigation: React.FC = () => {
  return (
    <LayoutWrapper>
      <NavList>
        <li>
          <NavLink to="/">SmartHighlightingSearch</NavLink>
        </li>
        <li>
          <NavLink to="/balance-scale">BalanceScalePage</NavLink>
        </li>
      </NavList>
      <Main>
        <Outlet />
      </Main>
    </LayoutWrapper>
  );
};

const LayoutWrapper = styled.div`
  margin: auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  margin: auto;
  padding: 1rem 0;
`;

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
