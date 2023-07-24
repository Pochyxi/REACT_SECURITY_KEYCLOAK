import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";
import userReducer from "../reducers/userReducer.ts";
import {User} from "../../interfaces/User.ts";


interface Store1State {
    user: User
}

export interface RootState {
    STORE1: Store1State
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
    STORE1: userReducer
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