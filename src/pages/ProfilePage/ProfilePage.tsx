import {Col, Container, Row} from "react-bootstrap";
import UserCard from "../../components/UserCard/UserCard.tsx";
import {Card, CardContent, Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import './style.css'


const ProfilePage = () => {

    // Ritorniamo il nostro JSX. Se un account esiste mostreremo una cosa, altrimenti un'altra
    return (
        <Container fluid>
            <Row className={'justify-content-center'}>
                <Col xs={8}>
                    <Card id={'dvlpz-profile-page-smart-bar'}>
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
            <Row>
                <Col xs={12} className={'d-flex justify-content-center'}>
                    <UserCard />
                </Col>
            </Row>
        </Container>
    );
};

export default ProfilePage;