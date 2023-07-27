import {Card, CardContent} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store/store.ts";
import {Col, Row} from "react-bootstrap";
import Button from "@mui/material/Button";
import {useState} from "react";
import {ThemeProvider} from '@mui/material/styles';
import StandardButtonTheme from "../themes/StandardButtonTheme.ts";
import ModifyUserForm from "./forms/ModifyUserForm.tsx";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CloseIcon from '@mui/icons-material/Close';
import CardTheme from "../themes/CardTheme.ts";


// Augment the palette to include a violet color
declare module '@mui/material/styles' {
    interface Palette {
        violet: Palette['primary'];
    }

    interface PaletteOptions {
        violet?: PaletteOptions['primary'];
    }
}

// Update the Button's color options to include a violet option
declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        violet: true;
    }
}


const UserDetailsCard = () => {

    const userDetails = useSelector((state: RootState) => state.STORE1.userDetails);
    const [modifyUser, setModifyUser] = useState<boolean>(false);
    const colInfoStyle = {
        color: 'var(--background-primary)',
        fontWeight: 'bold',
        backgroundColor: 'var(--background-main)',
        marginBottom: '15px',
        padding: '10px',
    }


    return (
        <ThemeProvider theme={CardTheme}>
            <Card>
                <CardContent>
                    <Row>
                        <Col className={'d-flex justify-content-start'}>
                            <ThemeProvider theme={StandardButtonTheme}>
                                <Button variant="contained" color={'softBlack'} startIcon={
                                    modifyUser ? <CloseIcon/> :
                                    <ManageAccountsIcon/>
                                }
                                        onClick={() => setModifyUser(!modifyUser)}
                                >
                                    { modifyUser ? 'Annulla' : 'Modifica' }
                                </Button>
                            </ThemeProvider>
                        </Col>
                    </Row>
                    <Row className={'flex-column my-2'}>
                    {
                        !modifyUser ?
                            <>
                                <Col style={{color: 'var(--highlight)'}}>Nome</Col>
                                <Col style={colInfoStyle}>
                                    <p className={'h5 m-0'}>{userDetails.firstName}</p>
                                </Col>

                                <Col style={{color: 'var(--highlight)'}}>Cognome</Col>
                                <Col style={colInfoStyle}>
                                    <p className={'h5 m-0'}>{userDetails.lastName}</p>
                                </Col>

                                <Col style={{color: 'var(--highlight)'}}>Email: </Col>
                                <Col style={colInfoStyle}>
                                    <p className={'h6 m-0'}>{userDetails.accountEmail}</p>
                                </Col>

                                <Col style={{color: 'var(--highlight)'}}>Data iscrizione</Col>
                                <Col style={colInfoStyle}>
                                    <p className={'h6 m-0'}>{userDetails?.createDt}</p>
                                </Col>

                                <Col style={{color: 'var(--highlight)'}}>Telefono</Col>
                                <Col style={colInfoStyle}>
                                    <p className={'h6 m-0'}>{userDetails.telephoneNumber}</p>
                                </Col>
                                <Col>

                                </Col>
                            </>
                         : <ModifyUserForm
                            accountEmail={userDetails.accountEmail}
                            telephoneNumber={userDetails.telephoneNumber}
                            firstName={userDetails.firstName}
                            lastName={userDetails.lastName}
                            setFormFlag={setModifyUser}
                        />
                    }
                    </Row>
                </CardContent>
            </Card>
        </ThemeProvider>
    );
};

export default UserDetailsCard;