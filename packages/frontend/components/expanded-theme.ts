import '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
  export interface PaletteOptions {
    light: {
      light: string;
      main: string;
      dark: string;
    };
  }
}
