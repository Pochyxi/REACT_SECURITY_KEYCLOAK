import axios from "axios";

export const baseUrl = "http://localhost:8080";
export const accountDetailsPath = "/myAccount";


export const getUserDetails = ( email:string | undefined, token:string ) => {
    return axios({
        method: 'get',
        url: `${baseUrl}${accountDetailsPath}?email=${email}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }, withCredentials: true
    })
}