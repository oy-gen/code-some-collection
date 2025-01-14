import React, { useCallback, useState } from "react";
import { ButtonWithMemo } from "./button-with-memo.tsx";

export const DemoUseCallback: React.FC = () => {
  const [number, setNumber] = useState<number>(0);

  const handleIncrementUseCallback = useCallback(() => {
    setNumber((prev) => prev + 1);
  }, []);

  const handleDecrementUseCallback = useCallback(() => {
    setNumber((prev) => prev - 1);
  }, []);

  return (
    <div>
      <ButtonWithMemo
        handleClick={handleIncrementUseCallback}
        label={"+ (useCallback)"}
      />
      <p>{number}</p>
      <ButtonWithMemo
        handleClick={handleDecrementUseCallback}
        label={"- (useCallback)"}
      />
    </div>
  );
};
