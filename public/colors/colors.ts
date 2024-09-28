import config from '@/tailwind.config'

// tailwindcss colors (값)
export const colorSet = {
  tbPrimary: config.theme.extend.colors.tbPrimary,
  tbPrimaryHover: config.theme.extend.colors.tbPrimaryHover,

  tbSecondary: config.theme.extend.colors.tbSecondary,
  tbSecondaryHover: config.theme.extend.colors.tbSecondaryHover,

  tbGreen: config.theme.extend.colors.tbGreen,
  tbGreenHover: config.theme.extend.colors.tbGreenHover,

  tbBlue: config.theme.extend.colors.tbBlue,
  tbBlueHover: config.theme.extend.colors.tbBlueHover,

  tbPlaceholder: config.theme.extend.colors.tbPlaceholder,
  tbPlaceHolderHover: config.theme.extend.colors.tbPlaceHolderHover,

  tbGray: config.theme.extend.colors.tbGray,
  tbBackdrop: config.theme.extend.colors.tbBackdrop,

  tbRed: config.theme.extend.colors.tbRed,
  tbOrange: config.theme.extend.colors.tbOrange,

  tbWhite: config.theme.extend.colors.tbWhite,
  tbBlack: config.theme.extend.colors.tbBlack,
  tbMappin6: config.theme.extend.colors.tbMappin6,
  tbMappin7: config.theme.extend.colors.tbMappin7,
  tbMappin8: config.theme.extend.colors.tbMappin8,
  tbMappin9: config.theme.extend.colors.tbMappin9,
  tbMappin10: config.theme.extend.colors.tbMappin10,
}

export type ColorType = keyof typeof colorSet
