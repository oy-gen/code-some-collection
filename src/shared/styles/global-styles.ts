import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
:root {
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif;
  background-color: #FFFFFF;
  color: #333;
  text-rendering: optimizeLegibility;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 400;
  min-width: 320px;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@media (min-width: 768px) {
  :root {
    font-size: 16px;
  }
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
  color: #6366FFFF;
  margin-bottom: 1rem;
}

a {
    font-weight: bold;
    color: #333;
    text-decoration: inherit;
}

a:hover {
    opacity: 0.8;
}
`;
