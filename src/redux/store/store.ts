import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";
import userReducer from "../reducers/userReducer.ts";
import {User} from "../../interfaces/User.ts";
import {UserDetails} from "../../interfaces/UserDetails.ts";
import UtilitiesVar from "../../interfaces/UtilitiesVar.ts";
import utilityVarReducer from "../reducers/utilityVarReducer.ts";


interface Store1State {
    user: User
    userDetails: UserDetails
}

interface Store2State {
    utilitiesVar: UtilitiesVar
}

export interface RootState {
    STORE1: Store1State,
    STORE2: Store2State
}


const persistConfig = {
    // 3
    key: "root",
    storage,
    transforms: [
        encryptTransform({
            secretKey: "react",
        }),
    ],
    whitelist: ['STORE1'] // stringhe
};

const mergedReducers = combineReducers({
    STORE1: userReducer,
    STORE2: utilityVarReducer
});


const persistedReducer = persistReducer(persistConfig, mergedReducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch