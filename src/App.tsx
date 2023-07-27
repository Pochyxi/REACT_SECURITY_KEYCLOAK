import {BrowserRouter, Route, Routes} from "react-router-dom";
import SecuredPage from "./pages/Securedpage.tsx";
import Homepage from "./pages/Homepage.tsx";
import {ThemeProvider} from '@mui/material/styles';
import {ReactKeycloakProvider} from "@react-keycloak/web";
import keycloak from "./keycloak.ts";
import NavBarTheme from "./themes/NavBarTheme.ts"
import NavbarMUI from "./components/NavbarMUI.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";


function App() {


    return (
        <ReactKeycloakProvider initOptions={
            {
                pkceMethod: 'S256',
            }
        } authClient={keycloak}>
            <BrowserRouter>
                <div className="App">
                    <ThemeProvider theme={NavBarTheme}>
                        <NavbarMUI/>
                    </ThemeProvider>

                    <Routes>
                        <Route path="/" element={<Homepage/>}/>
                        <Route
                            path="/secured_page"
                            element={
                                <PrivateRoute>
                                    <SecuredPage/>
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </ReactKeycloakProvider>
    );
}

export default App;
