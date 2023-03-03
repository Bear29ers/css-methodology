module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  rules: {
    'no-descending-specificity': null,
    'selector-class-pattern': '^(([a-z][a-zA-Z0-9_]+)|([a-z][a-z0-9]*)(-[a-zA-Z0-9_]+)*)$',
  },
};
