import {createTheme} from "@mui/material/styles";

const  NavBarTheme = createTheme({
    palette: {
        primary: {
            main: '#283b48', // this will be the color of your AppBar
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: '0px 5px 15px 3px rgba(30, 30, 30, 0.5)',
                },
            },
        },
    },
});

export default NavBarTheme;