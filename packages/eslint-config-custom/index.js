module.exports = {
  extends: [
    'next',
    'turbo',
    'eslint:recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  settings: {
    next: {
      rootDir: ['apps/*/', 'packages/*/'],
    },
  },
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'no-unused-vars': 'warn',
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve('next/babel')],
    },
  },
  plugins: ['@typescript-eslint'],
}
