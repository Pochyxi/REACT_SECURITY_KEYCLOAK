import {Card, CardContent, CircularProgress} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store/store.ts";
import {Col, Row} from "react-bootstrap";
import Button from "@mui/material/Button";
import {FC, useState} from "react";
import {ThemeProvider} from '@mui/material/styles';
import StandardButtonTheme from "../themes/StandardButtonTheme.ts";
import ModifyUserForm from "./forms/ModifyUserForm.tsx";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CloseIcon from '@mui/icons-material/Close';
import CardTheme from "../themes/CardTheme.ts";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import LoadingButton from "@mui/lab/LoadingButton";
import CircularWhite from "../themes/CircularWhite.ts";
import axios from "axios";
import {baseUrl, fetchDeleteUserDetails} from "../api/userApi.ts";
import {setUserDetails} from "../redux/actions/userActions.ts";




interface UserDetailsProps {
    fetchUserDetails: () => Promise<void>;
}


const UserDetailsCard: FC<UserDetailsProps> = ({fetchUserDetails}: UserDetailsProps) => {
    const user = useSelector((state: RootState) => state.STORE1.user);
    const userDetails = useSelector((state: RootState) => state.STORE1.userDetails);
    const [modifyUser, setModifyUser] = useState<boolean>(false);
    const [deletingUser, setDeletingUser] = useState<boolean>(false);
    const dispatch = useDispatch();

    const colInfoStyle = {
        color: 'var(--background-primary)',
        fontWeight: 'bold',
        backgroundColor: 'var(--background-main)',
        marginBottom: '15px',
        padding: '10px',
    }

    const fetchDeleteUser = () => {

        setDeletingUser(true)
        axios({
            url: baseUrl + fetchDeleteUserDetails + "?email=" + user.email,
            method: 'delete',
            headers: {
                "Authorization": "Bearer " + user.token,
                "X-XSRF-TOKEN": user.xsrfToken
            }

        }).then((r) => {

            dispatch(setUserDetails(r.data.body))
            fetchUserDetails()
            setDeletingUser(false)

        }).catch((error) => {

            setDeletingUser(false)
            console.log(error)

        })
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
                                                loading={deletingUser}
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
                                />
                        }
                    </Row>
                </CardContent>
            </Card>
        </ThemeProvider>
    );
};

export default UserDetailsCard;