import React, { useState } from "react";
import styled from "styled-components";
import {
  selectSmartHighlightingSearch,
  useStore,
} from "../../../03-data/store/useStore.ts";
import DOMPurify from "dompurify";
import useFindSearchResultsAndHighlight from "../../../02-business-logic/smart-highlighting-search/hooks/useFindResultsAndHighlight.ts";
import { useFetchContractNumbers } from "../../../03-data/fetch/useFetchContractNumbers.ts";
import { InputField } from "../../components/shared/InputField.ts";
import { DescriptionText } from "../../components/shared/DescriptionText.ts";
import { Button } from "../../components/shared/Button.ts";

export const SmartHighlightingSearchPage: React.FC = () => {
  useFetchContractNumbers();

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
      <DescriptionText>
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
      </DescriptionText>
      <ResultWrapper>
        <InputField
          placeholder="search numbers"
          value={searchValue}
          onChange={handleSearchValueChange}
        ></InputField>
        <InputButtonWrapper>
          <InputField
            placeholder="add numbers"
            value={newContractNumber}
            $width={"narrow"}
            onChange={(event) => setNewContractNumber(event.target.value)}
          ></InputField>
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
