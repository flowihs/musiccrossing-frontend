import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import security from "eslint-plugin-security";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  {
    ignores: [".next/**", ".dist/**", "node_modules/**"],
  },

  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Apply plugin rules
  {
    plugins: {
      security,
      "import": importPlugin,
      react,
      "react-hooks": reactHooks,
    },

    settings: {
      react: { version: "detect" },
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },

    rules: {
      // security (keep light unless you want stricter)
      "security/detect-object-injection": "warn",

      // import
      "import/no-unresolved": "error",
      "import/no-restricted-paths": [
        "error",
        {
          basePath: __dirname,
          zones: [
            {
              target: "./shared",
              from: ["./entities", "./features", "./widgets", "./app"],
              message: "Shared must not depend on higher FSD layers.",
            },
            {
              target: "./entities",
              from: ["./features", "./widgets", "./app"],
              message: "Entities may only depend on shared.",
            },
            {
              target: "./features",
              from: ["./widgets", "./app"],
              message: "Features must not depend on widgets or app.",
            },
            {
              target: "./widgets",
              from: "./app",
              message: "Widgets must not depend on app.",
            },
          ],
        },
      ],
      "import/named": "warn",
      "import/namespace": "warn",
      "import/default": "warn",
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
            "type",
            "object",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      // react (Next uses the new JSX transform; these are typically unnecessary)
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/prop-types": "off",

      // hooks (strongly recommended)
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },

  // Ensure TypeScript files use TS parser in Flat config
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
    },
  },

  {
    rules: {
      "@next/next/no-img-element": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },

  {
    files: ["{app,entities,features,widgets}/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@/entities/*/api/*",
                "@/entities/*/model/*",
                "@/entities/*/ui/*",
                "@/features/*/api/*",
                "@/features/*/model/*",
                "@/features/*/ui/*",
                "@/widgets/*/model/*",
                "@/widgets/*/ui/*",
              ],
              message: "Import another slice through its public index.ts API.",
            },
            {
              group: ["@/components/*", "@/store/*", "@/lib/*"],
              message: "Legacy root aliases are forbidden after the FSD migration.",
            },
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
