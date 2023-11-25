import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import userInfo from '../api/userInfoSlice';

const store = configureStore({
    reducer: {userInfo, [apiSlice.reducerPath]: apiSlice.reducer},
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;