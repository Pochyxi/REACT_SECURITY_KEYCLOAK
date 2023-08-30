import {UserDetails} from "./UserDetails.ts";

export default interface Teams {
    id: number;
    teamName: string;
    accountsOwner: UserDetails;
}