import { createStitches } from '@stitches/react';

export const MAIN_ACCENT = '#6344F7';
export const COLORS = {
  accent: MAIN_ACCENT,
  disabled: '#5B5D6B',
};

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: COLORS,
    shadows: COLORS,
  },
});
