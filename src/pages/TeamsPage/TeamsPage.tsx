import {Col, Container, Row} from "react-bootstrap";
import NewTeamForm from "../../components/FORMS/NewTeamForm/NewTeamForm.tsx";
import {useEffect, useState} from "react";
import {GET_SET_TEAMS} from "../../redux/actions/teamsActions.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store/store.ts";
import {useKeycloak} from "@react-keycloak/web";
import TeamsCard from "../../components/TeamsCard/TeamsCard.tsx";
import {Card, CardContent} from "@mui/material";
import './style.css'

import {useNavigate} from "react-router-dom";

import SmartBar from "../../components/SmartBar/SmartBar.tsx";

const TeamsPage = () => {

    const user = useSelector((state: RootState) => state.STORE1.user);
    const teams = useSelector((state: RootState) => state.STORE3.teamList);
    const {keycloak} = useKeycloak();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const [showTeamCardList, setShowTeamCardList] = useState<boolean>(true);
    const [newTeamFormFlag, setNewTeamFormFlag] = useState<boolean>(false);

    useEffect(() => {
        if (!keycloak.authenticated) return;
        if (!keycloak.authenticated && !user.email) {
            navigate('/');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    useEffect(() => {
        if (!keycloak.authenticated) return;

        dispatch(GET_SET_TEAMS(user.email, keycloak.token as string));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.email])


    return (
        <Container fluid>
            <SmartBar showTeamCardList={showTeamCardList}
                      setShowTeamCardList={setShowTeamCardList}
                      newTeamFormFlag={newTeamFormFlag}
                      setNewTeamFormFlag={setNewTeamFormFlag}
            />
            <Row>
                {newTeamFormFlag &&
                    <Card id={'dvlpz_new_team_card_floor'}>
                        <CardContent>
                            <Row className={'justify-content-center'}>
                                <Col xs={12}>
                                    <NewTeamForm setNewTeamFormFlag={setNewTeamFormFlag}/>
                                </Col>
                            </Row>
                        </CardContent>
                    </Card>
                }
            </Row>
            <Row className={'justify-content-center'}>
                {showTeamCardList && (
                    <Card id={'dvlpz_team_card_floor'} sx={{width: '100%'}}>
                        <CardContent>
                            {
                                teams.length > 0 ? (
                                    <Row className={'justify-content-center'}>
                                        {
                                            teams && (
                                                teams.map((team, index) => {
                                                        return (
                                                            <Col key={index} xs={12} className={'d-flex justify-content-center mt-3'}>
                                                                <TeamsCard teams={team}/>
                                                            </Col>
                                                        )
                                                    }
                                                )
                                            )
                                        }
                                    </Row>
                                ) : (
                                    <Row className={'justify-content-center'}>
                                        <Col xs={12} className={'d-flex justify-content-center mt-3'}>
                                            <h3>Crea un TEAM per visualizzarlo</h3>
                                        </Col>
                                    </Row>
                                )
                            }
                        </CardContent>
                    </Card>
                )}

            </Row>
        </Container>
    );
};

export default TeamsPage;