import CardPlayer from "../../interfaces/CardPlayer.ts";
import {FC, useState} from "react";
import {CardContent, Card, Tooltip} from "@mui/material";
import {Row, Col, Container} from "react-bootstrap";
import './PlayerCardStyle.css'
import IconButton from "@mui/material/IconButton";
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModifyCardPlayerForm from "../FORMS/ModifyCardPlayerForm/ModifyCardPlayerForm.tsx";
import {AppDispatch, RootState} from "../../redux/store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {DELETE_SET_CARDS} from "../../redux/actions/teamsActions.ts";
import {useKeycloak} from "@react-keycloak/web";

interface PlayerCardProps {
    card: CardPlayer
}

const PlayerCard: FC<PlayerCardProps> = (props: PlayerCardProps) => {
    const {keycloak} = useKeycloak();
    const user = useSelector((state: RootState) => state.STORE1.user);
    const dispatch: AppDispatch = useDispatch()
    const [modifyCardPlayer, setModifyCardPlayer] = useState<boolean>(false)

    const DELETE_CARD = () => {
        if (!props?.card) return
        dispatch(DELETE_SET_CARDS(props.card.teams.accountsOwner.accountEmail, props.card.id,keycloak.token as string , user.xsrfToken))
    }


    return (
        <Card
            id={'dvlpz_player_card'}
            sx={{width: '100%'}}>
            <CardContent>
                <Row>
                    <Col xs={12}>
                        <Container style={{
                            border: '1px solid black',
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                        }}
                                   className={'d-flex flex-column justify-content-center text-center'}>
                            {props.card?.skillsStatistics?.overall}
                        </Container>
                    </Col>
                    <Col className={'d-flex flex-column justify-content-center'}>
                        <h2 className={'m-0 p-0 align-baseline text-center'}>{props.card?.name.charAt(0)}.{props.card?.surname}</h2>
                    </Col>
                </Row>
                <Row className={'justify-content-between'}>
                    <Col className={'d-flex justify-content-between'}>
                        <Tooltip title="Modifica Informazioni">
                            <IconButton
                                color={modifyCardPlayer ? 'success' : 'inherit'}
                                aria-label="Modifica Informazioni"
                                onClick={() => {
                                    setModifyCardPlayer(!modifyCardPlayer)
                                }}
                            >
                                <SettingsApplicationsIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Elimina Carta Giocatore">
                            <IconButton
                                color={'error'}
                                aria-label="Elimina Carta Giocatore"
                                onClick={() => {
                                    DELETE_CARD()
                                }}
                            >
                                <DeleteForeverIcon/>
                            </IconButton>
                        </Tooltip>
                    </Col>
                </Row>
                {
                    !modifyCardPlayer ? (
                        <>
                            <Row>
                                <h6 className={'text-center'}>Statistiche</h6>
                            </Row>
                            <Row className={'justify-content-center text-center'}>
                                <Col className={'flex-column'}>
                                    <Row>
                                        <Col>VEL</Col>
                                        <Col>{props.card?.skillsStatistics?.velocity}</Col>
                                    </Row>
                                    <Row>
                                        <Col>TIR</Col>
                                        <Col>{props.card?.skillsStatistics?.shoot}</Col>
                                    </Row>
                                    <Row>
                                        <Col>PASS</Col>
                                        <Col>{props.card?.skillsStatistics?.pass}</Col>
                                    </Row>
                                </Col>
                                <Col className={'flex-column'}>
                                    <Row>
                                        <Col>DRI</Col>
                                        <Col>{props.card?.skillsStatistics?.dribbling}</Col>
                                    </Row>
                                    <Row>
                                        <Col>DEF</Col>
                                        <Col>{props.card?.skillsStatistics?.defence}</Col>
                                    </Row>
                                    <Row>
                                        <Col>FIS</Col>
                                        <Col>{props.card?.skillsStatistics?.physical}</Col>
                                    </Row>
                                </Col>
                            </Row>
                        </>
                    ) : (
                        <ModifyCardPlayerForm setModifyCardPlayer={setModifyCardPlayer} card={props.card}/>
                    )
                }

            </CardContent>
        </Card>
    );
};

export default PlayerCard;