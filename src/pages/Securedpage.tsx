import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/store/store.ts";
import {GET_SET_UserDetails} from "../redux/actions/userActions.ts";
import {Col, Container, Row} from "react-bootstrap";
import UserDetailsCard from "../components/UserDetailsCard.tsx";
import CircularProgressMUI from "../components/CircularProgressMUI.tsx";


const Secured = () => {
    // useSelector ci permette di accedere allo stato redux, stiamo prendendo user dallo stato
    const user = useSelector((state: RootState) => state.STORE1.user);

    // useDispatch ci permette di spedire azioni allo store redux
    const dispatch: AppDispatch = useDispatch();


    // useEffect ci permette di eseguire codice al cambio di alcune dipendenze, in questo caso `user.token`
    useEffect(() => {

        // Eseguiamo la nostra funzione per fare il fetch dei dati
        fetchUserDetails().then(r => r);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.token]);

    const fetchUserDetails = async () => {
        // Se non c'è un token, non facciamo il fetch dei dati
        if (!user.token) {
            return;
        }

        dispatch(GET_SET_UserDetails(user.email, user.token))
    };

    // Ritorniamo il nostro JSX. Se un account esiste mostreremo una cosa, altrimenti un'altra
    return (
        <Container fluid>
            <Row>
                {
                    true ? (
                        <Col xs={4} className={'d-flex justify-content-center'}>
                            <UserDetailsCard fetchUserDetails={fetchUserDetails}/>
                        </Col>


                    ) : (
                        <Col xs={12} className={'d-flex justify-content-center'}>
                            <CircularProgressMUI/>
                        </Col>
                    )
                }
            </Row>
        </Container>
    );
};

export default Secured;