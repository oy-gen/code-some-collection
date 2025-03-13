import React, { useRef } from "react";
import { Button } from "../../../../../shared/components/button.styles.ts";
import styled from "styled-components";

export const DemoGalleryUseRef: React.FC = () => {
  const listRef = useRef<HTMLUListElement | null>(null);

  function scrollToIndex(index: number) {
    const listNode = listRef.current;
    if (listNode) {
      const childNodes = listNode.querySelectorAll("li > img");
      if (childNodes[index]) {
        childNodes[index].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }

  return (
    <div>
      <CatContainer>
        <UnorderedList ref={listRef}>
          <li>
            <Image src="https://placecats.com/neo/300/200" alt="Neo" />
          </li>
          <li>
            <Image src="https://placecats.com/millie/200/200" alt="Millie" />
          </li>
          <li>
            <Image src="https://placecats.com/bella/199/200" alt="Bella" />
          </li>
        </UnorderedList>
      </CatContainer>
      <ButtonWrapper>
        <Button onClick={() => scrollToIndex(0)}>Neo</Button>
        <Button onClick={() => scrollToIndex(1)}>Millie</Button>
        <Button onClick={() => scrollToIndex(2)}>Bella</Button>
      </ButtonWrapper>
    </div>
  );
};

const ButtonWrapper = styled.div`
  padding-top: 1rem;
  display: flex;
  gap: 1rem;
`;

const CatContainer = styled.div`
  width: 50%;
  overflow: hidden;
`;

const UnorderedList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  gap: 10px;
`;

const Image = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
`;
