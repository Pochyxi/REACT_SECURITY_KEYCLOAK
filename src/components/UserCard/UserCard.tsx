import './style.css'
import {Card, CardContent} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store/store.ts";
import {Col, Row} from "react-bootstrap";
import {FC, useState} from "react";
import ModifyUserForm from "../FORMS/ModifyUserForm/ModifyUserForm.tsx";

import DynamicAlertMUI from "../DynamicAlertMUI/DynamicAlertMUI.tsx";
import {PUT_SET_ModifyUserDetails} from "../../redux/actions/userActions.ts";
import {useKeycloak} from "@react-keycloak/web";
import {UserDetails} from "../../interfaces/UserDetails.ts";
import {accountPath, baseUrl} from "../../api/Api.ts";

interface UserCardProps {
    modifyUser: boolean;
    setModifyUser: (value: boolean) => void;
}

const UserCard: FC<UserCardProps> = ({modifyUser, setModifyUser}) => {
    const {keycloak} = useKeycloak();
    const user = useSelector((state: RootState) => state.STORE1.user);
    const dispatch: AppDispatch = useDispatch();

    const userDetails = useSelector((state: RootState) => state.STORE1.userDetails);

    const [open, setOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const PUT_USER = (values: UserDetails) => {

        dispatch(PUT_SET_ModifyUserDetails(baseUrl + accountPath, values, keycloak.token, user.xsrfToken))

        setMessage("Utente modificato con successo!")
        setOpen(true)
        setModifyUser(false)
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card id={'dvlpz_user_card'} sx={{width: '100%'}}>
            <DynamicAlertMUI open={open} handleClose={handleClose} message={message}/>
            <CardContent>
                <Row className={'flex-column my-2'}>
                    {
                        !modifyUser ?
                            <Row className={'flex-column'}>
                                <Row className={'flex-column mb-3'}>
                                    <Col className={'fw-bolder'}>Nome</Col>
                                    <Col>
                                        <p className={'h5 m-0'}>{userDetails.firstName}</p>
                                    </Col>
                                </Row>

                                <Row className={'flex-column mb-3'}>
                                    <Col className={'fw-bolder'}>Cognome</Col>
                                    <Col>
                                        <p className={'h5 m-0'}>{userDetails.lastName}</p>
                                    </Col>
                                </Row>

                                <Row className={'flex-column mb-3'}>
                                    <Col className={'fw-bolder'}>Email: </Col>
                                    <Col>
                                        <p className={'h6 m-0'}>{userDetails.accountEmail}</p>
                                    </Col>
                                </Row>

                                <Row className={'flex-column mb-3'}>
                                    <Col className={'fw-bolder'}>Data iscrizione</Col>
                                    <Col>
                                        <p className={'h6 m-0'}>{userDetails?.createDt}</p>
                                    </Col>
                                </Row>

                                <Row className={'flex-column mb-3'}>
                                    <Col className={'fw-bolder'}>Telefono</Col>
                                    <Col>
                                        <p className={'h6 m-0'}>{userDetails.telephoneNumber}</p>
                                    </Col>
                                </Row>
                            </Row>
                            : <ModifyUserForm
                                accountEmail={userDetails.accountEmail}
                                telephoneNumber={userDetails.telephoneNumber}
                                firstName={userDetails.firstName}
                                lastName={userDetails.lastName}
                                PUT_USER={PUT_USER}
                            />
                    }
                </Row>
            </CardContent>
        </Card>
    )
};

export default UserCard;