import { BrowserRouter, Route, Routes } from "react-router-dom";
import SecuredPage from "./pages/Securedpage";
import NavbarMUI from "./components/Nav/NavbarMUI.tsx";
import Homepage from "./pages/Homepage";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <NavbarMUI />
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/login" element={<SecuredPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
