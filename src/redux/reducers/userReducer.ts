import {User} from "../../interfaces/User.ts";
import {SET_USER, SET_USER_DETAILS} from "../actions/userActions.ts";
import {UserDetails} from "../../interfaces/UserDetails.ts";

type ActionType =
    | { type: 'SET_USER', payload: User }
    | { type: 'SET_USER_DETAILS', payload: UserDetails }

export interface UserState {
    user: User,
    userDetails: UserDetails
}

const initialState = {
    user: {
        email: "",
        firstName: "",
        lastName: "",
        xsrfToken: ""
    },
    userDetails: {
        accountEmail: "",
        firstName: "",
        lastName: "",
        telephoneNumber: "",
        createDt: ""
    }
}


const userReducer = (state: UserState = initialState, action: ActionType) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        case SET_USER_DETAILS:
            return {
                ...state,
                userDetails: action.payload,
            }
        default:
            return state;
    }
};

export default userReducer;