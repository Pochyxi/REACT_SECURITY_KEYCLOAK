import {Col, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store/store.ts";
import {useEffect, useState} from "react";
import {DELETE_SET_TEAMS, GET_SET_SINGLE_TEAM} from "../../redux/actions/teamsActions.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useKeycloak} from "@react-keycloak/web";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import DeleteIcon from '@mui/icons-material/Delete';
import ModifyTeamForm from "../../components/FORMS/ModifyTeamForm/ModifyTeamForm.tsx";
import './style.css'
import {Card, CardContent, Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddModeratorIcon from "@mui/icons-material/AddModerator";


const SingleTeamPage = () => {
    const user = useSelector((state: RootState) => state.STORE1.user);
    const singleTeam = useSelector((state: RootState) => state.STORE3.single_team);
    const dispatch: AppDispatch = useDispatch();
    const params = useParams();
    const {keycloak} = useKeycloak();
    const navigate = useNavigate();
    const [openModifyTeam, setOpenModifyTeam] = useState<boolean>(false);

    useEffect(() => {
        if (user.email) {
            dispatch(GET_SET_SINGLE_TEAM(params.teamId, user.email, keycloak.token as string))
            console.log(singleTeam)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keycloak.authenticated]);

    const DELETE_Team = () => {
        if (!singleTeam?.id) return

        dispatch(DELETE_SET_TEAMS(user.email, singleTeam.id, keycloak.token as string, user.xsrfToken))
        navigate('/teams')
    }


    return (
        <Container fluid>
            <Row className={'justify-content-center'}>
                <Col xs={8}>
                    <Card id={'dvlpz-single-team-page-smart-bar'}>
                        <CardContent>
                            <Tooltip title="Nuovo TEAM">
                                <IconButton
                                    // todo: implementare
                                    // color={newTeamFormFlag ? 'success' : 'primary'}
                                    aria-label="add to shopping cart"
                                    // onClick={() => {setNewTeamFormFlag(!newTeamFormFlag)}}
                                >
                                    <AddModeratorIcon />
                                </IconButton>
                            </Tooltip>
                        </CardContent>
                    </Card>
                </Col>
            </Row>
            <Row className={'justify-content-end'}>
                <Col xs={6} className={'d-flex justify-content-end'}>
                        <Button id={'dvlpz_modify_team_button'} variant="contained" color={'success'} startIcon={
                            openModifyTeam ? <CloseIcon/> :
                                <SettingsApplicationsIcon/>
                        }
                                onClick={() => {setOpenModifyTeam(!openModifyTeam)}}
                        >
                            Modifica
                        </Button>
                        <Button id={'dvlpz_delete_team_button'} variant="contained" color={'success'} startIcon={<DeleteIcon/>}
                                onClick={() => {DELETE_Team()}}
                        >
                            Elimina
                        </Button>
                </Col>
            </Row>
            <h1 className={'text-center'}>
                {!openModifyTeam ? singleTeam?.teamName : <ModifyTeamForm id={singleTeam.id} teamName={singleTeam?.teamName} setOpenModifyTeam={setOpenModifyTeam}/>}
            </h1>
            <Row>
                <Col xs={12} className={'d-flex justify-content-center'}>

                </Col>
            </Row>
        </Container>
    );
};

export default SingleTeamPage;