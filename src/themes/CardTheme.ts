import {createTheme} from "@mui/material/styles";

const CardTheme = createTheme({
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#062409',
                    color: 'white',
                    boxShadow: '-5px -5px 15px 3px rgba(30, 30, 30, 0.5)',
                },
            },
        },
    },
});

export default CardTheme;