module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: 'eslint:recommended',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    'no-async-promise-executor': 'error',
    'no-await-in-loop': 'warn',
    'no-extra-parens': 'warn',
    'no-template-curly-in-string': 'error',
    'require-atomic-updates': 'error',
    'array-callback-return': 'error',
    'block-scoped-var': 'warn',
    complexity: 'warn',
    'consistent-return': 'error',
    curly: 'warn',
    'dot-notation': 'warn',
    eqeqeq: 'error',
    'no-undef': 'off',
    'no-console': 'off'
  }
};
