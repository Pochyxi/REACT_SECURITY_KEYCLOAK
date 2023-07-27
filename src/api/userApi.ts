import axios from "axios";
import {UserDetails} from "../interfaces/UserDetails.ts";

export const baseUrl = "http://localhost:8080";
export const accountDetailsPath = "/myAccount";
export const modifyAccountDetailsPath = "/updateAccount";

export const fetchDeleteUserDetails = "/deleteAccount";


export const getUserDetails = ( email:string | undefined, token:string | undefined ) => {
    return axios({
        method: 'get',
        url: `${baseUrl}${accountDetailsPath}?email=${email}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }, withCredentials: true
    })
}

export const fetchModifyUserDetails = ( url:string | undefined, data: UserDetails,  token:string | undefined, crsfToken:string | undefined ) => {

    return axios({
        url: url,
        method: 'put',
        headers: {
            'Authorization': `Bearer ${token}`,
            'X-CSRF-TOKEN': crsfToken
        },
        data: data,
        withCredentials: true
    })

}

