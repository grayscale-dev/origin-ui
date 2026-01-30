module.exports = {
  extends: ["@signal-web-ui/eslint-config"],
  ignorePatterns: ["src/directives/proxies.ts"],
  overrides: [
    {
      files: ["src/directives/proxies.ts"],
      rules: {
        "@typescript-eslint/consistent-type-imports": "off",
        "@typescript-eslint/no-unsafe-declaration-merging": "off",
        "@angular-eslint/no-inputs-metadata-property": "off"
      }
    }
  ]
};
