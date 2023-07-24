import {User} from "../../interfaces/User.ts";


export const SET_USER = "SET_USER";

export const setUser = (user: User) => ({
    type : SET_USER ,
    payload : user
});
