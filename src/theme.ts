// theme.ts
import { definePreset } from '@primeuix/themes'
import Lara from '@primeuix/themes/lara'

export const MyTheme = definePreset(Lara, {
  semantic: {
    primary: {
      50: '#f3e8ff',
      100: '#e9d5ff',
      200: '#d8b4fe',
      300: '#c084fc',
      400: '#a855f7',
      500: '#7435FF',
      600: '#6b21a8',
      700: '#581c87',
      800: '#3b0764',
      900: '#2e1065'
    }
  }
})
