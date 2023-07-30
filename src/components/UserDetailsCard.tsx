import {Card, CardContent, CircularProgress} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/store/store.ts";
import {Col, Row} from "react-bootstrap";
import Button from "@mui/material/Button";
import {useState} from "react";
import {ThemeProvider} from '@mui/material/styles';
import StandardButtonTheme from "../themes/StandardButtonTheme.ts";
import ModifyUserForm from "./forms/ModifyUserForm.tsx";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CloseIcon from '@mui/icons-material/Close';
import CardTheme from "../themes/CardTheme.ts";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import LoadingButton from "@mui/lab/LoadingButton";
import CircularWhite from "../themes/CircularWhite.ts";
import {baseUrl, fetchDeleteUserDetails} from "../api/userApi.ts";
import {DELETE_SET_ModifyUserDetails} from "../redux/actions/userActions.ts";
import DynamicAlertMUI from "./DynamicAlertMUI.tsx";
import {useKeycloak} from "@react-keycloak/web";


const UserDetailsCard = () => {
    const user = useSelector((state: RootState) => state.STORE1.user);
    const userDetails = useSelector((state: RootState) => state.STORE1.userDetails);
    const [modifyUser, setModifyUser] = useState<boolean>(false);
    const dispatch: AppDispatch = useDispatch();
    const fetchingFlag = useSelector((state: RootState) => state.STORE2.utilitiesVar.fetchingFlag);
    const {keycloak} = useKeycloak();

    const [open, setOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const handleClose = () => {
        setOpen(false);
    };

    const colInfoStyle = {
        color: 'var(--background-primary)',
        fontWeight: 'bold',
        backgroundColor: 'var(--background-main)',
        marginBottom: '15px',
        padding: '10px',
    }

    const fetchDeleteUser = () => {
        dispatch(DELETE_SET_ModifyUserDetails(baseUrl + fetchDeleteUserDetails, user.email, keycloak.token as string, user.xsrfToken))
    }


    return (
        <ThemeProvider theme={CardTheme}>
            {
                    <Card sx={{width: '100%'}}>
                        <DynamicAlertMUI open={open} handleClose={handleClose} message={message} />
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
                                            {modifyUser ? 'Annulla' : 'Modifica'}
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
                                            <Col className={'d-flex justify-content-end'}>
                                                <ThemeProvider theme={StandardButtonTheme}>
                                                    <LoadingButton
                                                        type={"button"}
                                                        onClick={fetchDeleteUser}
                                                        loading={fetchingFlag}
                                                        loadingPosition="center"
                                                        startIcon={<RestartAltIcon/>}
                                                        variant="contained"
                                                        color="softBlack"
                                                        loadingIndicator={
                                                            <ThemeProvider theme={CircularWhite}>
                                                                <CircularProgress color="secondary" size={24}/>
                                                            </ThemeProvider>
                                                        }
                                                    >
                                                        Ripristina
                                                    </LoadingButton>
                                                </ThemeProvider>
                                            </Col>
                                        </>
                                        : <ModifyUserForm
                                            accountEmail={userDetails.accountEmail}
                                            telephoneNumber={userDetails.telephoneNumber}
                                            firstName={userDetails.firstName}
                                            lastName={userDetails.lastName}
                                            setFormFlag={setModifyUser}
                                            setOpen={setOpen}
                                            setMessage={setMessage}
                                        />
                                }
                            </Row>
                        </CardContent>
                    </Card>
            }

        </ThemeProvider>
    );
};

export default UserDetailsCard;