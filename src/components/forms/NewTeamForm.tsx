import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store/store.ts";
import {useKeycloak} from "@react-keycloak/web";
import {Col, Row} from "react-bootstrap";
import {Formik} from "formik";
import TeamCreation from "../../interfaces/TeamCreation.ts";
import {POST_SET_TEAMS} from "../../redux/actions/teamsActions.ts";
import TextFieldTheme from "../../themes/TextFieldTheme.ts";
import {TextField} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";
import Button from "@mui/material/Button";
import StandardButtonTheme from "../../themes/StandardButtonTheme.ts";

interface NewTeamFormProps {
    teamName: string | ""
}

const NewTeamForm = () => {
    const user = useSelector((state: RootState) => state.STORE1.user);
    const {keycloak} = useKeycloak();
    const dispatch: AppDispatch = useDispatch();


    const POST_Team = (values: NewTeamFormProps) => {
        const teamRequest: TeamCreation = {
            "teamName": values.teamName,
            "ownerEmail": user.email,
        }

        dispatch(POST_SET_TEAMS(keycloak.token as string, user.xsrfToken, teamRequest));
    }


    return (
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
                                <ThemeProvider theme={TextFieldTheme}>
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
                            <Col>
                                <ThemeProvider theme={StandardButtonTheme}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="softBlack"
                                        disabled={isSubmitting}>
                                        CREA
                                    </Button>
                                </ThemeProvider>
                            </Col>
                        </Row>
                    </form>
            )}
        </Formik>
    );
};

export default NewTeamForm;