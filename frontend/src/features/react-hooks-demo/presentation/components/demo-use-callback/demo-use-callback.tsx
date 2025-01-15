import React, { useCallback, useState } from "react";
import { ButtonWithMemo } from "./button-with-memo.tsx";
import { ButtonWithoutMemo } from "./button-without-memo.tsx";
interface Props {
  isUseCallback: boolean;
}

export const DemoUseCallback: React.FC<Props> = ({ isUseCallback = false }) => {
  const [number, setNumber] = useState<number>(0);

  const handleIncrementUseCallback = useCallback(() => {
    setNumber((prev) => prev + 1);
  }, []);

  const handleDecrementUseCallback = useCallback(() => {
    setNumber((prev) => prev - 1);
  }, []);

  const handleIncrement = () => {
    setNumber((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setNumber((prev) => prev - 1);
  };

  return (
    <div>
      {isUseCallback ? (
        <>
          <ButtonWithMemo
            handleClick={handleIncrementUseCallback}
            label={"+ (useCallback)"}
          />
          <p>{number}</p>
          <ButtonWithMemo
            handleClick={handleDecrementUseCallback}
            label={"- (useCallback)"}
          />
        </>
      ) : (
        <>
          <ButtonWithoutMemo
            handleClick={handleIncrement}
            label={"+ (standard)"}
          />{" "}
          <p>{number}</p>
          <ButtonWithoutMemo
            handleClick={handleDecrement}
            label={"- (standard)"}
          />
        </>
      )}
    </div>
  );
};
