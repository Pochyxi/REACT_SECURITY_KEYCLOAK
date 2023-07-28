import CircularWhite from "../themes/CircularWhite.ts";
import {CircularProgress} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";

const CircularProgressMUI = () => {
    return (
        <ThemeProvider theme={CircularWhite}>
            <CircularProgress color="secondary" size={40} />
        </ThemeProvider>
    );
};

export default CircularProgressMUI;