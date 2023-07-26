import {createTheme} from "@mui/material/styles";

export const  NavBarTheme = createTheme({
    palette: {
        primary: {
            main: '#283b48', // this will be the color of your AppBar
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: '0px 5px 15px 3px rgba(255, 255, 255, 0.3)',
                },
            },
        },
    },
});