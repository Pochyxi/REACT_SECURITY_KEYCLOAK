import {Card, CardContent, CircularProgress, TextField, ThemeProvider} from "@mui/material";
import './modifyCardPlayerFormStyle.css'
import {Formik} from "formik";
import {FC} from "react";
import CardPlayer from "../../../interfaces/CardPlayer.ts";
import {AppDispatch, RootState} from "../../../redux/store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {PUT_SET_CARDS, PUT_SKILLS_STATISTICS} from "../../../redux/actions/teamsActions.ts";
import {useKeycloak} from "@react-keycloak/web";
import CardPlayerModify from "../../../interfaces/CardPlayerModify.ts";
import {Col, Row} from "react-bootstrap";
import {modifyCardPlayerFormTheme} from "./ModifyCardPlayerFormStyle.ts";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import {useParams} from "react-router-dom";

interface FormikValues {
    name?: string | ""
    surname?: string | ""
    email?: string | ""
}

interface FormikValues2 {
    velocity?: number
    shoot?: number
    pass?: number
    dribbling?: number
    defence?: number
    physical?: number
}


interface ModifyCardPlayerFormProps {
    card: CardPlayer | null
    setModifyCardPlayer: (value: boolean) => void
}

const ModifyCardPlayerForm: FC<ModifyCardPlayerFormProps> = (props) => {
    const {card} = props
    const {setModifyCardPlayer} = props
    const user = useSelector((state: RootState) => state.STORE1.user);
    const {keycloak} = useKeycloak();
    const dispatch: AppDispatch = useDispatch()
    const params = useParams<{ teamId: string }>();


    const PUT_CARD_PLAYER = (values: FormikValues) => {
        if (!card) return
        if (!card.skillsStatistics) return
        if (!values || !values.name || !values.surname || !values.email) return


        const cardPlayerSend: CardPlayerModify = {
            cardId: card.id,
            name: values.name,
            surname: values.surname,
            accountEmail: values.email,
            skillStatisticsId: card.skillsStatistics?.id.toString()
        }

        dispatch(PUT_SET_CARDS(keycloak.token as string, user.xsrfToken, cardPlayerSend))
        setModifyCardPlayer(false)
    }

    const PUT_STATISTICS_PLAYER = (values: FormikValues2) => {
        if (!card) return
        if (!card.skillsStatistics) return
        if (!values || !values.velocity || !values.shoot || !values.pass || !values.dribbling || !values.defence || !values.physical) return
        if (!params.teamId) return

        const newStatistics = {
            id: card.skillsStatistics.id,
            controlEmail: user.email,
            velocity: values.velocity,
            shoot: values.shoot,
            pass: values.pass,
            dribbling: values.dribbling,
            defence: values.defence,
            physical: values.physical
        }

        console.log(newStatistics)

        dispatch(PUT_SKILLS_STATISTICS(keycloak.token as string, user.xsrfToken, newStatistics, parseInt(params.teamId), user.email))
        setModifyCardPlayer(false)
    }

    console.log(card)

    return (
        <Card id={'dvlpz_modify_player_card'} sx={{width: '100%'}}>
            <CardContent>
                <Formik
                    initialValues={{
                        name: card?.name,
                        surname: card?.surname,
                        email: card?.accountEmail
                    }}
                    validate={values => {
                        const errors: {
                            name?: string | ""
                            surname?: string | ""
                            email?: string | ""
                        } = {}

                        if (!values.name) {
                            errors.name = 'Required';
                        }
                        if (!values.surname) {
                            errors.surname = 'Required';
                        }

                        if (!values.email) {
                            errors.email = 'Required';
                        }

                        return errors;
                    }}
                    onSubmit={
                        (values, {setSubmitting}) => {
                            PUT_CARD_PLAYER(values)
                            setSubmitting(false);
                        }
                    }>
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
                                    <ThemeProvider theme={modifyCardPlayerFormTheme}>
                                        <TextField
                                            sx={{width: '100%'}}
                                            type="text"
                                            name="name"
                                            label={'Nome'}
                                            variant="filled"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name}
                                        />
                                    </ThemeProvider>
                                    {errors.name && touched.name && errors.name}
                                </Col>
                                <Col>
                                    <ThemeProvider theme={modifyCardPlayerFormTheme}>
                                        <TextField
                                            sx={{width: '100%'}}
                                            type="text"
                                            name="surname"
                                            label={'Cognome'}
                                            variant="filled"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.surname}
                                        />
                                    </ThemeProvider>
                                    {errors.surname && touched.surname && errors.surname}
                                </Col>
                                <Col>
                                    <ThemeProvider theme={modifyCardPlayerFormTheme}>
                                        <TextField
                                            sx={{width: '100%'}}
                                            type="text"
                                            name="email"
                                            label={'Possessore'}
                                            variant="filled"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                        />
                                    </ThemeProvider>
                                    {errors.email && touched.email && errors.email}
                                </Col>
                                <Col className={'mt-2'}>
                                    <LoadingButton
                                        type={"submit"}
                                        loading={isSubmitting}
                                        loadingPosition="center"
                                        startIcon={<SaveIcon/>}
                                        variant="contained"
                                        color={"primary"}
                                        id={'dvlpz_modify_player_card_button'}
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

                <Formik
                    initialValues={{
                        velocity: card?.skillsStatistics.velocity,
                        shoot: card?.skillsStatistics.shoot,
                        pass: card?.skillsStatistics.pass,
                        dribbling: card?.skillsStatistics.dribbling,
                        defence: card?.skillsStatistics.defence,
                        physical: card?.skillsStatistics.physical
                    }}
                    validate={values => {
                        const errors: {
                            velocity?: string | ""
                            shoot?: string | ""
                            pass?: string | ""
                            dribbling?: string | ""
                            defence?: string | ""
                            physical?: string | ""
                        } = {}

                        if (!values.velocity) {
                            errors.velocity = 'Required';
                        } else if (values.velocity < 30 || values.velocity > 99) {
                            errors.velocity = 'Valore non valido';
                        }

                        if (!values.shoot) {
                            errors.shoot = 'Required';
                        } else if (values.shoot < 30 || values.shoot > 99) {
                            errors.velocity = 'Valore non valido';
                        }

                        if (!values.pass) {
                            errors.pass = 'Required';
                        } else if (values.pass < 30 || values.pass > 99) {
                            errors.velocity = 'Valore non valido';
                        }

                        if (!values.dribbling) {
                            errors.dribbling = 'Required';
                        } else if (values.dribbling < 30 || values.dribbling > 99) {
                            errors.velocity = 'Valore non valido';
                        }

                        if (!values.defence) {
                            errors.defence = 'Required';
                        } else if (values.defence < 30 || values.defence > 99) {
                            errors.velocity = 'Valore non valido';
                        }

                        if (!values.physical) {
                            errors.physical = 'Required';
                        } else if (values.physical < 30 || values.physical > 99) {
                            errors.velocity = 'Valore non valido';
                        }

                        return errors;
                    }}
                    onSubmit={
                        (values, {setSubmitting}) => {
                            console.log(values)
                            PUT_STATISTICS_PLAYER(values)
                            setSubmitting(false);
                        }
                    }>
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
                                    <ThemeProvider theme={modifyCardPlayerFormTheme}>
                                        <TextField
                                            sx={{width: '100%'}}
                                            type="number"
                                            name="velocity"
                                            label={'Velocità'}
                                            variant="filled"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.velocity}
                                        />
                                    </ThemeProvider>
                                    {errors.velocity && touched.velocity && errors.velocity}
                                </Col>
                                <Col>
                                    <ThemeProvider theme={modifyCardPlayerFormTheme}>
                                        <TextField
                                            sx={{width: '100%'}}
                                            type="number"
                                            name="shoot"
                                            label={'Tiro'}
                                            variant="filled"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.shoot}
                                        />
                                    </ThemeProvider>
                                    {errors.shoot && touched.shoot && errors.shoot}
                                </Col>
                                <Col>
                                    <ThemeProvider theme={modifyCardPlayerFormTheme}>
                                        <TextField
                                            sx={{width: '100%'}}
                                            type="number"
                                            name="pass"
                                            label={'Passaggio'}
                                            variant="filled"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.pass}
                                        />
                                    </ThemeProvider>
                                    {errors.pass && touched.pass && errors.pass}
                                </Col>
                                <Col>
                                    <ThemeProvider theme={modifyCardPlayerFormTheme}>
                                        <TextField
                                            sx={{width: '100%'}}
                                            type="number"
                                            name="dribbling"
                                            label={'Dribbling'}
                                            variant="filled"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.dribbling}
                                        />
                                    </ThemeProvider>
                                    {errors.dribbling && touched.dribbling && errors.dribbling}
                                </Col>
                                <Col>
                                    <ThemeProvider theme={modifyCardPlayerFormTheme}>
                                        <TextField
                                            sx={{width: '100%'}}
                                            type="number"
                                            name="defence"
                                            label={'Difesa'}
                                            variant="filled"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.defence}
                                        />
                                    </ThemeProvider>
                                    {errors.defence && touched.defence && errors.defence}
                                </Col>
                                <Col>
                                    <ThemeProvider theme={modifyCardPlayerFormTheme}>
                                        <TextField
                                            sx={{width: '100%'}}
                                            type="number"
                                            name="physical"
                                            label={'Fisico'}
                                            variant="filled"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.physical}
                                        />
                                    </ThemeProvider>
                                    {errors.physical && touched.physical && errors.physical}
                                </Col>
                                <Col className={'mt-2'}>
                                    <LoadingButton
                                        type={"submit"}
                                        loading={isSubmitting}
                                        loadingPosition="center"
                                        startIcon={<SaveIcon/>}
                                        variant="contained"
                                        color={"primary"}
                                        id={'dvlpz_modify_player_card_button'}
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

export default ModifyCardPlayerForm;