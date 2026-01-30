module.exports = {
  extends: ["@signal-ui/eslint-config"],
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
