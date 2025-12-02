import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: ["dist"],
  extends: [
    js.configs.recommended,
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  plugins: {
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
    "@typescript-eslint": tsPlugin,
  },
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "@typescript-eslint/no-unused-vars": "off",
  },
};
