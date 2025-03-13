import React, { memo } from "react";
import { Button } from "../../../../../shared/components/button.styles.ts";

interface Props {
  label: string;
  handleClick: () => void;
}

export const ButtonWithMemo: React.FC<Props> = memo(
  ({ label, handleClick }) => {
      console.log(`${label} button called `);
    return <Button onClick={handleClick}>{label}</Button>;
  },
);
