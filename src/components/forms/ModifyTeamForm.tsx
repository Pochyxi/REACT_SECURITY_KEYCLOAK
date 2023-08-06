import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store/store.ts";
import {useKeycloak} from "@react-keycloak/web";
import {FC} from "react";
import {PUT_SET_TEAMS} from "../../redux/actions/teamsActions.ts";
import TeamCreation from "../../interfaces/TeamCreation.ts";
import {Formik} from "formik";
import {ThemeProvider} from "@mui/material/styles";
import StandardButtonTheme from "../../themes/StandardButtonTheme.ts";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import CircularWhite from "../../themes/CircularWhite.ts";
import {CircularProgress, TextField} from "@mui/material";
import {Col, Row} from "react-bootstrap";
import TextFieldTheme from "../../themes/TextFieldTheme.ts";

interface ModifyTeamFormProps {
    id: number | ""
    teamName: string | ""
    setOpenModifyTeam: (open: boolean) => void
}

const ModifyTeamForm: FC<ModifyTeamFormProps> = (props) => {
    const user = useSelector((state: RootState) => state.STORE1.user);
    const {keycloak} = useKeycloak();
    const dispatch: AppDispatch = useDispatch();

    const PUT_Team = (values: ModifyTeamFormProps) => {
        const data: TeamCreation = {
            "teamsId": props.id,
            "teamName": values.teamName,
            "ownerEmail": user.email
        }
        dispatch(PUT_SET_TEAMS(keycloak.token as string, user.xsrfToken, data));
        props.setOpenModifyTeam(false);
    }

    const DELETE_Team = () => {

    }

    return (
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
                            <ThemeProvider theme={TextFieldTheme}>
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
                            <ThemeProvider theme={StandardButtonTheme}>
                                <LoadingButton
                                    type={"submit"}
                                    loading={isSubmitting}
                                    loadingPosition="center"
                                    startIcon={<SaveIcon/>}
                                    variant="contained"
                                    color="softBlack"
                                    loadingIndicator={
                                        <ThemeProvider theme={CircularWhite}>
                                            <CircularProgress color="secondary" size={24}/>
                                        </ThemeProvider>
                                    }
                                >
                                    Modifica
                                </LoadingButton>
                            </ThemeProvider>
                        </Col>
                    </Row>
                </form>
            )}
        </Formik>
    );
};

export default ModifyTeamForm;