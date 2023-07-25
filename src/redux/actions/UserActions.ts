import {User} from "../../interfaces/User.ts";
import {UserDetails} from "../../interfaces/UserDetails.ts";


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
