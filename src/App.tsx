import {BrowserRouter, Route, Routes} from "react-router-dom";
import SecuredPage from "./pages/SecuredPage/Securedpage.tsx";
import NavbarMUI from "./components/Nav/NavbarMUI.tsx";
import Homepage from "./pages/HomePage/Homepage.tsx";


function App() {


    return (
        <BrowserRouter>
            <div className="App">
                <NavbarMUI/>
                <Routes>
                    <Route path="/" element={<Homepage/>}/>
                    <Route path="/secured_page" element={<SecuredPage/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
