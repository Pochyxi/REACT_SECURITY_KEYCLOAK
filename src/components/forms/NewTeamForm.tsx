import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store/store.ts";
import {useKeycloak} from "@react-keycloak/web";
import {Container} from "react-bootstrap";
import {Formik} from "formik";
import {useEffect} from "react";

const NewTeamForm = () => {
    const user = useSelector((state: RootState) => state.STORE1.user);
    const {keycloak} = useKeycloak();
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {

    }, [])


    return (
        <div></div>
    );
};

export default NewTeamForm;