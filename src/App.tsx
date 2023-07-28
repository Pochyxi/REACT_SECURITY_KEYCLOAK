import {BrowserRouter, Route, Routes} from "react-router-dom";
import SecuredPage from "./pages/Securedpage.tsx";
import Homepage from "./pages/Homepage.tsx";
import {ThemeProvider} from '@mui/material/styles';
import {ReactKeycloakProvider} from "@react-keycloak/web";
import keycloak from "./keycloak.ts";
import NavBarTheme from "./themes/NavBarTheme.ts"
import NavbarMUI from "./components/NavbarMUI.tsx";
import LinearProgressMUI from "./components/LinearProgressMUI.tsx";
import {useSelector} from "react-redux";
import {RootState} from "./redux/store/store.ts";


function App() {

    const fetchingFlag = useSelector((state: RootState) => state.STORE2.utilitiesVar.fetchingFlag);

    return (
        <ReactKeycloakProvider initOptions={
            {
                pkceMethod: 'S256',
            }
        } authClient={keycloak}>
            <BrowserRouter>

                <div className="App">
                    <div className="App-header">
                        <ThemeProvider theme={NavBarTheme}>
                            <NavbarMUI/>
                        </ThemeProvider>

                    </div>

                    <div className="progress-div" style={{marginTop: 64}}>
                        {
                            fetchingFlag && <LinearProgressMUI/>
                        }

                    </div>

                    <div className="App-body" style={{marginTop: 100}}>
                        <Routes>
                            <Route
                                path="/"
                                element={<Homepage/>}/>
                            <Route
                                path="/secured_page"
                                element={<SecuredPage/>}
                            />
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        </ReactKeycloakProvider>
    );
}

export default App;
