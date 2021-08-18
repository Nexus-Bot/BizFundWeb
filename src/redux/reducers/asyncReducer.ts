import { createSlice } from "@reduxjs/toolkit";

interface asyncState {
    loading: boolean;
}

const initialState: asyncState = {
    loading: false,
};

const asyncSlice = createSlice({
    name: "async",
    initialState,
    reducers: {
        asycnActionStarted: (state) => {
            state.loading = true;
        },
        asyncActionError: (state) => {
            state.loading = false;
        },
        asyncActionFinished: (state) => {
            state.loading = false;
        },
    },
});

export const { asycnActionStarted, asyncActionError, asyncActionFinished } =
    asyncSlice.actions;

export default asyncSlice.reducer;
