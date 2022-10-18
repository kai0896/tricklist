const palette = {
  purple: '#CD0E61',
  green: '#0b9d78',
  red: '#444',
  black: '#000000',
  grey: '#111',
  white: '#F0F2F3',
}

export const theme = {
  colors: {
    background: palette.black,
    backgroundAlt: palette.grey,
    foreground: palette.white,
    primary: palette.green,
    secondary: palette.purple,
    accent: palette.red,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  text: {
    fontSize: 16,
  }
};

export const darkTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: palette.black,
    foreground: palette.white,
  }
}
