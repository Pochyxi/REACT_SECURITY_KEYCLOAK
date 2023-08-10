import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProfilePage from "./pages/ProfilePage/ProfilePage.tsx";
import Homepage from "./pages/HomePage/HomePage.tsx";
import {ReactKeycloakProvider} from "@react-keycloak/web";
import keycloak from "./keycloak.ts";
import NavbarMUI from "./pages/NavbarMUI/NavbarMUI.tsx";
import {useSelector} from "react-redux";
import {RootState} from "./redux/store/store.ts";
import TeamsPage from "./pages/TeamsPage/TeamsPage.tsx";
import Teams_card_page from "./pages/SingleTeamPage/SingleTeamPage.tsx";
import {Container} from "react-bootstrap";
import SoccerBall from "./components/SoccerBall/SoccerBall.tsx";


function App() {
    const fetchingFlag = useSelector((state: RootState) => state.STORE2.utilitiesVar.fetchingFlag);


    return (
        <ReactKeycloakProvider initOptions={
            {
                pkceMethod: 'S256',
            }
        } authClient={keycloak}>
            <BrowserRouter>
                <div className={fetchingFlag ? 'lampeggiante' : ''} id={'circle'}></div>
                <div  id={'internal_circle'}></div>
                <div className={fetchingFlag ? 'lampeggiante' : ''} id={'middle_line'}></div>
                <div className={fetchingFlag ? 'lampeggiante' : ''} id={'center_circle'}></div>
                <SoccerBall />

                <div className={fetchingFlag ? "App lampeggianteBorderApp" : 'App'}>
                    <div className="App-header">
                            <NavbarMUI/>
                    </div>
                    <Container fluid className="App-body" style={{marginTop: 60}}>
                        <Routes>
                            <Route
                                path="/"
                                element={<Homepage/>}/>
                            <Route
                                path="/profile"
                                element={<ProfilePage/>}/>
                            <Route
                                path="/teams"
                                element={<TeamsPage />}/>

                            <Route
                                path="/teams/team/:teamId"
                                element={<Teams_card_page />}/>
                        </Routes>
                    </Container>
                </div>
            </BrowserRouter>
        </ReactKeycloakProvider>
    );
}

export default App;
