import { DefaultTheme } from 'react-native-paper';

export const lightTheme: typeof DefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#00BFA6',
  },
  roundness: 24,
};
