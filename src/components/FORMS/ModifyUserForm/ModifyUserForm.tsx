import {Formik} from "formik";
import {FC} from "react";
import {UserDetails} from "../../../interfaces/UserDetails.ts";
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import {CircularProgress, TextField, ThemeProvider} from "@mui/material";
import {Col, Row} from "react-bootstrap";
import {modifyUserFormTheme} from "./style.ts";
import './style.css'

interface ModifyUserFormProps {
    accountEmail: string | ""
    firstName: string | ""
    lastName: string | ""
    telephoneNumber: string | ""
    PUT_USER: (values: UserDetails) => void
}


const ModifyUserForm: FC<ModifyUserFormProps> = (props: ModifyUserFormProps) => {


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
                            props.PUT_USER({
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
                                <ThemeProvider theme={modifyUserFormTheme}>
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
                                <ThemeProvider theme={modifyUserFormTheme}>
                                    <TextField
                                        id={'dvlpz_user_card_last_name'}
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
                                <ThemeProvider theme={modifyUserFormTheme}>
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
                                    <LoadingButton
                                        type={"submit"}
                                        loading={isSubmitting}
                                        loadingPosition="center"
                                        startIcon={<SaveIcon/>}
                                        variant="contained"
                                        color={"primary"}
                                        id={'dvlpz_user_card_save_button'}
                                        loadingIndicator={
                                                <CircularProgress color="secondary" size={24}/>
                                        }
                                    >
                                        Salva
                                    </LoadingButton>
                            </Col>
                        </Row>
                    </form>
                )}
            </Formik>
        );
    }
;

export default ModifyUserForm;