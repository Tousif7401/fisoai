import { FlatCompat } from "@eslint/eslintrc";
import nextEslint from "eslint-config-next";
import tseslint from "typescript-eslint";

const compat = new FlatCompat();

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];
