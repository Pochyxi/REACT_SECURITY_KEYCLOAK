import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav/Nav.tsx";
import WelcomePage from "./pages/Homepage";
import SecuredPage from "./pages/Securedpage";

function App() {
    return (
        <div className="App">
            <Nav />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<WelcomePage />} />
                    <Route path="/login" element={<SecuredPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
