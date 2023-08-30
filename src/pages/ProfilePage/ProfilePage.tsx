import {Col, Container} from "react-bootstrap";
import UserCard from "../../components/UserCard/UserCard.tsx";
import './style.css'
import {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store/store.ts";
import SmartBar from "../../components/SmartBar/SmartBar.tsx";
import {useKeycloak} from "@react-keycloak/web";
import BlockPage from "../../components/BlockPage.tsx";
import SmartFloor from "../../components/SmartFloor/SmartFloor.tsx";

const ProfilePage = () => {
    const user = useSelector((state: RootState) => state.STORE1.user);
    const [modifyUser, setModifyUser] = useState<boolean>(false);
    const {keycloak} = useKeycloak();
    const [blockFlag, setBlockFlag] = useState<boolean>(false);

    useEffect(() => {
        if (!user.email && !keycloak.authenticated) {
            setBlockFlag(false);
        } else {
            setBlockFlag(true);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.email, keycloak.authenticated])

    // Ritorniamo il nostro JSX. Se un account esiste mostreremo una cosa, altrimenti un'altra
    return (
        <Container fluid>
            {
                blockFlag ? (
                    <>
                        <SmartBar modifyUser={modifyUser} setModifyUser={setModifyUser} />
                            <SmartFloor>
                                    <Col xs={12} className={'d-flex justify-content-center'}>
                                        <UserCard modifyUser={modifyUser} setModifyUser={setModifyUser}/>
                                    </Col>
                            </SmartFloor>
                    </>
                    ) : (
                        <BlockPage />
                )
            }

        </Container>
    );
};

export default ProfilePage;