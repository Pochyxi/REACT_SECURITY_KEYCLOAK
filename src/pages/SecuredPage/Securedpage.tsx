import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store/store.ts";
import {setUser, setUserDetails} from "../../redux/actions/UserActions.ts";
import {getUserDetails} from "../../api/userApi.ts";


const Secured = () => {

    const user = useSelector((state: RootState) => state.STORE1.user);
    const dispatch = useDispatch();

    const [accountsExists, setAccountsExists] = useState(false);

    useEffect(() => {
        if (!user.token) return;
        
        getUserDetails(user.email, user.token)
            .then(function (response) {
                if (response) {
                    setAccountsExists(true)

                    dispatch(setUser({
                        ...user,
                        xsrfToken: response.headers['x-xsrf-token']
                    }))
                    console.log(response.data);
                    dispatch(setUserDetails(response.data[0]))
                } else {
                    setAccountsExists(false)
                }

            })

    }, [user.token]);

    return (
        accountsExists ? (
            <div>
                <h1 className="text-center text-4xl">PAGINA UTENTE</h1>
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