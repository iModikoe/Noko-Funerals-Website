import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

/**
 * Flat config. `next lint` is deprecated in Next 15 and removed in 16, and it
 * prompts interactively when unconfigured — which would hang CI — so the repo
 * calls the ESLint CLI directly instead. See the `lint` script.
 */
const config = [
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "node_modules/**",
      "next-env.d.ts",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default config;
