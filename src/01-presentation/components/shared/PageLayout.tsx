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
  flex: 1;
  margin: auto;
  padding: 1rem 0;
`;
