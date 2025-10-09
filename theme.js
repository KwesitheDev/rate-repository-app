import { Platform } from 'react-native';
const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    white: '#ffffff',
    appBarBackground: '#24292e',
    mainBackground: '#e1e4e8',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      ios: 'Arial',
      android: 'Roboto',
      default: 'System', // fallback for other platforms
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;
