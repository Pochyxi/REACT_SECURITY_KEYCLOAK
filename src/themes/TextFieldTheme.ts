import {createTheme} from "@mui/material/styles";

const TextFieldTheme = createTheme({
    palette: {
        primary: {
            main: '#138016', // this will be the color of your AppBar
        }
    },
    components: {
        MuiFilledInput: {
            styleOverrides: {
                input: {
                    color: 'whitesmoke',
                    fontSize: '1.2rem',
                    margin: '10px 0'
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                filled: {
                    color: '#138016',
                    fontSize: '1.2rem',
                    '&.Mui-focused': {
                        color: '#138016',
                    },
                },
            },
        },
    },
});

export default TextFieldTheme;