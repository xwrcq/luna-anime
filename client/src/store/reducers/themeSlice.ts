import { createSlice } from '@reduxjs/toolkit';
import { Theme } from '../../ts/enums/theme';
import { rootFile } from '../..';

interface themeState {
    theme: Theme.LIGHT | Theme.DARK
}

const initialState: themeState = {
    theme: Theme.LIGHT
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme(state) {
            rootFile?.classList.toggle(Theme.DARK);
            state.theme = state.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
        },
    },
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;