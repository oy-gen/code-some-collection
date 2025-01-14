import React, { useState } from "react";
import { ButtonWithoutMemo } from "./button-without-memo.tsx";

export const DemoWithoutUseCallback: React.FC = () => {
  const [number, setNumber] = useState<number>(0);

  const handleIncrement = () => {
    setNumber((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setNumber((prev) => prev - 1);
  };

  return (
    <div>
      <ButtonWithoutMemo handleClick={handleIncrement} label={"+ (standard)"} />{" "}
      <p>{number}</p>
      <ButtonWithoutMemo handleClick={handleDecrement} label={"- (standard)"} />
    </div>
  );
};
