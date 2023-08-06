import {Col, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/store/store.ts";
import {useEffect, useState} from "react";
import {DELETE_SET_TEAMS, GET_SET_SINGLE_TEAM} from "../redux/actions/teamsActions.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useKeycloak} from "@react-keycloak/web";
import StandardButtonTheme from "../themes/StandardButtonTheme.ts";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import {ThemeProvider} from "@mui/material/styles";
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import DeleteIcon from '@mui/icons-material/Delete';
import ModifyTeamForm from "../components/forms/ModifyTeamForm.tsx";


const SingleTeamPage = () => {
    const user = useSelector((state: RootState) => state.STORE1.user);
    const singleTeam = useSelector((state: RootState) => state.STORE3.single_team);
    const dispatch: AppDispatch = useDispatch();
    const params = useParams();
    const {keycloak} = useKeycloak();
    const navigate = useNavigate();
    const [openModifyTeam, setOpenModifyTeam] = useState<boolean>(false);

    useEffect(() => {
        if (!keycloak.authenticated) navigate('/')
        if (keycloak.authenticated && user.email) {
            dispatch(GET_SET_SINGLE_TEAM(params.teamId, user.email, keycloak.token as string))
            console.log(singleTeam)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keycloak.authenticated]);

    const DELETE_Team = () => {
        dispatch(DELETE_SET_TEAMS(user.email, singleTeam.id, keycloak.token as string, user.xsrfToken))
        navigate('/teams')
    }


    return (
        <Container fluid>
            <Row className={'justify-content-end'}>
                <Col xs={6} className={'d-flex justify-content-end'}>
                    <ThemeProvider theme={StandardButtonTheme}>
                        <Button variant="contained" color={'softBlack'} startIcon={
                            openModifyTeam ? <CloseIcon/> :
                                <SettingsApplicationsIcon/>
                        }
                                onClick={() => {setOpenModifyTeam(!openModifyTeam)}}
                        >
                            Modifica
                        </Button>
                    </ThemeProvider>
                    <ThemeProvider theme={StandardButtonTheme}>
                        <Button variant="contained" color={'softBlack'} startIcon={<DeleteIcon/>}
                                onClick={() => {DELETE_Team()}}
                        >
                            Elimina
                        </Button>
                    </ThemeProvider>
                </Col>
            </Row>
            <h1 className={'text-center'}>
                {!openModifyTeam ? singleTeam?.teamName : <ModifyTeamForm id={singleTeam?.id} teamName={singleTeam?.teamName} setOpenModifyTeam={setOpenModifyTeam}/>}
            </h1>
            <Row>
                <Col xs={12} className={'d-flex justify-content-center'}>

                </Col>
            </Row>
        </Container>
    );
};

export default SingleTeamPage;