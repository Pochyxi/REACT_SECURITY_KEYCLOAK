import {User} from "../../interfaces/User.ts";
import {UserDetails} from "../../interfaces/UserDetails.ts";
import axios from "axios";
import {accountDetailsPath, baseUrl} from "../../api/userApi.ts";
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

export const GET_SET_UserDetails = (email: string | "", token: string | ""): AppThunk => {

    return async (dispatch, getState) => {

        try {

            dispatch(setFetchingFlag(true))
            const response = await axios({

                method: 'get',
                url: `${baseUrl}${accountDetailsPath}?email=${email}`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }, withCredentials: true

            })

            if (response.status === 200) {

                dispatch(setUser({
                    ...getState().STORE1.user,
                    xsrfToken: response.headers['x-xsrf-token']
                }))

                dispatch(setUserDetails({
                    ...response.data.body,
                    telephoneNumber: response.data.body.telephoneNumber ? response.data.body.telephoneNumber : ""
                }))

                dispatch(setFetchingFlag(false))
            }
        } catch (e) {
            console.log(e);
            dispatch(setFetchingFlag(false))
        }
    }
}
