import {Card, CardContent} from "@mui/material";

import {useSelector} from "react-redux";
import {RootState} from "../redux/store/store.ts";
import {Col, Row} from "react-bootstrap";
import {Formik} from "formik";
import {createTheme, ThemeProvider} from "@mui/material/styles";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});


const UserDetailsCard = () => {

    const user = useSelector((state: RootState) => state.STORE1.user);
    const userDetails = useSelector((state: RootState) => state.STORE1.userDetails);


    return (
        <ThemeProvider theme={darkTheme}>
            <Card>
                <CardContent>
                    <Row className={'text-center'}>
                        <Col>
                            <p className={'h4'}>{user.firstName} {user.lastName}</p>
                        </Col>
                    </Row>
                    <Row className={'flex-column'}>
                        <Col>
                            <p className={'h6'}>Email: {user.email}</p>
                        </Col>
                        <Col>
                            <p className={'h6'}>Data iscrizione: {userDetails?.createDt}</p>
                        </Col>
                        <Col>
                            <p className={'h6'}>Telefono: {userDetails.telephoneNumber}</p>
                        </Col>
                        <Formik
                            initialValues={{
                                "accountEmail": "",
                                "firstName": "",
                                "lastName": "",
                                "telephoneNumber": ""
                        }}
                            validate={values => {
                                const errors: {
                                    accountEmail?: string
                                    firstName?: string
                                    lastName?: string
                                    telephoneNumber?: string
                                } = {}

                                if (!values.accountEmail) {
                                    errors.accountEmail = 'Required';
                                }
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
                                        alert(JSON.stringify(values, null, 2));
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
                                    <input
                                        type="text"
                                        name="accountEmail"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.accountEmail}
                                    />
                                    {errors.accountEmail && touched.accountEmail && errors.accountEmail}
                                    <input
                                        type="text"
                                        name="firstName"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.firstName}
                                    />
                                    {errors.firstName && touched.firstName && errors.firstName}
                                    <input
                                        type="text"
                                        name="lastName"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.lastName}
                                    />
                                    {errors.lastName && touched.lastName && errors.lastName}
                                    <input
                                        type="text"
                                        name="telephoneNumber"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.telephoneNumber}
                                    />
                                    {errors.telephoneNumber && touched.telephoneNumber && errors.telephoneNumber}
                                    <button type="submit" disabled={isSubmitting}>
                                        Submit
                                    </button>
                                </form>
                            )}
                        </Formik>

                    </Row>
                </CardContent>
            </Card>
        </ThemeProvider>
    );
};

export default UserDetailsCard;