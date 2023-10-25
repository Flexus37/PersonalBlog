import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

// const timeMiddleware = () => (next) => (action) => {
//     const res = new Date(action);
//     if (res.getDate > 0) {
//         return next({
//             type: res
//         })
//     }
//     return next(action);
// }

const store = configureStore({
    reducer: {[apiSlice.reducerPath]: apiSlice.reducer},
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;