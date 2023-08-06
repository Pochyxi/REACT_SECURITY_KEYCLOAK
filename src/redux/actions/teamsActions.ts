import Teams from "../../interfaces/Teams.ts";
import {setFetchingFlag} from "./utilitiesVarActions.ts";
import axios from "axios";
import {baseUrl, teamsPath} from "../../api/Api.ts";
import TeamCreation from "../../interfaces/TeamCreation.ts";
import {AppThunk} from "./userActions.ts";
import TeamModify from "../../interfaces/TeamModify.ts";


export const SET_TEAMS = "SET_TEAMS";
export const SET_SINGLE_TEAM = "SET_SINGLE_TEAM";

export const setTeams = (teams: Teams[]) => {
    return {
        type: SET_TEAMS,
        payload: teams
    }
}

export const setSingleTeam = (team: Teams) => {
    return {
        type: SET_SINGLE_TEAM,
        payload: team
    }
}

// todo: implementare
export const GET_SET_TEAMS = (email: string | undefined, token: string | undefined): AppThunk => {

    return async (dispatch) => {
        try {
            dispatch(setFetchingFlag(true))

            const response = await axios({
                method: 'get',
                url: `${baseUrl}${teamsPath}?ownerEmail=${email}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })

            if (response.status === 200) {
                console.log(response.data);
                dispatch(setTeams(response.data))
                dispatch(setFetchingFlag(false))
            }

        } catch
            (e) {
            console.log(e);
        }
    }
}

export const GET_SET_SINGLE_TEAM = (id: string | undefined, email: string | undefined, token: string | undefined): AppThunk => {

    return async (dispatch) => {
        try {
            dispatch(setFetchingFlag(true))

            const response = await axios({
                method: 'get',
                url: `${baseUrl}${teamsPath}/${id}?email=${email}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                withCredentials: true
            })

            if (response.status === 200) {
                console.log(response.data);
                dispatch(setSingleTeam(response.data))
                dispatch(setFetchingFlag(false))
            }

        }catch (e) {
            console.log(e);
        }
    }
}

export const POST_SET_TEAMS = (token: string | undefined, crsfToken: string | undefined, data: TeamCreation): AppThunk => {

    return async (dispatch) => {

        try {
            dispatch(setFetchingFlag(true))

            const response = await axios({
                method: 'post',
                url: `${baseUrl}${teamsPath}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'X-CSRF-TOKEN': crsfToken
                },
                data: data,
                withCredentials: true
            })

            if (response.status === 200) {
                dispatch(GET_SET_TEAMS(data.ownerEmail, token))
                dispatch(setFetchingFlag(false))
            }


        } catch (e) {
            console.log(e);
        }

    }
}

export const PUT_SET_TEAMS = (token: string | undefined, crsfToken: string | undefined, data: TeamModify): AppThunk => {

    return async (dispatch) => {

        try {
            dispatch(setFetchingFlag(true))

            const response = await axios({
                method: 'put',
                url: `${baseUrl}${teamsPath}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'X-CSRF-TOKEN': crsfToken
                },
                data: data,
                withCredentials: true
            })

            if (response.status === 200) {
                dispatch(GET_SET_TEAMS(data.ownerEmail, token))
                dispatch(GET_SET_SINGLE_TEAM(data.teamsId.toString(), data.ownerEmail, token))
                dispatch(setFetchingFlag(false))
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export const DELETE_SET_TEAMS = (email: string | undefined, id: string | undefined, token: string | undefined, crsfToken: string | undefined): AppThunk => {

    return async (dispatch) => {
        try {
            dispatch(setFetchingFlag(true))

            const response = await axios({
                method: 'delete',
                url: `${baseUrl}${teamsPath}?ownerEmail=${email}&id=${id}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'X-CSRF-TOKEN': crsfToken
                },
                withCredentials: true
            })

            if (response.status === 200) {
                dispatch(GET_SET_TEAMS(email, token))
                dispatch(setFetchingFlag(false))
            }
        } catch (e) {
            console.log(e);
        }
    }
}