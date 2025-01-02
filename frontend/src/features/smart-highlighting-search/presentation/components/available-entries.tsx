import { ListItem } from "./list-items.styles.ts";
import React from "react";
import { InsureNumber } from "../../api/models/insure-number.model.ts";

export const AvailableEntries: React.FC<{ insureNumbers: InsureNumber[] }> = ({
  insureNumbers,
}) => (
  <div>
    <h4>Available entries:</h4>
    <ul>
      {insureNumbers.length > 0 ? (
        insureNumbers.map((item, index) => (
          <ListItem key={`${item.insureNumber}-${index}`}>
            {item.insureNumber}
          </ListItem>
        ))
      ) : (
        <p>No entries available</p>
      )}
    </ul>
  </div>
);
