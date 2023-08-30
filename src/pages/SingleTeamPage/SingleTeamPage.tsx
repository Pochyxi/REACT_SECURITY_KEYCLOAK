import {Col, Container, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store/store.ts";
import {useEffect, useState} from "react";
import {
    DELETE_SET_TEAMS,
    GET_SET_CARDS,
    GET_SET_SINGLE_TEAM
} from "../../redux/actions/teamsActions.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useKeycloak} from "@react-keycloak/web";
import ModifyTeamForm from "../../components/FORMS/ModifyTeamForm/ModifyTeamForm.tsx";
import './style.css'
import SmartBar from "../../components/SmartBar/SmartBar.tsx";
import PlayerCard from "../../components/PlayerCard/PlayerCard.tsx";
import NewPlayerCardForm from "../../components/FORMS/NewPlayerCardForm/NewPlayerCardForm.tsx";
import BlockPage from "../../components/BlockPage.tsx";
import SmartFloor from "../../components/SmartFloor/SmartFloor.tsx";
import {Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import StyleIcon from "@mui/icons-material/Style";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import GroupsIcon from "@mui/icons-material/Groups";

const SingleTeamPage = () => {
    const user = useSelector((state: RootState) => state.STORE1.user);
    const singleTeam = useSelector((state: RootState) => state.STORE3.single_team);
    const cardList = useSelector((state: RootState) => state.STORE3.cardList);
    const dispatch: AppDispatch = useDispatch();
    const params = useParams();
    const {keycloak} = useKeycloak();
    const navigate = useNavigate();
    const [openModifyTeam, setOpenModifyTeam] = useState<boolean>(false);
    const [openCardPlayerList, setOpenCardPlayerList] = useState<boolean>(true);
    const [newCardPlayerFormFlag, setNewCardPlayerFormFlag] = useState<boolean>(false);
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
        if (!keycloak.authenticated || !user.email) return;

        dispatch(GET_SET_SINGLE_TEAM(params.teamId, user.email, keycloak.token as string))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keycloak.authenticated])

    const DELETE_Team = () => {
        if (!singleTeam?.id) return

        dispatch(DELETE_SET_TEAMS(user.email, singleTeam.id, keycloak.token as string, user.xsrfToken))
        navigate('/teams')
    }

    useEffect(() => {
        if (!keycloak.authenticated || !user.email || !params.teamId) return;
        dispatch(GET_SET_CARDS(parseInt(params.teamId), user.email, keycloak.token as string))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keycloak.authenticated, user.email])


    return (
        <Container fluid>
            <SmartBar openModifyTeam={openModifyTeam}
                      setOpenModifyTeam={setOpenModifyTeam}
                      openCardPlayerList={openCardPlayerList}
                      setOpenCardPlayerList={setOpenCardPlayerList}
                      newCardPlayerFormFlag={newCardPlayerFormFlag}
                      setNewCardPlayerFormFlag={setNewCardPlayerFormFlag}
                      DELETE_Team={DELETE_Team}/>
            <SmartFloor>
                <Row>
                    <h4 className={'text-center'}>{singleTeam?.teamName}</h4>
                </Row>
                <Row>
                    <Col className={'d-flex justify-content-center'}>
                        <Tooltip title="Modifica TEAM">
                            <IconButton
                                color={'inherit'}
                                aria-label="Ritorna ai TEAMS"
                                onClick={() => {
                                    navigate('/teams')
                                }}
                            >
                                <GroupsIcon/>
                            </IconButton>
                        </Tooltip>
                    </Col>
                    <Col className={'d-flex justify-content-center'}>
                        <Tooltip title="Mostra Lista Giocatori">
                            <IconButton
                                color={openCardPlayerList ? 'success' : 'primary'}
                                aria-label="Mostra Lista Giocatori"
                                onClick={() => {
                                    setOpenCardPlayerList(!openCardPlayerList)
                                }}
                            >
                                <StyleIcon/>
                            </IconButton>
                        </Tooltip>
                    </Col>
                    <Col className={'d-flex justify-content-center'}>
                        <Tooltip title="Crea Nuovo Giocatore">
                            <IconButton
                                color={newCardPlayerFormFlag ? 'success' : 'primary'}
                                aria-label="Crea Nuovo Giocatore"
                                onClick={() => {
                                    setNewCardPlayerFormFlag(!newCardPlayerFormFlag)
                                }}
                            >
                                <PersonAddAlt1Icon/>
                            </IconButton>
                        </Tooltip>
                    </Col>
                </Row>

            </SmartFloor>

            {
                blockFlag && (
                    <>
                        {
                            openModifyTeam &&
                            <SmartFloor>
                                <Col xs={12}>
                                    <ModifyTeamForm
                                        id={singleTeam?.id}
                                        teamName={singleTeam?.teamName}
                                        setOpenModifyTeam={setOpenModifyTeam}/>
                                </Col>
                            </SmartFloor>
                        }
                        {newCardPlayerFormFlag &&
                            <SmartFloor>
                                <Col xs={12}>
                                    <NewPlayerCardForm teamsId={singleTeam?.id.toString()}
                                                       setNewPlayerCardFormFlag={setNewCardPlayerFormFlag}/>
                                </Col>
                            </SmartFloor>
                        }
                    </>
                )

            }
            {
                blockFlag ? (
                        cardList.length > 0 ? (
                            <>
                                {
                                    openCardPlayerList && (
                                        <SmartFloor>
                                            <Row className={'justify-content-center'}>
                                                {
                                                    cardList.slice().reverse().map((card, index) => {
                                                        return (
                                                            <Col key={index} xs={12} sm={10} md={8} lg={6} xl={4} xxl={3}
                                                                 className={'d-flex justify-content-center mb-3'}>
                                                                <PlayerCard card={card}/>
                                                            </Col>
                                                        )
                                                    })
                                                }
                                            </Row>
                                        </SmartFloor>
                                    )
                                }
                            </>
                        ) : (
                            <Row>
                                <SmartFloor>
                                    <h5 className={'text-center'}>Aggiungi almeno una carta per visualizzare</h5>
                                </SmartFloor>
                            </Row>
                        )
                    ) :
                    (
                        <BlockPage/>
                    )
            }


        </Container>
    )
        ;
};

export default SingleTeamPage;