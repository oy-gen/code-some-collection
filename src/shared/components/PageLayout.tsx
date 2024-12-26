import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Navigation } from "./Navigation.tsx";

export const PageLayout: React.FC = () => {
  return (
    <>
      <Navigation />
      <PageContent>
        <Outlet />
      </PageContent>
    </>
  );
};

const PageContent = styled.main`
  margin: 0 auto;
  padding: 2rem 1rem;
  max-width: ${({ theme }) => theme.breakpoints.mobile};
`;
