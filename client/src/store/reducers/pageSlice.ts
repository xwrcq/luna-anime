import { createSlice } from '@reduxjs/toolkit';

interface pageState {
    topAiringPage: number;
}

const initialState: pageState = {
    topAiringPage: 1,
}

export const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        changeTopAiringPage(state) {
            state.topAiringPage = state.topAiringPage + 1;
        },
    },
});

export const { changeTopAiringPage } = pageSlice.actions;
export default pageSlice.reducer;