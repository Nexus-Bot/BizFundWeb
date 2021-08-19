import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { Project } from "../../../types/modelTypes";

interface ProjectState {
    projects: Project[];
}

const testProjects: Project[] = [
    {
        id: "test1",
        title: "test1 project",
        description: "test1 project description",
        location: {
            isMap: false,
            addressLine1: "address line 1",
            addressLine2: "address line 2",
            lat: "",
            lng: "",
            placeName: "",
        },
        minContribution: 100,
        currentBalance: 1000,
        totalPoolBalance: 3000,
        fees: 0.05,
        imgURL: "test1",
        folderURL: "test1",
        creatorMetamaskAddress: "test1",
        requests: 3,
        approversCount: 0,
        contributorsCount: 10,
    },
];

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
