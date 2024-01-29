import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { getUsers, getAllContent, getUserInfo, getContent, createUserInfo, createContent, deleteContent, deleteContentFiles } from '../firebase/FirestoreService';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: '/api'}),
    tagTypes: ['Posts', 'Users', 'Images', 'Stories'],
    endpoints: builder => ({
        getUsers: builder.query({
            queryFn: async () => {
                const users = await getUsers();
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
            providesTags: ['Posts']
        }),
        getContent: builder.query({
            queryFn: async contentObj => {
                const content = await getContent(contentObj);
                return {data: content};
            },
            providesTags: ['Stories']
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
            invalidatesTags: ['Posts']
        }),
        deleteContent: builder.mutation({
            queryFn: async deleteObj => {
                return await deleteContent(deleteObj);
            },
            invalidatesTags: ['Posts']
        }),
        deleteContentFiles: builder.mutation({
            queryFn: async deleteContentObj => {
                return await deleteContentFiles(deleteContentObj);
            },
            invalidatesTags: ['Images']
        })
    })

});

export const {
    useGetUsersQuery,
    useGetContentQuery,
    useGetAllContentQuery,
    useGetUserInfoQuery,
    useCreateContentMutation,
    useCreateUserInfoMutation,
    useDeleteContentMutation,
    useDeleteContentFilesMutation
} = apiSlice;