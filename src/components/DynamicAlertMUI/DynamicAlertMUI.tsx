import {Snackbar} from "@mui/material";
import {FC} from "react";

interface DynamicAlertMuiProps {
    open: boolean
    handleClose: () => void
    message: string
}

const DynamicAlertMui: FC<DynamicAlertMuiProps> = ({open, message, handleClose}) => {
    return (
        <Snackbar
            anchorOrigin={{ vertical:'top', horizontal:'center' }}
            open={open}
            onClose={handleClose}
            message={message}
            key={'top' + 'center'}
        />
    );
};

export default DynamicAlertMui;