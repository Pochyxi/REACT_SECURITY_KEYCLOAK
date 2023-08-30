import {Col, Container, Row} from "react-bootstrap";
import NewTeamForm from "../../components/FORMS/NewTeamForm/NewTeamForm.tsx";
import {useEffect, useState} from "react";
import {GET_SET_TEAMS} from "../../redux/actions/teamsActions.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store/store.ts";
import {useKeycloak} from "@react-keycloak/web";
import TeamsCard from "../../components/TeamsCard/TeamsCard.tsx";
import './style.css'

import SmartBar from "../../components/SmartBar/SmartBar.tsx";
import BlockPage from "../../components/BlockPage.tsx";
import SmartFloor from "../../components/SmartFloor/SmartFloor.tsx";

const TeamsPage = () => {

    const user = useSelector((state: RootState) => state.STORE1.user);
    const teams = useSelector((state: RootState) => state.STORE3.teamList);
    const {keycloak} = useKeycloak();
    const dispatch: AppDispatch = useDispatch();
    const [showTeamCardList, setShowTeamCardList] = useState<boolean>(true);
    const [newTeamFormFlag, setNewTeamFormFlag] = useState<boolean>(false);
    const [blockFlag, setBlockFlag] = useState<boolean>(false);

    useEffect(() => {
        if (!user.email && !keycloak.authenticated) {
            setBlockFlag(false);
        } else {
            setBlockFlag(true);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.email, keycloak.authenticated])

    useEffect(() => {
        if (!keycloak.authenticated) return;

        dispatch(GET_SET_TEAMS(user.email, keycloak.token as string));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.email])


    return (
        <Container fluid>
            {
                blockFlag ? (
                    <>
                        <SmartBar showTeamCardList={showTeamCardList}
                                  setShowTeamCardList={setShowTeamCardList}
                                  newTeamFormFlag={newTeamFormFlag}
                                  setNewTeamFormFlag={setNewTeamFormFlag}
                        />
                        {newTeamFormFlag &&
                            <SmartFloor>
                                <Col xs={12}>
                                    <NewTeamForm setNewTeamFormFlag={setNewTeamFormFlag}/>
                                </Col>
                            </SmartFloor>
                        }
                            {showTeamCardList && (
                                <SmartFloor>
                                    {
                                        teams.length > 0 ? (
                                            <Row className={'justify-content-center'}>
                                                {
                                                    teams && (
                                                        teams.map((team, index) => {
                                                                return (
                                                                    <Col key={index} xs={12}
                                                                         className={'d-flex justify-content-center mt-3'}>
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
                                </SmartFloor>
                            )}
                    </>
                ) : (
                    <BlockPage/>
                )
            }
        </Container>
    );
};

export default TeamsPage;