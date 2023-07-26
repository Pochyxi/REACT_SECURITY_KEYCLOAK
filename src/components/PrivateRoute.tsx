import {useKeycloak} from "@react-keycloak/web";
import {FC, ReactNode} from "react";
import {Alert} from "react-bootstrap";


interface PrivateRouteProps {
    children: ReactNode;
}


const PrivateRoute: FC<PrivateRouteProps> = ({children}) => {
    const {keycloak} = useKeycloak();

    const isLoggedIn = keycloak.authenticated;

    return isLoggedIn ? children : <Alert
        className={'text-center'}
        style={{
            backgroundColor: 'var(--background-alert)',
            color: 'var(--text-alert)',
        }}>
        Non sei autorizzato ad accedere a questa pagina
    </Alert>
};

export default PrivateRoute;