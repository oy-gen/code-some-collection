import React, { useState } from "react";
import styled from "styled-components";
import { useStore } from "../../store/useStore";
import DOMPurify from "dompurify";
import useFindMatch from "./hooks/useFindMatch";
import useHighlightSearchMatch from "./hooks/useHighlightSearchMatch";

export const SmartSearchHighlightPage: React.FC = () => {
  const contractNumbers = useStore().smartSearchHighlightState.contractNumbers;
  const [searchValue, setSearchValue] = useState<string>("");

  function updateSearchValue(event: React.ChangeEvent<HTMLInputElement>): void {
    const sanitizeSearchValue = DOMPurify.sanitize(event.target.value);
    setSearchValue(sanitizeSearchValue);
    console.log(searchValue);
  }
  // make several possible
  const foundMatch: string | null = useFindMatch(searchValue, contractNumbers);
  const highlightedMatch: string | null = useHighlightSearchMatch(
    searchValue,
    foundMatch
  );

  return (
    <>
      <Container>
        <Title>search with smart highlighting</Title>
        <Description>
          this simulates a search for complex contract numbers that could
          include empty spaces or separation chars like '-', '/' or '_'. The
          search is applied on a normalized alphanumerical version of the
          contract number. Only the mathed consecutive parts are highlighted{" "}
        </Description>
        <Container>
          <Input
            placeholder="search something"
            value={searchValue}
            onChange={updateSearchValue}
          ></Input>
        </Container>
        <p>{highlightedMatch}</p>
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
  max-width: 800px;
  margin: 0 auto;
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
