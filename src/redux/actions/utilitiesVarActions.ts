export const SET_FETCHING_FLAG = "SET_FETCHING_FLAG";

export const SET_SMART_BAR_FLAG = "SET_SMART_BAR_FLAG";

export const setFetchingFlag = (fetchingFlag: boolean) => ({
    type: SET_FETCHING_FLAG,
    payload: fetchingFlag
});

export const setSmartBarFlag = (smartBarFlag: boolean) => ({
    type: SET_SMART_BAR_FLAG,
    payload: smartBarFlag
});
