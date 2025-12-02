import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextCoreWebVitals,
  {
    // Keep node_modules out of lint runs; other framework defaults remain in the base config.
    ignores: ["node_modules/**"],
  },
];

export default eslintConfig;
