'use strict';

module.exports = {
  rules: {
    'max-len': [
      'warning',
      120,
      2,
      {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'class-methods-use-this': ['off'],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    strict: ['off'],
  },
  extends: 'airbnb',
};
