import {User} from "../../interfaces/User.ts";
import {UserDetails} from "../../interfaces/UserDetails.ts";
import axios from "axios";
import {accountPath, baseUrl} from "../../api/Api.ts";
import {RootState} from "../store/store.ts";
import { Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import {setFetchingFlag} from "./utilitiesVarActions.ts";

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

export const SET_USER = "SET_USER";
export const SET_USER_DETAILS = "SET_USER_DETAILS";

export const setUser = (user: User | null) => ({
    type : SET_USER ,
    payload : user
});

export const setUserDetails = (userDetails: UserDetails | null) => ({
    type : SET_USER_DETAILS ,
    payload : userDetails
});

export const GET_SET_UserDetails = (email: string | undefined, token: string | undefined): AppThunk => {

    return async (dispatch, getState) => {
        let crsfToken = ''

        try {

            dispatch(setFetchingFlag(true))
            const response = await axios({

                method: 'get',
                url: `${baseUrl}${accountPath}?email=${email}`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }, withCredentials: true

            })

            if (response.status === 200 && response.data !== 'Nessun account trovato con questa email') {


                dispatch(setUser({
                    ...getState().STORE1.user,
                    xsrfToken: response.headers['x-xsrf-token']
                }))

                crsfToken = response.headers['x-xsrf-token']

                dispatch(setUserDetails({
                    ...response.data,
                    telephoneNumber: response.data.telephoneNumber ? response.data.telephoneNumber : ""
                }))

                dispatch(setFetchingFlag(false))
            } else if (response.status === 200 && response.data === 'Nessun account trovato con questa email') {
                try {
                    dispatch(setFetchingFlag(true))
                    const response = await axios({
                        url: baseUrl + accountPath,
                        method: 'post',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'X-CSRF-TOKEN': crsfToken
                        },
                        data: {
                            accountEmail: getState().STORE1.user?.email,
                            firstName: getState().STORE1.user?.firstName,
                            lastName: getState().STORE1.user?.lastName,
                            telephoneNumber: ''
                        },
                        withCredentials: true
                    })

                    if (response.status === 200) {

                        dispatch(setUserDetails({
                            ...response.data,
                            telephoneNumber: response.data.telephoneNumber ? response.data.telephoneNumber : ""
                        }))

                        dispatch(setFetchingFlag(false))
                    }

                }catch (e) {
                    console.log(e);
                }
            }
        } catch (e) {
            console.log(e);
            dispatch(setFetchingFlag(false))
        }
    }
}


export const PUT_SET_ModifyUserDetails = (url: string | undefined, data:UserDetails, token: string | undefined, crsfToken:string | undefined): AppThunk => {

    return async (dispatch) => {

        try {

            dispatch(setFetchingFlag(true))
            const response = await axios({
                url: url,
                method: 'put',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'X-CSRF-TOKEN': crsfToken
                },
                data: data,
                withCredentials: true
            })

            if (response.status === 200) {

                dispatch(setUserDetails({
                    ...response.data,
                    telephoneNumber: response.data.telephoneNumber ? response.data.telephoneNumber : ""
                }))

                dispatch(setFetchingFlag(false))
            }
        } catch (e) {
            console.log(e);
            dispatch(setFetchingFlag(false))
        }
    }
}

export const DELETE_SET_ModifyUserDetails = (url: string | undefined, email: string | undefined, token: string, xsrfToken: string | undefined): AppThunk => {

    return async (dispatch) => {

        try {

            dispatch(setFetchingFlag(true))
            const response = await axios({
                url: url + "?email=" + email,
                method: 'delete',
                headers: {
                    "Authorization": "Bearer " + token,
                    "X-XSRF-TOKEN": xsrfToken
                }
            })

            if (response.status === 200) {

                dispatch(GET_SET_UserDetails(email, token))

                console.log(response.data)

                dispatch(setFetchingFlag(false))
            }
        } catch (e) {
            console.log(e);
            dispatch(setFetchingFlag(false))
        }
    }
}