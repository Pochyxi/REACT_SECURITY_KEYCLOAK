import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store/store.ts";
import {setUser, setUserDetails} from "../redux/actions/UserActions.ts";
import {getUserDetails} from "../api/userApi.ts";
import {Col, Container, Row} from "react-bootstrap";
import UserDetailsCard from "../components/UserDetailsCard.tsx";


const Secured = () => {
    // useSelector ci permette di accedere allo stato redux, stiamo prendendo user dallo stato
    const user = useSelector((state: RootState) => state.STORE1.user);

    // Usiamo useState per creare una variabile di stato per sapere se un account esiste
    const [accountsExists, setAccountsExists] = useState(false);

    // useDispatch ci permette di spedire azioni allo store redux
    const dispatch = useDispatch();



    // useEffect ci permette di eseguire codice al cambio di alcune dipendenze, in questo caso `user.token`
    useEffect(() => {

        // Funzione asincrona per fare la fetch dei dati dell'utente
        const fetchData = async () => {
            // Se non c'è un token, non facciamo il fetch dei dati
            if (!user.token) return;

            // Chiamiamo la nostra API per ottenere i dettagli dell'utente
            getUserDetails(user.email, user.token).then(function (response) {
                if (response) {
                    // Se la risposta esiste, settiamo accountsExists a true
                    setAccountsExists(true)

                    // Spediamo un'azione per settare i dettagli dell'utente nello stato redux
                    dispatch(setUser({
                        ...user,
                        xsrfToken: response.headers['x-xsrf-token']
                    }))
                    console.log(response.data.body);
                    dispatch(setUserDetails({
                        ...response.data.body,
                        telephoneNumber: response.data.body.telephoneNumber ? response.data.body.telephoneNumber : ""
                    }))
                } else {
                    // Se la risposta non esiste, settiamo accountsExists a false
                    setAccountsExists(false)
                }
            }).catch(function (error) {
                // Se la risposta non esiste, settiamo accountsExists a false
                setAccountsExists(false)
                console.log(error);
            });

        };

        // Eseguiamo la nostra funzione per fare il fetch dei dati
        fetchData().then(r => r);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.token]);


    // Ritorniamo il nostro JSX. Se un account esiste mostreremo una cosa, altrimenti un'altra
    return (
        accountsExists ? (
            <Container fluid>
                <Row>
                    <Col xs={4} className={'d-flex justify-content-center'}>
                        <UserDetailsCard />
                    </Col>
                </Row>
                {/*<button onClick={logout}>Logout</button>*/}
            </Container>
        ) : (
            <>
                <div className="text-center">caricamento...</div>
                {/*<button onClick={logout}>Logout</button>*/}
            </>
        )
    );
};

export default Secured;