import React, { useEffect } from "react";
import { Description } from "../../../../../shared/components/description.styles.ts";

let intervalGlobalValue: number = 0;
let intervalIdGlobal: NodeJS.Timeout | null = null;
export const DemoUseEffectWithCleanup: React.FC = () => {
  const naming = "clean";

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
    <Description>
      The interval named <b>"{naming}"</b> is cleaned up when component is
      unmounted. When you go to a different SPA-page only the 'dirty' interval
      remains. When you return back to this page, the 'clean' interval will
      restart, while the dirty interval will continue counting.
    </Description>
  );
};
