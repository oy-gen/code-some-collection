import { ListItem } from "./list-items.styles.ts";
import React from "react";

interface Props {
  searchResults: string[];
}

export const SearchResults: React.FC<Props> = ({ searchResults }) => {
  return (
    <div>
      <h4>Search result:</h4>
      <ul>
        {searchResults.length && searchResults.length > 0 ? (
          searchResults.map((item, index) => (
            <ListItem
              key={`${item}-${index}`}
              dangerouslySetInnerHTML={{ __html: item }}
            ></ListItem>
          ))
        ) : (
          <p>No match found</p>
        )}
      </ul>
    </div>
  );
};
