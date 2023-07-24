import {useEffect, useState} from 'react';
// import useAuth from "../hooks/useAuth.tsx";
import axios from "axios";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store/store.ts";


const  Secured = () => {
    // const { logout } = useAuth();

    const user = useSelector((state: RootState) => state.STORE1.user);

    const [accountsExists, setAccountsExists] = useState(false);

    useEffect(() => {

        if (user.token) {

            axios({
                method: 'get',
                url: `http://localhost:8080/myAccount?email=${user.email}`,
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
                .then(function (response) {
                    if (response) {
                        setAccountsExists(true)
                        console.log(response);
                    } else {
                        setAccountsExists(false)
                    }

                });
        }
    }, [user.email, user.token]);

    return (
            accountsExists ? (
                <div>
                    <h1 className="text-black text-4xl">Welcome to the Protected Page.</h1>
                    {/*<button onClick={logout}>Logout</button>*/}
                </div>
            ) : (
                <>
                    <div className="text-center">Nessun account disponibile</div>
                    {/*<button onClick={logout}>Logout</button>*/}
                </>
            )
    );
};

export default Secured;