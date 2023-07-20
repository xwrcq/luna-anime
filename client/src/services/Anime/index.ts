import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetInfoResponse, GetRecentResponse, GetSearchResponse, GetStreamingLinkResponse, GetTopAiringResponse } from '../../ts/interfaces/anime';

export const animeApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_SERVER_URL }),
    reducerPath: 'animeApi',
    tagTypes: ['TopAiring', 'Recent', 'Info', 'Watch'],
    endpoints: (build) => ({
        getTopAiring: build.query<GetTopAiringResponse, number>({
            query: (page) => `/anime/top-airing?page=${page}`,
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName
            },

            merge: (currentCache, newItems) => {
                if(newItems.currentPage === '1') {
                    currentCache.results = newItems.results;
                    currentCache.currentPage = newItems.currentPage;
                    currentCache.hasNextPage = newItems.hasNextPage;
                } else {
                    currentCache.results.push(...newItems.results);
                    currentCache.currentPage = newItems.currentPage;
                    currentCache.hasNextPage = newItems.hasNextPage;
                }
            },

            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            },
            providesTags: ['TopAiring'],
        }),
        getRecent: build.query<GetRecentResponse, void>({
            query: () => '/anime/recent',
            providesTags: ['Recent'],
        }),
        getinfo: build.query<GetInfoResponse, string>({
            query: (id) => `/anime/info/${id}`,
            providesTags: ['Info'],
        }),
        getStreamingLink: build.query<GetStreamingLinkResponse, string>({
            query: (id) => `/anime/watch/${id}`,
            providesTags: ['Watch'],
        }),
        getSearch: build.query<GetSearchResponse, string>({
            query: (query) => `/anime/search/${query}`,
        }),
    }),
});

export const { useGetTopAiringQuery, useGetRecentQuery, useGetinfoQuery, useGetStreamingLinkQuery, useLazyGetSearchQuery } = animeApi;