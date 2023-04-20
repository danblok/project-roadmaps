module.exports = {
  extends: ['custom'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: [
      './tsconfig.eslint.json',
      './packages/*/tsconfig.json',
    ],
  },
  rules: {
    'no-console': 2,
  },
  root: true,
}
