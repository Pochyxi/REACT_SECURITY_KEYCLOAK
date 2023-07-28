import {
    createTheme,
    alpha,
    getContrastRatio,
} from '@mui/material/styles';

// Augment the palette to include a softBlack color
declare module '@mui/material/styles' {
    interface Palette {
        softBlack: Palette['primary'];
    }

    interface PaletteOptions {
        softBlack?: PaletteOptions['primary'];
    }
}

// Update the Button's color options to include a violet option
declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        softBlack: true;
    }
}

const softBlackBase = '#283b48';
const softBlackMain = alpha(softBlackBase, 0.7);

const StandardButtonTheme = createTheme({
    palette: {
        softBlack: {
            main: softBlackMain,
            light: alpha(softBlackBase, 0.5),
            dark: alpha(softBlackBase, 0.9),
            contrastText: getContrastRatio(softBlackMain, '#fff') > 4.5 ? '#fff' : '#111',
        },
    },
});

export default StandardButtonTheme;