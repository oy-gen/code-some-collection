import { ListItem } from "./list-items.styles.ts";
import React from "react";

export const AvailableEntries: React.FC<{ insureNumbers: string[] }> = ({
  insureNumbers,
}) => (
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
