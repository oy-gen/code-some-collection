import React, { useState } from "react";
import styled from "styled-components";
import { useStore } from "../../store/useStore";
import DOMPurify from "dompurify";
import { selectSmartSearchHighlight } from "../../store/smartHighlightingSearchSlice";
import useFindSearchResultsAndHighlight from "./hooks/useFindResultsAndHighlight";

export const SmartHighlightingSearchPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [newContractNumber, setNewContractNumber] = useState<string>("");
  useFindSearchResultsAndHighlight(searchValue);

  const { contractNumbers, searchResults, addContractNumber } = useStore(
    selectSmartSearchHighlight
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
      <Container>
        <Title>Search with Smart Highlighting</Title>
        <Description>
          This demonstrates a search functionality tailored for complex contract
          or registration numbers, which may include spaces or special-character
          separators such as '-', '/' or '.'. The search operates on a
          normalized alphanumeric version of the contract number, making the
          search easier for the user, without worrying about exact formatting.
          Matched consecutive parts of the search term are accurately
          highlighted in the results. Try it out! Search for{" "}
          <strong>'abc'</strong>, <strong>'a-b/c'</strong> or{" "}
          <strong>'ccc'</strong>.
        </Description>
        <ResultWrapper></ResultWrapper>
        <ResultWrapper>
          <ResultColumn>
            <Input
              placeholder="search numbers"
              value={searchValue}
              onChange={handleSearchValueChange}
            ></Input>
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
            <Input
              placeholder="add numbers"
              value={newContractNumber}
              onChange={(event) => setNewContractNumber(event.target.value)}
            ></Input>
            <button onClick={() => handleAddNumber()}>add</button>
            <p>
              <strong>Available contract numbers:</strong>
            </p>
            {contractNumbers.map((item, index) => (
              <p key={`${item}-${index}`}>{item}</p>
            ))}
          </ResultColumn>
        </ResultWrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
`;

const Description = styled.p`
  margin-bottom: 1rem;
`;

const Input = styled.input`
  padding: 1em;
  margin-bottom: 1em;
`;

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

const ResultColumn = styled.div`
  width: 50%;
  flex-wrap: nowrap;
`;
