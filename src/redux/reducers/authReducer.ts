import type { ProjectMaker, BizFundraiser } from "./../../../types/modelTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    authenticated: boolean;
    currentBizFundraiser: BizFundraiser | null;
    currentProjectMaker: ProjectMaker | null;
}

const initialState: AuthState = {
    authenticated: false,
    currentProjectMaker: null,
    currentBizFundraiser: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginBizFundraiser: (state, action: PayloadAction<BizFundraiser>) => {
            state.authenticated = true;
            state.currentBizFundraiser = action.payload;
            state.currentProjectMaker = null;
        },
        loginProjectMaker: (state, action: PayloadAction<ProjectMaker>) => {
            state.authenticated = true;
            state.currentBizFundraiser = null;
            state.currentProjectMaker = action.payload;
        },
        logoutUser: (state) => {
            state.authenticated = false;
            state.currentBizFundraiser = null;
            state.currentProjectMaker = null;
        },
    },
});

export const { loginProjectMaker, loginBizFundraiser, logoutUser } =
    authSlice.actions;

export default authSlice.reducer;
