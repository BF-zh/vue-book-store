import presetWind3 from '@unocss/preset-wind3'
import presetWind4 from '@unocss/preset-wind4'
import { defineConfig, presetAttributify, presetIcons, transformerCompileClass, transformerVariantGroup } from 'unocss'

export default defineConfig({
  presets: [
    presetWind3(),
    presetWind4(),
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
})
