import axios from "axios";

const baseUrl = "http://localhost:8080";
const accountDetailsPath = "/myAccount";


export const getUserDetails = ( email:string | undefined, token:string ) => {
    return axios({
        method: 'get',
        url: `${baseUrl}${accountDetailsPath}?email=${email}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }, withCredentials: true
    })
}