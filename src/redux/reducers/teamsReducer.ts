import Teams from "../../interfaces/Teams.ts";
import {SET_CARD_LIST, SET_SINGLE_TEAM, SET_TEAMS} from "../actions/teamsActions.ts";
import CardPlayer from "../../interfaces/CardPlayer.ts";

type ActionType =
    | { type: 'SET_TEAMS', payload: Teams[] }
    | { type: 'SET_SINGLE_TEAM', payload: Teams }
    | { type: 'SET_CARD_LIST', payload: CardPlayer[] }

export interface TeamsState {
    teamList: Teams[]
    single_team: Teams | null
    cardList: CardPlayer[]
}

const initialState = {
    teamList: [],
    single_team: null,
    cardList: []
}

const teamsReducer = (state: TeamsState = initialState, action: ActionType) => {
    switch (action.type) {
        case SET_TEAMS:
            return {
                ...state,
                teamList: action.payload,
            };

        case SET_SINGLE_TEAM:
            return {
                ...state,
                single_team: action.payload,
            };


            case SET_CARD_LIST:
            return {
                ...state,
                cardList: action.payload,
            }

        default:
            return state;
    }

}

export default teamsReducer;