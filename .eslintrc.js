module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parser: '@babel/eslint-parser',
  overrides: [],
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  globals: {},
  rules: {
    'no-void': [
      'error',
      {
        allowAsStatement: true,
      },
    ],
    'no-unused-vars': 'warn',
  },
};
