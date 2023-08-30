import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import IconButton from "@mui/material/IconButton";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store/store.ts";
import './TriggerSmartbarStyle.css'
import {Container} from "react-bootstrap";
import {setSmartBarFlag} from "../../redux/actions/utilitiesVarActions.ts";

const TriggerSmartBar = () => {
    const dispatch = useDispatch();
    const smartBardFlag = useSelector((state: RootState) => state.STORE2.utilitiesVar.smartBarFlag);

    return (
        <Container id={'dvlpz_trigger_smart_bar'} className="d-flex justify-content-end">
                <IconButton
                    color={smartBardFlag ? 'success' : 'primary'}
                    aria-label="add to shopping cart"
                    onClick={() => {
                        dispatch(setSmartBarFlag(!smartBardFlag));
                    }}
                >
                    <SettingsSuggestIcon/>
                </IconButton>
        </Container>
    );
};

export default TriggerSmartBar;