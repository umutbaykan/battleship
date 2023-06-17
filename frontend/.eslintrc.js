module.exports = {
  env: {
    browser: true,
    es2021: true,
    es6: true,
    'jest/globals': true,
    'cypress/globals': true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:cypress/recommended',
    'eslint:recommended',
    'standard'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'cypress', 'jest'],
  rules: { 'react/react-in-jsx-scope': 'off' }
}
