module.exports = {
  extends: [
    'next',
    'turbo',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
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
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/consistent-type-exports': 'error',
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve('next/babel')],
    },
  },
  plugins: ['@typescript-eslint'],
}
