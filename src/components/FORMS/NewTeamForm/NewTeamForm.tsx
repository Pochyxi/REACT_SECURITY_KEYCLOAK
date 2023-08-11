import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../redux/store/store.ts";
import {useKeycloak} from "@react-keycloak/web";
import {Col, Row} from "react-bootstrap";
import {Formik} from "formik";
import TeamCreation from "../../../interfaces/TeamCreation.ts";
import {POST_SET_TEAMS} from "../../../redux/actions/teamsActions.ts";
import {Card, CardContent, TextField, ThemeProvider} from "@mui/material";
import Button from "@mui/material/Button";
import './style.css'
import {newTeamFormTheme} from "./style.ts";
import {FC} from "react";

interface ValuesTeamFormProps {
    teamName: string | ""
}

interface NewTeamFormProps {
    setNewTeamFormFlag: (open: boolean) => void
}

const NewTeamForm: FC<NewTeamFormProps> = (props: NewTeamFormProps) => {
    const user = useSelector((state: RootState) => state.STORE1.user);
    const {keycloak} = useKeycloak();
    const dispatch: AppDispatch = useDispatch();


    const POST_Team = (values: ValuesTeamFormProps) => {
        const teamRequest: TeamCreation = {
            "teamName": values.teamName,
            "ownerEmail": user.email,
        }

        dispatch(POST_SET_TEAMS(keycloak.token as string, user.xsrfToken, teamRequest));
    }


    return (
        <Card id={'dvlpz_new_team_form_card'} sx={{width: '100%'}}>
            <CardContent>
                <Formik
                    initialValues={{
                        "teamName": "",
                    }}
                    validate={values => {
                        const errors: {
                            "teamName"?: string | ""
                        } = {}

                        if (!values["teamName"]) {
                            errors["teamName"] = 'Required';
                        }

                        return errors;
                    }}
                    onSubmit={
                        (values, {setSubmitting}) => {
                            console.log(values)
                            POST_Team(values);
                            values["teamName"] = "";
                            setSubmitting(false);
                            props.setNewTeamFormFlag(false);
                        }}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                      }) => (
                        <form onSubmit={handleSubmit}>
                            <Row className={'flex-column'}>
                                <Col>
                                    <ThemeProvider theme={newTeamFormTheme}>
                                        <TextField
                                            sx={{width: '100%'}}
                                            type="text"
                                            variant={"filled"}
                                            label="Nome squadra"
                                            name="teamName"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values["teamName"]}
                                        />
                                    </ThemeProvider>
                                </Col>
                                {errors["teamName"] && touched["teamName"] && errors["teamName"]}
                                <Col className={'mt-2'}>
                                    <Button
                                        id={'dvlpz_new_team_form_button'}
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

export default NewTeamForm;