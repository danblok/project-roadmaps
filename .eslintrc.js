module.exports = {
  extends: ['custom'],
  parserOptions: {
    project: ['./packages/*/tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  root: true,
}
