import React, { useContext, useEffect } from "react";
import { Description } from "../../../../../shared/components/description.styles.ts";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { DemoUseContextProvider } from "../demo-use-context/demo-use-context-provider.tsx";
import { Circle } from "../../../../../shared/components/circle.styles.ts";

let intervalGlobalValue: number = 0;
let intervalIdGlobal: NodeJS.Timeout | null = null;
export const DemoUseEffectWithCleanup: React.FC = () => {
  const naming = "clean";
  const { sharedColor } = useContext(DemoUseContextProvider);

  useEffect(() => {
    if (intervalIdGlobal !== null) {
      return () => {
        clearInterval(intervalIdGlobal as NodeJS.Timeout);
        console.log(
          `${naming} interval with Id ${intervalIdGlobal} was cleaned up`,
        );
        intervalIdGlobal = null;
      };
    } else {
      intervalIdGlobal = setInterval(() => {
        intervalGlobalValue += 1;
        console.log(`${naming}: Count ${intervalGlobalValue}`);
      }, 2000);
      console.log(`new ${naming} interval created: Id ${intervalIdGlobal}`);
    }
  }, []);

  return (
    <>
      <Description>
        The interval named <b>"{naming}"</b> is cleaned up when component is
        unmounted. When you go to{" "}
        <NavLink to="/balance-scale">a different SPA-page</NavLink> only the
        'dirty' interval remains. When you return back to this page, the 'clean'
        interval will restart, while the dirty interval will continue counting.
      </Description>
      <Circle color={sharedColor} />
    </>
  );
};

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
