import React, { useState } from "react";
import styled from "styled-components";
import {
  selectSmartHighlightingSearch,
  useStore,
} from "../../03-data/store/useStore";
import DOMPurify from "dompurify";
import useFindSearchResultsAndHighlight from "../../02-business-logic/smart-highlighting-search/hooks/useFindResultsAndHighlight";
import { useFetchContractNumbers } from "../../03-data/fetch/useFetchContractNumbers";
import { StyledContentContainer } from "../components/shared/StyledContentContainer";
import { StyledDescription } from "../components/shared/SyledDescription";
import { StyledInputField } from "../components/shared/StyledInputField";
import { StyledButton } from "../components/shared/SyledButton";

export const SmartHighlightingSearchPage: React.FC = () => {
  useFetchContractNumbers();

  const [searchValue, setSearchValue] = useState<string>("");
  const [newContractNumber, setNewContractNumber] = useState<string>("");
  useFindSearchResultsAndHighlight(searchValue);

  const { contractNumbers, searchResults, addContractNumber } = useStore(
    selectSmartHighlightingSearch
  );

  function handleAddNumber(): void {
    const sanitizedValue = DOMPurify.sanitize(newContractNumber);
    addContractNumber(sanitizedValue);
    setNewContractNumber("");
  }

  function handleSearchValueChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    const sanitizedValue = DOMPurify.sanitize(event.target.value);
    setSearchValue(sanitizedValue);
  }

  return (
    <>
      <StyledContentContainer>
        <h1>Search with Smart Highlighting</h1>
        <StyledDescription>
          A user-friendly search functionality designed for complex strings,
          such as contract or registration numbers, which may include spaces or
          special-character separators like '-', '/', or '.'. The search
          normalizes these inputs into an alphanumeric format, allowing users to
          find results without worrying about exact formatting.
          <br></br>
          The challenge was to precisely highlight only the consecutive parts of
          the search, ignoring all separators. Try it out! Search for{" "}
          <strong>'a-b/c'</strong>, <strong>'cba'</strong>, or{" "}
          <strong>'ccc'</strong>. Or add a new number.
        </StyledDescription>
        <ResultWrapper></ResultWrapper>
        <ResultWrapper>
          <ResultColumn>
            <Row>
              <StyledInputField
                placeholder="search numbers"
                value={searchValue}
                onChange={handleSearchValueChange}
              ></StyledInputField>
            </Row>
            <p>
              <strong>Search sesult:</strong>
            </p>
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
          </ResultColumn>
          <ResultColumn>
            <Row>
              <StyledInputField
                placeholder="add numbers"
                value={newContractNumber}
                onChange={(event) => setNewContractNumber(event.target.value)}
              ></StyledInputField>
              <StyledButton onClick={() => handleAddNumber()}>add</StyledButton>
            </Row>
            <p>
              <strong>Available contract numbers:</strong>
            </p>
            {contractNumbers &&
              contractNumbers.map((item, index) => (
                <p key={`${item}-${index}`}>{item}</p>
              ))}
          </ResultColumn>
        </ResultWrapper>
      </StyledContentContainer>
    </>
  );
};

const HighlightedMatch = styled.p`
  .highlight {
    color: orange;
    font-weight: bold;
  }
`;

const ResultWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 3rem;
`;

const Row = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

const ResultColumn = styled.div`
  width: 50%;
`;
