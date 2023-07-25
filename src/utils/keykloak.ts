import Keycloak from "keycloak-js";
import {User} from "../interfaces/User.ts";
import {setUser} from "../redux/actions/UserActions.ts";

export default class KeycloakRunner {
    private keycloak: Keycloak.KeycloakInstance;
    private user: User;

    constructor() {
        this.keycloak = new Keycloak({
            url: 'http://localhost:8180/',
            realm: 'developez-auth',
            clientId: 'developez-client',
        });

        this.user = {email: "", firstName: "", lastName: "", token: "", xsrfToken: ""}
    }

    public getKeycloakInstance() {
        return this.keycloak;
    }

    public setKeycloakInstance(keycloak: Keycloak.KeycloakInstance) {
        this.keycloak = keycloak;
    }

    public getUserInstance() {
        return this.user;
    }

    public setUserInstance(user: User) {
        this.user = user;
    }

    public initKeycloak() {

        let userMaking:null | User = null;

        this.keycloak.init({
            onLoad: 'login-required',
            pkceMethod: 'S256',
            redirectUri: 'http://localhost:5173/secured_page'
        }).then((authenticated) => {

            if (authenticated) {

                this.keycloak.loadUserProfile().then((profile) => {

                     userMaking = {
                        email: profile.email,
                        firstName: profile.firstName,
                        lastName: profile.lastName,
                        token: this.keycloak.token as string,
                        xsrfToken: ""
                    }

                    this.setUserInstance(userMaking)
                    setUser(userMaking)
                });
            }
        });
    }

    public logoutKeycloak() {
        this.keycloak.logout({redirectUri: 'http://localhost:5173/'});
        return {email: "", firstName: "", lastName: "", token: "", xsrfToken: ""}
    }
}