import { DarkTheme } from 'react-native-paper';

export const darkTheme: typeof DarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#00BFA6',
    // background: '#303030',
    // surface: '#424242',
  },
  mode: 'adaptive',
  dark: true,
  roundness: 24,
};
