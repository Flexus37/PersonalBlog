import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { getUsers, getAllContent, getUserInfo, getContent, createUserInfo, createContent, deleteContent, deleteContentFiles, sendFriendRequest, getFriendRequests, acceptFriendRequest, removeFromFriends, rejectFriendRequest } from '../firebase/FirestoreService';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: '/api'}),
    tagTypes: ['Content', 'Users', 'Images', 'Stories', 'Friends', 'FriendRequests'],
    endpoints: builder => ({
        getUsers: builder.query({
            queryFn: async searchTerm => {
                const users = await getUsers(searchTerm);
                return {data: users}
            },
            providesTags: ['Users']
        }),
        getUserInfo: builder.query({
            queryFn: async userId => {
                const userInfo = await getUserInfo(userId);
                return {data: userInfo}
            },
            providesTags: ['Users']
        }),
        getAllContent: builder.query({
            queryFn: async contentObj => {
                const contentList = await getAllContent(contentObj);
                return {data: contentList};
            },
            providesTags: ['Content', 'Friends']
        }),
        getContent: builder.query({
            queryFn: async contentObj => {
                const content = await getContent(contentObj);
                return {data: content};
            },
            providesTags: ['Content']
            // providesTags: ['Stories']
        }),
        getFriendRequests: builder.query({
            queryFn: async userId => {
                const requestsList = await getFriendRequests(userId);
                return {data: requestsList};
            },
            providesTags: ['FriendRequests']
        }),
        sendFriendRequest: builder.mutation({
            queryFn: async data => {
                return await sendFriendRequest(data);
            },
            invalidatesTags: ['FriendRequests']
        }),
        acceptFriendRequest: builder.mutation({
            queryFn: async data => {
                return await acceptFriendRequest(data);
            },
            invalidatesTags: ['Friends', 'FriendRequests']
        }),
        rejectFriendRequest: builder.mutation({
            queryFn: async data => {
                return await rejectFriendRequest(data);
            },
            invalidatesTags: ['Friends', 'FriendRequests']
        }),
        createUserInfo: builder.mutation({
            queryFn: async userInfoObj => {
                return await createUserInfo(userInfoObj);
            },
            invalidatesTags: ['Users']
        }),
        createContent: builder.mutation({
            queryFn: async contentObj => {
                return await createContent(contentObj);
            },
            invalidatesTags: ['Content']
        }),
        deleteContent: builder.mutation({
            queryFn: async deleteObj => {
                return await deleteContent(deleteObj);
            },
            invalidatesTags: ['Content']
        }),
        deleteContentFiles: builder.mutation({
            queryFn: async deleteContentObj => {
                return await deleteContentFiles(deleteContentObj);
            },
            invalidatesTags: ['Images']
        }),
        removeFromFriends: builder.mutation({
            queryFn: async data => {
                return await removeFromFriends(data);
            },
            invalidatesTags: ['Friends']
        })
    })

});

export const {
    useGetUsersQuery,
    useGetContentQuery,
    useGetAllContentQuery,
    useGetUserInfoQuery,
    useGetFriendRequestsQuery,
    useSendFriendRequestMutation,
    useAcceptFriendRequestMutation,
    useRejectFriendRequestMutation,
    useCreateContentMutation,
    useCreateUserInfoMutation,
    useDeleteContentMutation,
    useDeleteContentFilesMutation,
    useRemoveFromFriendsMutation
} = apiSlice;