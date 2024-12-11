import React, { useState } from "react";
import styled from "styled-components";
import {
  selectSmartHighlightingSearch,
  useStore,
} from "../../03-data/store/useStore";
import DOMPurify from "dompurify";
import useFindSearchResultsAndHighlight from "../../02-business-logic/smart-highlighting-search/hooks/useFindResultsAndHighlight";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useFetchContractNumbers } from "../../03-data/fetch/useFetchContractNumbers";

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
      <Container>
        <Title>Search with Smart Highlighting</Title>
        <Description>
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
        </Description>
        <ResultWrapper></ResultWrapper>
        <ResultWrapper>
          <ResultColumn>
            <Row>
              <Input
                placeholder="search numbers"
                value={searchValue}
                onChange={handleSearchValueChange}
              ></Input>
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
              <Input
                placeholder="add numbers"
                value={newContractNumber}
                onChange={(event) => setNewContractNumber(event.target.value)}
              ></Input>
              <Button
                buttonText="add"
                onClick={() => handleAddNumber()}
              ></Button>
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
  margin-bottom: 1rem;
`;

const Description = styled.p`
  margin-bottom: 2rem;
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

const Row = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

const ResultColumn = styled.div`
  width: 50%;
`;
