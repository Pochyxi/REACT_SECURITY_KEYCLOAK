import {useEffect, useRef, useState} from 'react';
import Keycloak from "keycloak-js";

const UseAuth = () => {
    const isRun = useRef(false);
    const [isLogin, setIsLogin] = useState(false);
    const [keycloak, setKeycloak] = useState<Keycloak.KeycloakInstance | null>(null);

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
                        window.sessionStorage.setItem('profile', JSON.stringify(profile));
                        window.sessionStorage.setItem('token', client.token as string);
                    });
                }
            });
    }, []);

    const logout = () => {
        if (keycloak) {
            keycloak.logout({redirectUri: 'http://localhost:5173'});
        }
    };

    return { isLogin, logout }
};

export default UseAuth;