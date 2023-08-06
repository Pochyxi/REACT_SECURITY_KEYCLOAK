import {Formik} from "formik";
import {FC} from "react";
import {UserDetails} from "../../interfaces/UserDetails.ts";
import {accountPath, baseUrl} from "../../api/Api.ts";
import {AppDispatch, RootState} from "../../redux/store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {PUT_SET_ModifyUserDetails} from "../../redux/actions/userActions.ts";
import LoadingButton from '@mui/lab/LoadingButton';
import StandardButtonTheme from "../../themes/StandardButtonTheme.ts";
import {ThemeProvider} from "@mui/material/styles";
import SaveIcon from '@mui/icons-material/Save';
import {CircularProgress, TextField} from "@mui/material";
import {Col, Row} from "react-bootstrap";
import TextFieldTheme from "../../themes/TextFieldTheme.ts";
import CircularWhite from "../../themes/CircularWhite.ts";
import {useKeycloak} from "@react-keycloak/web";

interface ModifyUserFormProps {
    accountEmail: string | ""
    firstName: string | ""
    lastName: string | ""
    telephoneNumber: string | ""
    setFormFlag: (flag: boolean) => void
    setOpen: (flag: boolean) => void
    setMessage: (message: string) => void
}


const ModifyUserForm: FC<ModifyUserFormProps> = (props: ModifyUserFormProps) => {

        const user = useSelector((state: RootState) => state.STORE1.user);
        const {keycloak} = useKeycloak();
        const dispatch: AppDispatch = useDispatch();

        const modify = (values: UserDetails) => {

            dispatch(PUT_SET_ModifyUserDetails(baseUrl + accountPath, values, keycloak.token, user.xsrfToken))

            props.setMessage("Utente modificato con successo!")
            props.setOpen(true)
            props.setFormFlag(false)
        }


        return (
            <Formik
                initialValues={{
                    "firstName": props.firstName,
                    "lastName": props.lastName,
                    "telephoneNumber": props.telephoneNumber
                }}
                validate={values => {
                    const errors: {
                        firstName?: string | ""
                        lastName?: string | ""
                        telephoneNumber?: string | ""
                    } = {}

                    if (!values.firstName) {
                        errors.firstName = 'Required';
                    }
                    if (!values.lastName) {
                        errors.lastName = 'Required';
                    }
                    if (!values.telephoneNumber) {
                        errors.telephoneNumber = 'Required';
                    }

                    return errors;
                }}
                onSubmit={
                    (values, {setSubmitting}) => {
                        setTimeout(() => {
                            modify({
                                "accountEmail": props.accountEmail,
                                "firstName": values.firstName,
                                "lastName": values.lastName,
                                "telephoneNumber": values.telephoneNumber
                            })
                            setSubmitting(false);
                        }, 400);
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
                      /* and other goodies */
                  }) => (
                    <form onSubmit={handleSubmit}>

                        <Row className={'flex-column'}>
                            <Col>
                                <ThemeProvider theme={TextFieldTheme}>
                                    <TextField
                                        sx={{width: '100%'}}
                                        type="text"
                                        name="firstName"
                                        label={'Nome'}
                                        variant="filled"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.firstName}
                                    />
                                </ThemeProvider>
                                {errors.firstName && touched.firstName && errors.firstName}
                            </Col>
                            <Col>
                                <ThemeProvider theme={TextFieldTheme}>
                                    <TextField
                                        sx={{width: '100%'}}
                                        type="text"
                                        name="lastName"
                                        variant="filled"
                                        label={'Cognome'}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.lastName}
                                    />
                                </ThemeProvider>
                                {errors.lastName && touched.lastName && errors.lastName}
                            </Col>
                            <Col>
                                <ThemeProvider theme={TextFieldTheme}>
                                    <TextField
                                        sx={{width: '100%'}}
                                        type="text"
                                        name="telephoneNumber"
                                        variant="filled"
                                        label={'Numero di telefono'}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.telephoneNumber}
                                    />
                                </ThemeProvider>
                                {errors.telephoneNumber && touched.telephoneNumber && errors.telephoneNumber}
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
                                        Salva
                                    </LoadingButton>
                                </ThemeProvider>
                            </Col>
                        </Row>
                    </form>
                )}
            </Formik>
        );
    }
;

export default ModifyUserForm;