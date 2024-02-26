import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"

const userInfoAdapter = createEntityAdapter();
const initialState = userInfoAdapter.getInitialState({
    userId: null,
    currentPageId: null,
    isAuthenticated: false,
    loadingStatus: 'idle',
    isSidebarOpened: false,
    isStoriesEmpty: false,
    isPostsEmpty: false
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
        },
        setCurrentPageId: (state, action) => {
            state.currentPageId = action.payload
        },
        setSidebarOpening: (state, action) => {
            state.isSidebarOpened = action.payload
        },
        setStoriesEmpty: (state, action) => {
            state.isStoriesEmpty = action.payload
        },
        setPostsEmpty: (state, action) => {
            state.isPostsEmpty = action.payload
        }
    }
})

const {actions, reducer} = userInfoSlice;

export const {selectAll} = userInfoAdapter.getSelectors(state => state.userInfo);

export default reducer;
export const {
    setUserAuthentication,
    setUserId,
    setCurrentPageId,
    setSidebarOpening,
    setStoriesEmpty,
    setPostsEmpty
} = actions;