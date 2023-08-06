import {UserDetails} from "./UserDetails.ts";

export default interface Teams {
    id: number | null;
    teamName: string | "";
    accountsOwner: UserDetails | null;
}