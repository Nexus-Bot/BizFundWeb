import type { ProjectMaker, BizFundraiser } from "./../../../types/modelTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    authenticated: boolean;
    currentUser: ProjectMaker | BizFundraiser | null;
}

const initialState: AuthState = {
    authenticated: false,
    currentUser: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginBizFundraiser: (state, action: PayloadAction<BizFundraiser>) => {
            state.authenticated = true;
            state.currentUser = action.payload;
        },
        loginProjectMaker: (state, action: PayloadAction<ProjectMaker>) => {
            state.authenticated = true;
            state.currentUser = action.payload;
        },
        logoutUser: (state) => {
            state.authenticated = false;
            state.currentUser = null;
        },
    },
});

export const { loginProjectMaker, loginBizFundraiser, logoutUser } =
    authSlice.actions;

export default authSlice.reducer;
