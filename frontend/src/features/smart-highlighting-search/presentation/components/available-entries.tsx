import { ListItem } from "./list-items.styles.ts";
import React from "react";

interface Props {
  insureNumbers: string[];
}

export const AvailableEntries: React.FC<Props> = ({ insureNumbers }) => (
  <div>
    <h4>Available entries:</h4>
    <ul>
      {insureNumbers.length > 0 ? (
        insureNumbers.map((item, index) => (
          <ListItem key={`${item}-${index}`}>{item}</ListItem>
        ))
      ) : (
        <p>No entries available</p>
      )}
    </ul>
  </div>
);
