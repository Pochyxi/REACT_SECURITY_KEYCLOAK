import {createTheme} from "@mui/material/styles";

const CardTheme = createTheme({
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#283b48', // Cambia il colore di sfondo
                    color: 'white', // Cambia il colore del testo
                    boxShadow: '-5px -5px 15px 3px rgba(30, 30, 30, 0.5)',
                },
            },
        },
    },
});

export default CardTheme;