import { ClicksPerDay } from "./clicks-per-day";

export interface UserDetailsSimple {
    id : string,
    userId : string,
    shortCode : string,
    isExpired : boolean,
    callUrl : string,
    createdAt : string,
    totalClicks : number,
    clicksPerday : []
}