import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "emails/.react-email/**",
      "emails/node_modules/**",
    ],
  },
  ...compat.extends("next/core-web-vitals", "prettier"),
];

export default eslintConfig;
