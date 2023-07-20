import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser, UserDataResponse } from '../../ts/interfaces/user';

export interface userState {
    user: IUser | null;
}

const initialState: userState = {
    user: null
}

export const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData(state, action: PayloadAction<UserDataResponse>) {
            state.user = action.payload.user;
            localStorage.setItem('accessToken', action.payload.accessToken);
        },
        setUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
        },
        logout(state) {
            state.user = null;
            localStorage.removeItem('accessToken');
        },
    },
});

export const { setUserData, logout, setUser } = authSlice.actions;
export default authSlice.reducer;