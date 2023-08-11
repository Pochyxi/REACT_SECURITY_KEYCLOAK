import {Col, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store/store.ts";
import {useEffect, useState} from "react";
import {DELETE_SET_TEAMS, GET_SET_SINGLE_TEAM} from "../../redux/actions/teamsActions.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useKeycloak} from "@react-keycloak/web";
import ModifyTeamForm from "../../components/FORMS/ModifyTeamForm/ModifyTeamForm.tsx";
import './style.css'
import {Card, CardContent} from "@mui/material";
import SmartBar from "../../components/SmartBar/SmartBar.tsx";

const SingleTeamPage = () => {
    const user = useSelector((state: RootState) => state.STORE1.user);
    const singleTeam = useSelector((state: RootState) => state.STORE3.single_team);
    const dispatch: AppDispatch = useDispatch();
    const params = useParams();
    const {keycloak} = useKeycloak();
    const navigate = useNavigate();
    const [openModifyTeam, setOpenModifyTeam] = useState<boolean>(false);

    useEffect(() => {
        if (!keycloak.authenticated) return;
        if (!keycloak.authenticated && !user.email) {
            navigate('/');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    useEffect(() => {
        if (!keycloak.authenticated) return;
        if (!user.email && !keycloak.authenticated) {
            navigate('/')
            return;
        }

        dispatch(GET_SET_SINGLE_TEAM(params.teamId, user.email, keycloak.token as string))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.email])

    const DELETE_Team = () => {
        if (!singleTeam?.id) return

        dispatch(DELETE_SET_TEAMS(user.email, singleTeam.id, keycloak.token as string, user.xsrfToken))
        navigate('/teams')
    }


    return (
        <Container fluid>

            <SmartBar openModifyTeam={openModifyTeam}
                      setOpenModifyTeam={setOpenModifyTeam}
                      DELETE_Team={DELETE_Team} />

            <Row>
                {openModifyTeam && <Card id={'dvlpz_modify_team_floor'}>
                    <CardContent>
                        <Row className={'justify-content-center'}>
                            <Col xs={12}>
                                <ModifyTeamForm
                                    id={singleTeam.id}
                                    teamName={singleTeam?.teamName}
                                    setOpenModifyTeam={setOpenModifyTeam}/>
                            </Col>
                        </Row>
                    </CardContent>
                </Card>}
            </Row>
            <Row>
                <Col xs={12} className={'d-flex justify-content-center'}>

                </Col>
            </Row>
        </Container>
    );
};

export default SingleTeamPage;