import React, { useState } from "react";
import styled from "styled-components";
import { useStore } from "../../store/useStore";
import DOMPurify from "dompurify";
import useFindMatches from "./hooks/useFindMatch";
import useHighlightSearchMatches from "./hooks/useHighlightSearchMatches";

export const SmartSearchHighlightPage: React.FC = () => {
  const contractNumbers = useStore().smartSearchHighlightState.contractNumbers;
  const [searchValue, setSearchValue] = useState<string>("");

  function updateSearchValue(event: React.ChangeEvent<HTMLInputElement>): void {
    const sanitizeSearchValue = DOMPurify.sanitize(event.target.value);
    setSearchValue(sanitizeSearchValue);
    console.log(searchValue);
  }

  const foundMatches: string[] | null = useFindMatches(
    searchValue,
    contractNumbers
  );

  const matchesWithHighlight: string[] | null = useHighlightSearchMatches(
    searchValue,
    foundMatches
  );

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
          highlighted in the results. Try it out! Search for 'abc' and 'a-b/c'.
        </Description>
        <Container>
          <Input
            placeholder="search something"
            value={searchValue}
            onChange={updateSearchValue}
          ></Input>
        </Container>
        {matchesWithHighlight ? (
          matchesWithHighlight.map((match) => (
            <HighlightedMatch
              dangerouslySetInnerHTML={{ __html: match }}
            ></HighlightedMatch>
          ))
        ) : (
          <p>no match found</p>
        )}

        <p>
          <strong>assume this is your contract number db:</strong>
        </p>
        {contractNumbers.map((item, index) => (
          <p key={`${item}-${index}`}>{item}</p>
        ))}
      </Container>
    </>
  );
};

const Container = styled.div`
  max-width: 1000px;
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
  margin-bottom: 1.2em;
`;

const HighlightedMatch = styled.p`
  .highlight {
    color: orange;
    font-weight: bold;
  }
`;
