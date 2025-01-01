import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest", // Use ts-jest for TypeScript support
  testEnvironment: "node", // Use the Node.js environment for testing
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Transform TypeScript files using ts-jest
  },
  testMatch: ["**/tests/**/*.test.ts"], // Define the pattern for test files
};

export default config;
