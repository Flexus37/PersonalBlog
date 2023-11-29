import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"

const userInfoAdapter = createEntityAdapter();
const initialState = userInfoAdapter.getInitialState({
    userId: null,
    isAuthenticated: false,
    loadingStatus: 'idle'
});

const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setUserAuthentication: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setUserId: (state, action) => {
            state.userId = action.payload;
        }
    }
})

const {actions, reducer} = userInfoSlice;

export const {selectAll} = userInfoAdapter.getSelectors(state => state.userInfo);

export default reducer;
export const {
    setUserAuthentication,
    setUserId
} = actions;