/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ["next/core-web-vitals", "prettier"],
  rules: {
    "react/prop-types": "off",
    "react/no-unescaped-entities": "off",
    "@next/next/no-img-element": "warn",
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "prefer-const": "error",
    "no-unused-vars": "off",
  },
  ignorePatterns: ["node_modules", ".next", "out", "public"],
};
