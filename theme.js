const colors = {
  accent: '#FA754C',
  black: '#292934',
  white: '#FFFFFF',
  gray: '#A7A7A7',
  gray2: '#ECEDEF',
  button: '#F4F5F7',
};

const sizes = {
  base: 14, // Ajout de "px"
  font: 14, // Ajout de "px"
  welcome: 18, // Ajout de "px"
  name: '21px', // Ajout de "px"
  h1: '140px', // Ajout de "px"
  button: '16px', // Ajout de "px"
};

const fonts = {
  welcome: {
    fontSize: sizes.welcome,
    color: colors.gray,
    letterSpacing: '-0.6px', // Ajout de "px"
    lineHeight: parseInt(sizes.welcome) + 4 + 'px', // Conversion en nombre et ajout de "px"
  },
  name: {
    fontSize: sizes.name,
    fontWeight: '600',
    color: colors.black,
    letterSpacing: '-1.1px', // Ajout de "px"
    lineHeight: parseInt(sizes.name) + 4 + 'px', // Conversion en nombre et ajout de "px"
  },
  caption: {
    fontSize: sizes.welcome, // Utilisation de la taille de police "welcome"
    color: colors.gray,
    letterSpacing: '-0.6px', // Ajout de "px"
    lineHeight: parseInt(sizes.welcome) + 4 + 'px', // Conversion en nombre et ajout de "px"
  },
  h1: {
    fontSize: sizes.h1,
    color: colors.black,
    letterSpacing: '-10px', // Ajout de "px"
    lineHeight: sizes.h1, // La valeur est déjà en pixels
  },
  button: {
    fontSize: sizes.button,
    color: colors.black,
    fontWeight: '600',
    letterSpacing: '-0.4px', // Ajout de "px"
    lineHeight: parseInt(sizes.button) + 4 + 'px', // Conversion en nombre et ajout de "px"
  },
};

const globalStyles = `
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${colors.white};
    background: rgb(23, 32, 46);
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
`;

export { colors, sizes, fonts, globalStyles };
