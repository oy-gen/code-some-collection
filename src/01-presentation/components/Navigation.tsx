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
          <NavLink to="/other">Other</NavLink>
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
  padding: 1em 0;
`;

const NavList = styled.ul`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 2em;
  display: flex;
  gap: 2em;
  list-style: none;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;

  &:hover {
    color: white;
    opacity: 0.7;
    text-decoration: underline;
  }
`;
