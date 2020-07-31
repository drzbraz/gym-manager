module.exports = {
  env: {
    commonjs: true,
    es2020: true,
    node: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 11
  },
  rules: {
    'class-methods-use-this': 'off',
    'no-params-reassign': 'off',
    camelcase: 'off',
    'no-tabs': 'off',
    'no-undef': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }]
  }
}
