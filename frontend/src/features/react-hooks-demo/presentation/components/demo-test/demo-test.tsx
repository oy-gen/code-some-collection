import React, { useEffect, useState } from "react";
import { Description } from "../../../../../shared/components/description.styles.ts";

export const DemoTest: React.FC = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <h1>customHooks</h1>
      {data && (
        <Description>{JSON.stringify([...data].slice(1, 5))} ... </Description>
      )}
    </>
  );
};
