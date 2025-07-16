import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
    typescript: true,
    language: 'typescript',
    unocss: true,
    ignore: ['**/node_modules/**', '**/dist/**'],

    settings: {
      'import/core-modules': ['vue-router/auto-routes'],
    },
  },
)
