import {Col, Container, Row} from "react-bootstrap";
import NewTeamForm from "../components/forms/NewTeamForm.tsx";
import {useEffect} from "react";
import {GET_SET_TEAMS} from "../redux/actions/teamsActions.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/store/store.ts";
import {useKeycloak} from "@react-keycloak/web";
import TeamsCard from "../components/TeamsCard.tsx";
import {ThemeProvider} from "@mui/material/styles";
import CardTheme from "../themes/CardTheme.ts";
import {Card, CardContent} from "@mui/material";
import {useNavigate} from "react-router-dom";

const TeamsPage = () => {

    const user = useSelector((state: RootState) => state.STORE1.user);
    const teams = useSelector((state: RootState) => state.STORE3.teamList);
    const {keycloak} = useKeycloak();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!keycloak.authenticated && !user.email) navigate('/')
        if (!user.email) return

        dispatch(GET_SET_TEAMS(user.email, keycloak.token as string));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.email])


    return (
        <Container fluid>
            <Row className={'align-items-center flex-column my-2'}>
                <h1 style={{color: '#A8D8A8'}} className={'text-center'}>Form per la creazione di un nuovo team</h1>
                <Col xs={6}>
                    <ThemeProvider theme={CardTheme}>
                        <Card sx={{width: '100%'}}>
                            <CardContent>
                                <NewTeamForm/>
                            </CardContent>
                        </Card>
                    </ThemeProvider>
                </Col>
            </Row>
            <Row>
                <Row>
                    <h1 style={{color: '#A8D8A8'}}>Lista dei team</h1>
                </Row>
                <Row>
                    {
                        teams && (
                            teams.map((team, index) => {
                                    return (
                                        <Col key={index} xs={6} className={'d-flex justify-content-center mt-3'}>
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