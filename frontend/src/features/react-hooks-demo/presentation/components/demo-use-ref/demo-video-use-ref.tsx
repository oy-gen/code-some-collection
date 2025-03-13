import React, { useRef, useState } from "react";
import { Button } from "../../../../../shared/components/button.styles.ts";
import styled from "styled-components";

export const DemoVideoUseRef: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement | null>(null);

  function handleClick(): void {
    if (isPlaying) {
      ref.current?.pause();
    } else {
      ref.current?.play();
    }
  }

  return (
    <>
      <div>
        <StyledVideo
          width="250"
          ref={ref}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            type="video/mp4"
          />
        </StyledVideo>
        <Button onClick={handleClick}>{isPlaying ? "Pause" : "Play"}</Button>
      </div>
    </>
  );
};

const StyledVideo = styled.video`
  display: block;
  margin-bottom: 1rem;
`;
