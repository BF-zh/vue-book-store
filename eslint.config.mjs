import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
    typescript: true,
    language: 'typescript',
    unocss: true,
    ignore: ['**/node_modules/**', '**/dist/**'],
    rules: {
      'ts/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'unused-imports/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'unused-imports/no-unused-imports': ['error', {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      }],
    },
    settings: {
      'import/core-modules': ['vue-router/auto-routes'],
    },
  },
)
