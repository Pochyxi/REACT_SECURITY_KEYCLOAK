import {Col, Container, Row} from "react-bootstrap";
import UserDetailsCard from "../components/UserDetailsCard.tsx";
import {useKeycloak} from "@react-keycloak/web";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {AppDispatch, RootState} from "../redux/store/store.ts";
import {GET_SET_UserDetails} from "../redux/actions/userActions.ts";


const ProfilePage = () => {

    const {keycloak} = useKeycloak();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.STORE1.user);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if (!keycloak.authenticated && !user.token) navigate('/')

        dispatch(GET_SET_UserDetails(user.email, keycloak.token as string))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keycloak.authenticated]);

    // Ritorniamo il nostro JSX. Se un account esiste mostreremo una cosa, altrimenti un'altra
    return (
        <Container fluid>
            <Row>
                <Col xs={12} className={'d-flex justify-content-center'}>
                    <UserDetailsCard />
                </Col>
            </Row>
        </Container>
    );
};

export default ProfilePage;