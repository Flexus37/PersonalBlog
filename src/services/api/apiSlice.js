import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { getAllContent, getContent, createContent, deleteContent, deleteContentFiles } from '../firebase/FirestoreService';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: '/api'}),
    tagTypes: ['Posts', 'Users', 'Images', 'Stories'],
    endpoints: builder => ({
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
    useGetContentQuery,
    useGetAllContentQuery,
    useCreateContentMutation,
    useDeleteContentMutation,
    useDeleteContentFilesMutation
} = apiSlice;