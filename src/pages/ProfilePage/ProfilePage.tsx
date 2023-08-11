import {Col, Container, Row} from "react-bootstrap";
import UserCard from "../../components/UserCard/UserCard.tsx";
import {Card, CardContent} from "@mui/material";
import './style.css'
import {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store/store.ts";
import {useNavigate,} from "react-router-dom";
import {useKeycloak} from "@react-keycloak/web";
import SmartBar from "../../components/SmartBar/SmartBar.tsx";

const ProfilePage = () => {
    const user = useSelector((state: RootState) => state.STORE1.user);
    const {keycloak} = useKeycloak();
    const navigate = useNavigate();
    const [modifyUser, setModifyUser] = useState<boolean>(false);

    useEffect(() => {
        if (!keycloak.authenticated) return;
        if (!keycloak.authenticated && !user.email) {
            navigate('/');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    // Ritorniamo il nostro JSX. Se un account esiste mostreremo una cosa, altrimenti un'altra
    return (
        <Container fluid>
            <SmartBar modifyUser={modifyUser} setModifyUser={setModifyUser} />
            <Row>
                <Card id={'dvlpz_profile_floor'}>
                    <CardContent>
                        <Col xs={12} className={'d-flex justify-content-center'}>
                            <UserCard modifyUser={modifyUser} setModifyUser={setModifyUser}/>
                        </Col>
                    </CardContent>
                </Card>

            </Row>
        </Container>
    );
};

export default ProfilePage;