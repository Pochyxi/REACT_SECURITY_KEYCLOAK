import './NewPlayerCardFormStyle.css'
import {Card, CardContent, TextField, ThemeProvider} from "@mui/material";
import {Formik} from "formik";
import {FC} from "react";
import {AppDispatch, RootState} from "../../../redux/store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {POST_SET_CARDS} from "../../../redux/actions/teamsActions.ts";
import {useKeycloak} from "@react-keycloak/web";
import {Col, Row} from "react-bootstrap";
import {newPlayerCardFormTheme} from "./NewPlayerCardFormStyle.ts";
import Button from "@mui/material/Button";
import {useParams} from "react-router-dom";

interface NewPlayerCardFormProps {
    teamsId: string | "",
    setNewPlayerCardFormFlag: (open: boolean) => void
}

interface ValuesPlayerFormProps {
    name: string | "",
    surname: string | ""
}

const NewPlayerCardForm: FC<NewPlayerCardFormProps> = (props: NewPlayerCardFormProps) => {
    const dispatch: AppDispatch = useDispatch();
    const params = useParams<{ teamId: string }>();
    const {keycloak} = useKeycloak();
    const user = useSelector((state: RootState) => state.STORE1.user);


    const POST_Player = (values: ValuesPlayerFormProps) => {

        if(!params.teamId) return;

        const playerRequest = {
            "teamsId": parseInt(params.teamId),
            "name": values.name,
            "surname": values.surname,
            "accountEmail": user.email,
        }

        dispatch(POST_SET_CARDS(keycloak.token as string, user.xsrfToken, playerRequest))
    }


    return (
        <Card id={'dvlpz_new_player_card_form_card'} sx={{width: '100%'}}>
            <CardContent>
                <Formik
                    initialValues={{
                        "name": "",
                        "surname": ""
                    }}
                    validate={values => {
                        const errors: {
                            "name"?: string | "",
                            "surname"?: string | ""
                        } = {}

                        if (!values["name"]) {
                            errors["name"] = 'Required';
                        }
                        if (!values["surname"]) {
                            errors["surname"] = 'Required';
                        }

                        return errors;
                    }}
                    onSubmit={
                        (values, {setSubmitting}) => {
                            console.log(values)
                            POST_Player(values);
                            values["name"] = "";
                            values["surname"] = "";
                            setSubmitting(false);
                            props.setNewPlayerCardFormFlag(false);
                        }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Row className={'flex-column'}>
                                <Col>
                                    <ThemeProvider theme={newPlayerCardFormTheme}>
                                        <TextField
                                            sx={{width: '100%'}}
                                            type="text"
                                            variant={"filled"}
                                            label="Nome"
                                            name="name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values["name"]}
                                        />
                                    </ThemeProvider>
                                </Col>
                                {errors["name"] && touched["name"] && errors["name"]}
                                <Col>
                                    <ThemeProvider theme={newPlayerCardFormTheme}>
                                        <TextField
                                            sx={{width: '100%'}}
                                            type="text"
                                            variant={"filled"}
                                            label="Cognome"
                                            name="surname"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values["surname"]}
                                        />
                                    </ThemeProvider>
                                </Col>
                                {errors["surname"] && touched["surname"] && errors["surname"]}
                                <Col className={'mt-2'}>
                                    <Button
                                        id={'dvlpz_new_player_card_form_button'}
                                        type="submit"
                                        variant="contained"
                                        color="success"
                                        disabled={isSubmitting}>
                                        CREA
                                    </Button>
                                </Col>
                            </Row>
                        </form>
                    )}

                </Formik>
            </CardContent>
        </Card>
    );
};

export default NewPlayerCardForm;