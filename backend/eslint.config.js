import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintImport from "eslint-plugin-import";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts}"],
    languageOptions: {
      ecmaVersion: 2020,
    },
    plugins: {
      import: eslintImport,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@/no-restricted-imports": [
        "error",
        {
          paths: [],
          patterns: [
            {
              group: ["../frontend/**", "./frontend/**"],
              message:
                "Imports from the frontend folder are not allowed in the backend.",
            },
          ],
        },
      ],
    },
  },
);
