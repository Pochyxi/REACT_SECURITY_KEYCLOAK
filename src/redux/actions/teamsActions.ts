import Teams from "../../interfaces/Teams.ts";
import {setFetchingFlag} from "./utilitiesVarActions.ts";
import axios from "axios";
import {baseUrl, cardsPath, skillStatisticsPath, teamsPath} from "../../api/Api.ts";
import TeamCreation from "../../interfaces/TeamCreation.ts";
import {AppThunk} from "./userActions.ts";
import TeamModify from "../../interfaces/TeamModify.ts";
import CardPlayer from "../../interfaces/CardPlayer.ts";
import CardPlayerCreation from "../../interfaces/CardPlayerCreation.ts";
import CardPlayerModify from "../../interfaces/CardPlayerModify.ts";
import SkillsStatisticsPutRequest from "../../interfaces/SkillsStatisticsPutRequest.ts";


export const SET_TEAMS = "SET_TEAMS";
export const SET_SINGLE_TEAM = "SET_SINGLE_TEAM";
export const SET_CARD_LIST = "SET_CARD_LIST";

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

export const setCardList = (cardList: CardPlayer[]) => {
    return {
        type: SET_CARD_LIST,
        payload: cardList
    }
}

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
        } finally {
            dispatch(setFetchingFlag(false))
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

export const DELETE_SET_TEAMS = (email: string | undefined, id: number | "", token: string | undefined, crsfToken: string | undefined): AppThunk => {

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

export const GET_SET_CARDS = (teamsId: number, email: string, token: string): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(setFetchingFlag(true))

            const response = await axios({
                method: 'get',
                url: `${baseUrl}${cardsPath}?email=${email}&id=${teamsId}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })

            if (response.status === 200) {
                console.log(response.data);
                dispatch(setCardList(response.data))

                dispatch(setFetchingFlag(false))
            }

        } catch
            (e) {
            console.log(e);
        } finally {
            dispatch(setFetchingFlag(false))
        }
    }
}

export const POST_SET_CARDS = (token: string, crsfToken: string, data: CardPlayerCreation): AppThunk => {
    return async (dispatch) => {

        try {
            dispatch(setFetchingFlag(true))

            const response = await axios({
                method: 'post',
                url: `${baseUrl}${cardsPath}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'X-CSRF-TOKEN': crsfToken
                },
                data: data,
                withCredentials: true
            })

            if (response.status === 200) {
                dispatch(GET_SET_CARDS(response.data.teams.id, response.data.teams.accountsOwner.accountEmail, token))
                dispatch(setFetchingFlag(false))
            }


        } catch (e) {
            console.log(e);
        }

    }
}

export const PUT_SET_CARDS = (token: string, crsfToken: string | undefined, data: CardPlayerModify): AppThunk => {
    return async (dispatch) => {

        try {
            dispatch(setFetchingFlag(true))

            const response = await axios({
                method: 'put',
                url: `${baseUrl}${cardsPath}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'X-CSRF-TOKEN': crsfToken
                },
                data: data,
                withCredentials: true
            })

            if (response.status === 200) {
                dispatch(GET_SET_CARDS(response.data.teams.id, response.data.teams.accountsOwner.accountEmail, token))
                dispatch(setFetchingFlag(false))
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export const DELETE_SET_CARDS = (email: string, id: string, token: string, crsfToken: string): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(setFetchingFlag(true))

            const response = await axios({
                method: 'delete',
                url: `${baseUrl}${cardsPath}?&id=${id}&email=${email}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'X-CSRF-TOKEN': crsfToken
                },
                withCredentials: true
            })

            if (response.status === 200) {
                dispatch(GET_SET_CARDS(response.data.teams.id,email, token))
                dispatch(setFetchingFlag(false))
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export const PUT_SKILLS_STATISTICS = (token: string, crsfToken: string, data: SkillsStatisticsPutRequest, teamId: number, accountEmail: string): AppThunk => {
    return async (dispatch) => {

        try {
            dispatch(setFetchingFlag(true))

            const response = await axios({
                method: 'put',
                url: `${baseUrl}${skillStatisticsPath}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'X-CSRF-TOKEN': crsfToken
                },
                data: data,
                withCredentials: true
            })

            if (response.status === 200) {
                dispatch(GET_SET_CARDS(teamId, accountEmail, token))
                dispatch(setFetchingFlag(false))
            }
        } catch (e) {
            console.log(e);
        }
    }
}