import React, { useContext } from "react";
import { Button } from "../../../../../shared/components/button.styles.ts";
import { DemoUseContextProvider } from "./demo-use-context-provider.tsx";

export const DemoUseContext: React.FC = () => {
  const context = useContext(DemoUseContextProvider);

  return (
    <Button onClick={context.toggleSharedColor}>
      Toggle prop: {context.sharedColor}
    </Button>
  );
};
