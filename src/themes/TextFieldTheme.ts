import {createTheme} from "@mui/material/styles";

const TextFieldTheme = createTheme({
    palette: {
        primary: {
            main: '#BB86FC', // this will be the color of your AppBar
        }
    },
    components: {
        MuiFilledInput: {
            styleOverrides: {
                input: {
                    color: 'whitesmoke',
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                filled: {
                    color: '#BB86FC',
                    '&.Mui-focused': {
                        color: '#BB86FC',
                    },
                },
            },
        },
    },
});

export default TextFieldTheme;