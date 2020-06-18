module.exports = {
  extends: ['prettier', 'plugin:prettier/recommended'],
  parser: 'babel-eslint',
  plugins: ['prettier'],
  settings: {},
  globals: {
    window: true,
    fetch: true,
    FormData: true,
  },
  rules: {},
};
