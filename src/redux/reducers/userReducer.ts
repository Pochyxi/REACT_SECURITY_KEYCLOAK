import {User} from "../../interfaces/User.ts";
import {SET_USER} from "../actions/UserActions.ts";

type ActionType =
    | { type: 'SET_USER', payload: User }

export interface UserState {
    user: User
}

const initialState = {
    user: {
        email: "",
        firstName: "",
        lastName: "",
        token: "",
        xrsfToken: ""
    }
}


const userReducer = (state: UserState = initialState, action: ActionType) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;