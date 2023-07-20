import { logout, setUser, setUserData } from '../../store/reducers/authSlice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    retry,
} from '@reduxjs/toolkit/query'
import { CommentRequest, FavoriteRequest, FriendRequest, IFavorite, IFriend, IMiniFriend, IUser, UserLogin, UserRegistration, UserDataResponse, IComment, UserUpdate } from '../../ts/interfaces/user';
import { RootState } from '../../store';
import { Mutex } from 'async-mutex';

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_SERVER_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers;
    }
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 403) {
        return result
    }

    if (result.error && result.error.status === 401) {

        if (!mutex.isLocked()) {
            const release = await mutex.acquire();

            try {
                const refreshResult = await baseQuery('/refresh', api, extraOptions)
                if (refreshResult && refreshResult.data) {
                    const user = (api.getState() as RootState).authSlice.user;

                    api.dispatch(setUserData(refreshResult.data as UserDataResponse));

                    result = await baseQuery(args, api, extraOptions);
                } else {
                    api.dispatch(logout());
                }
            } finally {
                release()
            }
        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }

    return result
}

export const userApi = createApi({
    baseQuery: baseQueryWithReauth,
    reducerPath: 'userApi',
    tagTypes: ['Customer', 'Friends', 'Favorite', 'Comment', 'Me'],
    endpoints: (build) => ({
        getUser: build.query<IUser, null>({
            query: () => '/user',
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data));
                } catch (error) { }
            },
            providesTags: ['Comment'],
        }),
        getCustomer: build.query<IFriend, string>({
            query: (id) => `/users/${id}`,
            providesTags: ['Customer', 'Comment'],
        }),
        getUsers: build.query<IMiniFriend[], string>({
            query: (id) => `/users/${id}/users`,
        }),
        getFriends: build.query<IMiniFriend[], string>({
            query: (id) => `/users/${id}/friends`,
            providesTags: ['Friends'],
        }),
        getSendRequests: build.query<IMiniFriend[], string>({
            query: (id) => `/users/${id}/sends`,
            providesTags: ['Friends'],
        }),
        getAcceptRequests: build.query<IMiniFriend[], string>({
            query: (id) => `/users/${id}/accepts`,
            providesTags: ['Friends'],
        }),
        addComment: build.mutation<IUser, CommentRequest>({
            query: ({ id, commentatorId, commentText }) => ({
                url: `/users/${id}/addcomment/${commentatorId}`,
                method: 'PATCH',
                body: { commentText },
                headers: {
                    'Content-type': 'application/json',
                },
            }),
            invalidatesTags: ['Comment']
        }),
        sendFriendRequest: build.mutation<IUser, FriendRequest>({
            query: ({ id, friendId }) => ({
                url: `/users/${id}/send/${friendId}`,
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                },
            }),
            invalidatesTags: ['Friends'],
        }),
        cancelSendFriendRequest: build.mutation<IUser, FriendRequest>({
            query: ({ id, friendId }) => ({
                url: `/users/${id}/cancelsend/${friendId}`,
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                },
            }),
            invalidatesTags: ['Friends'],
        }),
        acceptFriendRequest: build.mutation<IUser, FriendRequest>({
            query: ({ id, friendId }) => ({
                url: `/users/${id}/accept/${friendId}`,
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                },
            }),
            invalidatesTags: ['Friends'],
        }),
        deleteFriend: build.mutation<IUser, FriendRequest>({
            query: ({ id, friendId }) => ({
                url: `/users/${id}/delete/${friendId}`,
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                },
            }),
            invalidatesTags: ['Customer', 'Friends'],
        }),
        getFavorite: build.query<IFavorite[], string>({
            query: (id) => `/users/${id}/getfavorite`,
            providesTags: ['Favorite'],
        }),
        favorite: build.mutation<IUser, FavoriteRequest>({
            query: ({ id, animeId }) => ({
                url: `/users/${id}/favorite/${animeId}`,
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                },
            }),
            invalidatesTags: ['Favorite'],
        }),
        getComments: build.query<IComment[], string>({
            query: (id) => `/users/${id}/getcomments`,
            providesTags: ['Comment'],
        }),
        updateUser: build.mutation<UserDataResponse, FormData>({
            query: (payload) => ({
                url: `/users/64762290ee1f2282e74fbf16/update`,
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['Me'],
        }),
    }),
});

export const { 
    useGetUserQuery, 
    useGetUsersQuery,
    useLazyGetUserQuery,  
    useGetCustomerQuery, 
    useGetFriendsQuery, 
    useGetSendRequestsQuery, 
    useCancelSendFriendRequestMutation, 
    useGetAcceptRequestsQuery, 
    useAddCommentMutation, 
    useSendFriendRequestMutation, 
    useAcceptFriendRequestMutation, 
    useDeleteFriendMutation, 
    useLazyGetFriendsQuery, 
    useFavoriteMutation,
    useGetFavoriteQuery,
    useGetCommentsQuery,
    useUpdateUserMutation
 } = userApi;