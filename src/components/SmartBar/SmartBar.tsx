import {Col, Row, Container} from "react-bootstrap";
import {Card, Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import {FC} from "react";
import StyleIcon from '@mui/icons-material/Style';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import './SmartBarStyle.css'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store/store.ts";
import SettingsIcon from '@mui/icons-material/Settings';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {setSmartBarFlag} from "../../redux/actions/utilitiesVarActions.ts";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

interface SmartBarProps {
    modifyUser?: boolean,
    setModifyUser?: (value: boolean) => void,
    showTeamCardList?: boolean,
    setShowTeamCardList?: (value: boolean) => void,
    newTeamFormFlag?: boolean,
    setNewTeamFormFlag?: (value: boolean) => void,
    openModifyTeam?: boolean,
    setOpenModifyTeam?: (value: boolean) => void,
    DELETE_Team?: () => void,
    openCardPlayerList?: boolean,
    setOpenCardPlayerList?: (value: boolean) => void,
    newCardPlayerFormFlag?: boolean,
    setNewCardPlayerFormFlag?: (value: boolean) => void,
}


const SmartBar: FC<SmartBarProps> = (props: SmartBarProps) => {
    const dispatch = useDispatch();

    const smartBardFlag = useSelector((state: RootState) => state.STORE2.utilitiesVar.smartBarFlag);

    const {modifyUser, setModifyUser} = props;

    const {showTeamCardList, setShowTeamCardList} = props;
    const {newTeamFormFlag, setNewTeamFormFlag} = props;

    const {openModifyTeam, setOpenModifyTeam} = props;
    const {DELETE_Team} = props;


    const iconDispatcher = () => {
        if (
            modifyUser != undefined &&
            setModifyUser != undefined
        ) {
            return (
                <>
                    <Col className={'d-flex justify-content-center'}>
                        <Tooltip title="Modifica Dati Utente">
                            <IconButton
                                color={modifyUser ? 'success' : 'primary'}
                                aria-label="add to shopping cart"
                                onClick={() => {
                                    setModifyUser(!modifyUser)
                                }}
                            >
                                <ManageAccountsIcon/>
                            </IconButton>
                        </Tooltip>
                    </Col>
                </>
            )
        } else if (
            showTeamCardList != undefined &&
            setShowTeamCardList != undefined &&
            newTeamFormFlag != undefined &&
            setNewTeamFormFlag != undefined
        ) {
            return (
                <>
                    <Col className={'d-flex justify-content-center'}>
                        <Tooltip title="Mostra TEAMS">
                            <IconButton
                                color={showTeamCardList ? 'success' : 'primary'}
                                aria-label="Mostra TEAMS"
                                onClick={() => {
                                    setShowTeamCardList(!showTeamCardList)
                                }}
                            >
                                <StyleIcon/>
                            </IconButton>
                        </Tooltip>
                    </Col>
                    <Col className={'d-flex justify-content-center'}>
                        <Tooltip title="Crea nuovo TEAM">
                            <IconButton
                                color={newTeamFormFlag ? 'success' : 'primary'}
                                aria-label="Nuovo TEAM"
                                onClick={() => {
                                    setNewTeamFormFlag(!newTeamFormFlag)
                                }}
                            >
                                <AddModeratorIcon/>
                            </IconButton>
                        </Tooltip>
                    </Col>
                </>
            )
        } else if (
            openModifyTeam != undefined &&
            setOpenModifyTeam != undefined &&
            DELETE_Team != undefined
        ) {
            return (
                <>
                    <Col className={'d-flex justify-content-center'}>
                        <Tooltip title="Modifica TEAM">
                            <IconButton
                                color={openModifyTeam ? 'success' : 'primary'}
                                aria-label="Modifica TEAM"
                                onClick={() => {
                                    setOpenModifyTeam(!openModifyTeam)
                                }}
                            >
                                <SettingsIcon/>
                            </IconButton>
                        </Tooltip>
                    </Col>
                    <Col className={'d-flex justify-content-center'}>
                        <Tooltip title="Elimina TEAM">
                            <IconButton
                                color={'error'}
                                aria-label="Elimina TEAM"
                                onClick={() => {
                                    DELETE_Team()
                                }}
                            >
                                <RemoveCircleIcon/>
                            </IconButton>
                        </Tooltip>
                    </Col>
                </>
            )
        }
    }

    return (
        <>
            {
                smartBardFlag && (
                    <Row className={'justify-content-center'}>
                        <Col xs={12}>
                            <Card id={'dvlpz-smart-bar'}>
                                <Container fluid>
                                    <Row className={'justify-content-center'}>
                                        {iconDispatcher()}
                                        <Col className={'d-flex justify-content-center'}>
                                            <Tooltip title="Chiudi">
                                                <IconButton
                                                    color={'error'}
                                                    aria-label="Chiudi"
                                                    onClick={() => {
                                                        dispatch(setSmartBarFlag(false))
                                                    }}
                                                >
                                                    <ExitToAppIcon/>
                                                </IconButton>
                                            </Tooltip>
                                        </Col>
                                    </Row>
                                </Container>
                            </Card>
                        </Col>
                    </Row>
                )
            }
        </>
    )
}

export default SmartBar;