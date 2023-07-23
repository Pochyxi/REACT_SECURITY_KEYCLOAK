import {useEffect} from 'react';
import useAuth from "../hooks/useAuth.tsx";
import axios from "axios";


const Secured = () => {
    const { isLogin, logout } = useAuth();

    useEffect(() => {
        const token = window.sessionStorage.getItem('token');
        if (token) {
            const email = JSON.parse(window.sessionStorage.getItem('profile') || '').email;
            axios({
                method: 'get',
                url: `http://localhost:8080/myCards?email=${email}`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(function (response) {
                    console.log(response);
                });
        }
    }, [isLogin]);

    return (
        <div>
            <h1 className="text-black text-4xl">Welcome to the Protected Page.</h1>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Secured;