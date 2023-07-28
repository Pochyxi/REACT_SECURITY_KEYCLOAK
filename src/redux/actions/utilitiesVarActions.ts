export const SET_FETCHING_FLAG = "SET_FETCHING_FLAG";

export const setFetchingFlag = (fetchingFlag: boolean) => ({
    type: SET_FETCHING_FLAG,
    payload: fetchingFlag
});
