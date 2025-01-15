import React, { useEffect } from "react";
import { Description } from "../../../../../shared/components/description.styles.ts";

let intervalValue: number = 0;
let intervalId: NodeJS.Timeout | null = null;
const intervalNaming = "dirty";

export const DemoUseEffectWithoutCleanup: React.FC = () => {
  useEffect(() => {
    if (intervalId === null) {
      intervalId = setInterval(() => {
        intervalValue += 1;
        console.log(`${intervalNaming}: Count ${intervalValue}`);
      }, 2000);
      console.log(`new ${intervalNaming} interval created: Id ${intervalId}`);
    }
  }, []);

  return (
    <>
      <Description>
        The interval without clean-up named <b>"{intervalNaming}"</b> is
        console.logged every 2 seconds. It will remain if you go to a different
        SPA-page. The useEffect is not cleaned-up.
      </Description>
    </>
  );
};
