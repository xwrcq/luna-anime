import { logout, setUserData } from '../../store/reducers/authSlice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { UserLogin, UserRegistration, UserDataResponse, IUser } from '../../ts/interfaces/user';
import { RootState } from '../../store';
import { Mutex } from 'async-mutex';
import { userApi } from '../User';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_SERVER_URL,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('accessToken');
        
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers;
    }
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result.error && result.error.status === 401) {

        const refreshResult = await baseQuery(
            { credentials: 'include', url: '/refresh' }, api, extraOptions
        );
        if (refreshResult.data) {
            const user = (api.getState() as RootState).authSlice.user;

            api.dispatch(setUserData(refreshResult.data as UserDataResponse));
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
        }
    }

    return result
}

export const authApi = createApi({
    baseQuery: baseQueryWithReauth,
    reducerPath: 'authApi',
    endpoints: (build) => ({
        registration: build.mutation<UserDataResponse, UserRegistration>({
            query: (payload) => ({
                url: '/registration',
                method: 'POST',
                body: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }),
        }),
        login: build.mutation<UserDataResponse, UserLogin>({
            query: (payload) => ({
                url: '/login',
                method: 'POST',
                body: payload,
                credentials: 'include',
                headers: {
                    'Content-type': 'application/json',
                }
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    await dispatch(userApi.endpoints.getUser.initiate(null));
                } catch (error) { }
            },
        }),
        fetchLogout: build.mutation<void, void>({
            query: () => ({
                url: '/logout',
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                }
            }),        
        }),
    }),
});

export const { useRegistrationMutation, useLoginMutation, useFetchLogoutMutation } = authApi;