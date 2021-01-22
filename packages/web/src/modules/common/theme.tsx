const theme = {
  colors: {
    primary: '#F26B00',
    text: '#24292E',
    label: '#7A7A7A',
    background: '#FFFFFF',
  },
  fontSizes: {
    h1: '40px',
    h2: '30px',
    h3: '25px',
    title: '20px',
    label: '16px',
    text: '14px',
    legend: '12px',
  },
  fontWeights: {
    regular: '400',
    semiBold: '600',
    bold: '700',
    extraBold: '800',
  },
};

type Colors = typeof theme.colors;
type FontSizes = typeof theme.fontSizes;
type FontWeights = typeof theme.fontWeights;

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Colors;
    fontSizes: FontSizes;
    fontWeights: FontWeights;
  }
}

export default theme;
