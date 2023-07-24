import {useEffect, useRef, useState} from 'react';
import Keycloak from "keycloak-js";
import {useDispatch} from "react-redux";
import {setUser} from "../redux/actions/UserActions.ts";

const UseAuth = () => {
    const isRun = useRef(false);
    const [isLogin, setIsLogin] = useState(false);
    const [keycloak, setKeycloak] = useState<Keycloak.KeycloakInstance | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isRun.current) return;

        isRun.current = true;

         const client = new Keycloak({
            url: 'http://localhost:8180/',
            realm: 'developez-auth',
            clientId: 'developez-client',
        });

        client.init({
            onLoad: 'login-required',
            pkceMethod: 'S256',
            redirectUri: 'http://localhost:5173/login'
        })
            .then((authenticated) => {
                setIsLogin(authenticated);
                setKeycloak(client);

                if (authenticated) {
                    client.loadUserProfile().then((profile) => {

                        dispatch(setUser({
                            email: profile.email,
                            firstName: profile.firstName,
                            lastName: profile.lastName,
                            token: client.token as string,
                            xrsfToken: ""
                        }));
                    });
                }
            });
    }, [dispatch]);

    const logout = () => {
        if (keycloak) {
            keycloak.logout({redirectUri: 'http://localhost:5173'});
            dispatch(setUser({
                email: "",
                firstName: "",
                lastName: "",
                token: "",
                xrsfToken: ""
            }))
        }
    };

    return { isLogin, logout }
};

export default UseAuth;