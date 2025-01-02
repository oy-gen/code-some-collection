import React, { useCallback, useState } from "react";
import styled from "styled-components";
import {
  selectSmartHighlightingSearch,
  useStore,
} from "../../../shared/store/use-store.ts";
import DOMPurify from "dompurify";
import { Input } from "../../../shared/components/input.styles.ts";
import { Description } from "../../../shared/components/description.styles.ts";
import { Button } from "../../../shared/components/button.styles.ts";
import { useGetAllInsureNumbers } from "../business/hooks/use-get-all-insure-numbers.ts";
import { addInsureNumberToDb } from "../business/services/insure-number-service.ts";
import useGetSearchResults from "../business/hooks/use-get-search-results.ts";
import { SearchResults } from "./components/search-results.tsx";
import { AvailableEntries } from "./components/available-entries.tsx";

export const SmartHighlightingSearchPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [newInsureNumber, setNewInsureNumber] = useState<string>("");
  const { insureNumbers, searchResults, addInsureNumberToStore } = useStore(
    selectSmartHighlightingSearch,
  );

  useGetAllInsureNumbers();
  useGetSearchResults(searchValue);

  const handleSearchValueChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const sanitizedValue = DOMPurify.sanitize(event.target.value);
      setSearchValue(sanitizedValue);
    },
    [],
  );

  const handleAddInsureNumberValueChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const sanitizedValue = DOMPurify.sanitize(event.target.value);
      setNewInsureNumber(sanitizedValue);
    },
    [],
  );

  const handleAddNumberClick = useCallback(async () => {
    const addedInsureNumber = await addInsureNumberToDb(newInsureNumber);
    if (addedInsureNumber) {
      addInsureNumberToStore(addedInsureNumber);
    }
    setNewInsureNumber("");
  }, [newInsureNumber, addInsureNumberToStore]);

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
        the search, ignoring all separators. Try it out! Search for
        <strong>'a-b/c'</strong>, <strong>'cba'</strong>, or
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
            value={newInsureNumber}
            $width={"narrow"}
            onChange={handleAddInsureNumberValueChange}
          ></Input>
          <Button onClick={handleAddNumberClick}>add</Button>
        </InputButtonWrapper>
        <SearchResults searchResults={searchResults} />
        <AvailableEntries insureNumbers={insureNumbers} />
      </ResultWrapper>
    </>
  );
};

const ResultWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const InputButtonWrapper = styled.div`
  display: flex;
`;
