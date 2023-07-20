import  pageSlice from './reducers/pageSlice';
import themeSlice from './reducers/themeSlice';
import authSlice from './reducers/authSlice'
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { animeApi } from '../services/Anime';
import { authApi } from '../services/Auth';
import { userApi } from '../services/User';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';


const rootReducer = combineReducers({
    [animeApi.reducerPath]: animeApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    themeSlice,
    authSlice,
    pageSlice
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefault) => getDefault().concat(animeApi.middleware).concat(authApi.middleware).concat(userApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;