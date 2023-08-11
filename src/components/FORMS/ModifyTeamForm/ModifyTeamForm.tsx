import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../redux/store/store.ts";
import {useKeycloak} from "@react-keycloak/web";
import {FC} from "react";
import {PUT_SET_TEAMS} from "../../../redux/actions/teamsActions.ts";
import {Formik} from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import {Card, CardContent, CircularProgress, TextField, ThemeProvider} from "@mui/material";
import {Col, Row} from "react-bootstrap";
import TeamModify from "../../../interfaces/TeamModify.ts";
import {modifyTeamFormTheme} from "./style.ts";
import './style.css'

interface ModifyTeamFormProps {
    id: number | ""
    teamName: string | ""
    setOpenModifyTeam: (open: boolean) => void
}

interface ModifyTeamFormValues {
    teamName: string | ""
}

const ModifyTeamForm: FC<ModifyTeamFormProps> = (props) => {
    const user = useSelector((state: RootState) => state.STORE1.user);
    const {keycloak} = useKeycloak();
    const dispatch: AppDispatch = useDispatch();

    const PUT_Team = (values: ModifyTeamFormValues) => {
        const data: TeamModify = {
            "teamsId": props.id,
            "teamName": values.teamName,
            "ownerEmail": user.email
        }
        dispatch(PUT_SET_TEAMS(keycloak.token as string, user.xsrfToken, data));
        props.setOpenModifyTeam(false);
    }

    return (
        <Card id={'dvlpz_modify_team_form_card'} sx={{width: '100%'}}>
            <CardContent>
                <Formik
                    initialValues={{
                        "teamName": props.teamName,
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
                            PUT_Team(values);
                            values["teamName"] = "";
                            setSubmitting(false);
                            props.setOpenModifyTeam(false);
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
                            <Row className={"flex-column"}>
                                <Col>
                                    <ThemeProvider theme={modifyTeamFormTheme}>
                                        <TextField
                                            sx={{width: '100%'}}
                                            type="text"
                                            name="teamName"
                                            label="Nome del Team"
                                            variant={"filled"}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.teamName}
                                        />
                                    </ThemeProvider>
                                    {errors.teamName && touched.teamName && errors.teamName}
                                </Col>
                                <Col className={'mt-2'}>
                                    <LoadingButton
                                        id={'dvlpz_modify_team_form_submit_button'}
                                        type={"submit"}
                                        loading={isSubmitting}
                                        loadingPosition="center"
                                        startIcon={<SaveIcon/>}
                                        variant="contained"
                                        color="success"
                                        loadingIndicator={
                                            <CircularProgress color="secondary" size={24}/>
                                        }
                                    >
                                        Modifica
                                    </LoadingButton>
                                </Col>
                            </Row>
                        </form>
                    )}
                </Formik>
            </CardContent>
        </Card>
    );
};

export default ModifyTeamForm;