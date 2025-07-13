import { presetWind, presetWind3 } from '@unocss/preset-wind3'
import presetWind4 from '@unocss/preset-wind4'
import { defineConfig, presetAttributify, presetIcons, transformerCompileClass, transformerVariantGroup } from 'unocss'
import presetAnimations from 'unocss-preset-animations'

export default defineConfig({
  presets: [
    presetWind3(),
    presetWind4(),
    presetWind(),
    presetAnimations(),
    presetIcons({
      scale: 1.2, // scale: 1.2,
      warn: true,
      autoInstall: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetAttributify(),
  ],
  transformers: [
    transformerVariantGroup(),
    transformerCompileClass(),
  ],
  content: {

    pipeline: {
      include: [
        // the default
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // include js/ts files
        '(components|src)/**/*.{js,ts}',
      ],
    },
  },
})
