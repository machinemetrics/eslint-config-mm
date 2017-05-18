'use strict';

module.exports = {
  rules: {
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    strict: ['off'],
  },
  extends: 'airbnb',
};
