import {createTheme} from "@mui/material";

export const modifyUserFormTheme = createTheme({
    components: {
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    // Stile normale della label
                    color: '#fff',

                    '&.Mui-focused': {
                        color: 'lightgreen',
                    },
                },
            },
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    // Stile normale del testo
                    color: '#fff',
                    '&:hover': {
                        // Stile del testo quando il mouse è sopra
                        color: '#fff',
                    },
                    "&.Mui-disabled": {
                        "color": "lightgrey"
                    }
                },
                underline: {
                    '&:before': {
                        // Barra sottostante normale
                        borderBottom: '2px solid darkgreen',
                    },
                    '&:hover:not(.Mui-disabled):before': {
                        // Barra sottostante all'hover
                        borderBottom: '2px solid #fff',
                    },
                    '&.Mui-focused:after': {
                        // Barra sottostante quando è in focus
                        borderBottom: '2px solid lightgreen',
                    },
                    '&.Mui-error:after': {
                        // Barra sottostante quando c'è un errore
                        borderBottom: '2px solid red',
                    },
                },
            },
        },
    },
});