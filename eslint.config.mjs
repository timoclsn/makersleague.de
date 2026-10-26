import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier/flat";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  globalIgnores([
    "node_modules/**",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "emails/.react-email/**",
    "emails/node_modules/**",
  ]),
  ...nextCoreWebVitals,
  prettier,
]);

export default eslintConfig;
