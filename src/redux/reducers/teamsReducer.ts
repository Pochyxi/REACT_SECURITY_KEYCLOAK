import Teams from "../../interfaces/Teams.ts";
import {SET_SINGLE_TEAM, SET_TEAMS} from "../actions/teamsActions.ts";

type ActionType =
    | { type: 'SET_TEAMS', payload: Teams[] }
    | { type: 'SET_SINGLE_TEAM', payload: Teams }

export interface TeamsState {
    teamList: Teams[]
    single_team: Teams | null
}

const initialState = {
    teamList: [],
    single_team: null
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
            }

        default:
            return state;
    }

}

export default teamsReducer;