module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: "latest",
    sourceType: "module",
    project: true
  },
  plugins: ["@typescript-eslint", "react-hooks", "jsx-a11y"],
  extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended", "plugin:jsx-a11y/recommended", "prettier"],
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@next/next/no-html-link-for-pages": "off"
  },
  overrides: [
    {
      files: ["**/*.test.{ts,tsx}", "tests/**/*"],
      env: { jest: false, node: true },
      plugins: ["@typescript-eslint"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off"
      }
    }
  ]
};
