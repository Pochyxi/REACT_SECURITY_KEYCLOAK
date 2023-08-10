import {Col, Container, Row} from "react-bootstrap";
import NewTeamForm from "../../components/FORMS/NewTeamForm/NewTeamForm.tsx";
import {useEffect, useState} from "react";
import {GET_SET_TEAMS} from "../../redux/actions/teamsActions.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store/store.ts";
import {useKeycloak} from "@react-keycloak/web";
import TeamsCard from "../../components/TeamsCard/TeamsCard.tsx";
import {Card, CardContent, Tooltip} from "@mui/material";
import './style.css'
import IconButton from "@mui/material/IconButton";
import AddModeratorIcon from '@mui/icons-material/AddModerator';

const TeamsPage = () => {

    const user = useSelector((state: RootState) => state.STORE1.user);
    const teams = useSelector((state: RootState) => state.STORE3.teamList);
    const {keycloak} = useKeycloak();
    const dispatch: AppDispatch = useDispatch();
    const [newTeamFormFlag, setNewTeamFormFlag] = useState<boolean>(false);

    useEffect(() => {
        if (!user.email) return

        dispatch(GET_SET_TEAMS(user.email, keycloak.token as string));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.email])


    return (
        <Container fluid>
            <Row className={'justify-content-center'}>
                <Col xs={8}>
                    <Card id={'dvlpz-team-page-smart-bar'}>
                        <CardContent>
                            <Tooltip title="Nuovo TEAM">
                            <IconButton
                                color={newTeamFormFlag ? 'success' : 'primary'}
                                        aria-label="add to shopping cart"
                                        onClick={() => {setNewTeamFormFlag(!newTeamFormFlag)}}
                            >
                                <AddModeratorIcon />
                            </IconButton>
                            </Tooltip>
                        </CardContent>
                    </Card>
                </Col>
            </Row>
            <Row className={'justify-content-center'}>
                <Col xs={12}>
                    {newTeamFormFlag &&
                    <NewTeamForm setNewTeamFormFlag={setNewTeamFormFlag}/>}
                </Col>
            </Row>
            <Row className={'justify-content-center'}>
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
            </Row>
        </Container>
    );
};

export default TeamsPage;