import UtilitiesVar from "../../interfaces/UtilitiesVar.ts";
import {SET_FETCHING_FLAG, SET_SMART_BAR_FLAG} from "../actions/utilitiesVarActions.ts";


type ActionType =
    | { type: 'SET_FETCHING_FLAG', payload: UtilitiesVar }
    | { type: 'SET_SMART_BAR_FLAG', payload: UtilitiesVar }

export interface UtilitiesVarState {
    utilitiesVar: UtilitiesVar
}

const initialState = {
    utilitiesVar: {
        fetchingFlag: false,
        smartBarFlag: false
    }
}

const utilityVarReducer = (state: UtilitiesVarState = initialState, action: ActionType) => {
    switch (action.type) {
        case SET_FETCHING_FLAG:
            return {
                ...state,
                utilitiesVar: {
                    fetchingFlag: action.payload
                },
            };

            case SET_SMART_BAR_FLAG:
                return {
                    ...state,
                    utilitiesVar: {
                        smartBarFlag: action.payload
                    },
                };
        default:
            return state;
    }
}

export default utilityVarReducer;