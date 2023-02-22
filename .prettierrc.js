module.exports = {
  printWidth: 120,
  semi: true,
  tabWidth: 2,
  trailingComma: 'es5',
  singleQuote: true,
  overrides: [
    {
      files: ['**/*.css', '**/*.html'],
      options: {
        singleQuote: false,
      },
    },
  ],
};
