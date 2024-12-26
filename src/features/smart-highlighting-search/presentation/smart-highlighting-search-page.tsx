import React, { useState } from "react";
import styled from "styled-components";
import {
  selectSmartHighlightingSearch,
  useStore,
} from "../../../shared/store/use-store.ts";
import DOMPurify from "dompurify";
import { Input } from "../../../shared/components/input.styles.ts";
import { Description } from "../../../shared/components/description.styles.ts";
import { Button } from "../../../shared/components/button.styles.ts";
import useFindSearchResultsAndHighlight from "../business/hooks/use-find-results-and-highlight.ts";

export const SmartHighlightingSearchPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [newContractNumber, setNewContractNumber] = useState<string>("");
  useFindSearchResultsAndHighlight(searchValue);

  const { contractNumbers, searchResults, addContractNumber } = useStore(
    selectSmartHighlightingSearch,
  );

  function handleAddNumber(): void {
    const sanitizedValue = DOMPurify.sanitize(newContractNumber);
    addContractNumber(sanitizedValue);
    setNewContractNumber("");
  }

  function handleSearchValueChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ): void {
    const sanitizedValue = DOMPurify.sanitize(event.target.value);
    setSearchValue(sanitizedValue);
  }

  return (
    <>
      <h1>Search with Smart Highlighting</h1>
      <Description>
        A user-friendly search functionality designed for complex strings, such
        as contract or registration numbers, which may include spaces or
        special-character separators like '-', '/', or '.'. The search
        normalizes these inputs into an alphanumeric format, allowing users to
        find results without worrying about exact formatting.
        <br></br>
        The challenge was to precisely highlight only the consecutive parts of
        the search, ignoring all separators. Try it out! Search for{" "}
        <strong>'a-b/c'</strong>, <strong>'cba'</strong>, or{" "}
        <strong>'ccc'</strong>. Or add a new number.
      </Description>
      <ResultWrapper>
        <Input
          placeholder="search numbers"
          value={searchValue}
          onChange={handleSearchValueChange}
        ></Input>
        <InputButtonWrapper>
          <Input
            placeholder="add numbers"
            value={newContractNumber}
            $width={"narrow"}
            onChange={(event) => setNewContractNumber(event.target.value)}
          ></Input>
          <Button onClick={() => handleAddNumber()}>add</Button>
        </InputButtonWrapper>
        <div>
          <h4>Search result:</h4>
          {searchResults ? (
            searchResults.map((result) => (
              <HighlightedMatch
                key={result}
                dangerouslySetInnerHTML={{ __html: result }}
              ></HighlightedMatch>
            ))
          ) : (
            <p>no match found</p>
          )}
        </div>
        <div>
          <h4>Available entries:</h4>
          {contractNumbers &&
            contractNumbers.map((item, index) => (
              <p key={`${item}-${index}`}>{item}</p>
            ))}
        </div>
      </ResultWrapper>
    </>
  );
};

const ResultWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const HighlightedMatch = styled.p`
  .highlight {
    color: ${({ theme }) => theme.colors.warning};
    font-weight: bold;
  }
`;

const InputButtonWrapper = styled.div`
  display: flex;
`;
