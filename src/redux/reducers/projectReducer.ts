import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { Project } from "../../../types/modelTypes";

interface ProjectState {
    projects: Project[];
}

const initialState: ProjectState = {
    projects: [],
};

export const projectSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        fetchProjects: (state, action: PayloadAction<Project[]>) => {
            state.projects = action.payload;
        },
    },
});

export const { fetchProjects } = projectSlice.actions;

export default projectSlice.reducer;
