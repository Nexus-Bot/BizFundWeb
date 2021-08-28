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
        minContribution: 100,
        currentBalance: 1000,
        totalPoolBalance: 3000,
        fees: 0.05,
        imgURL: "https://source.unsplash.com/random",
        folderURL: "test1 folder address",
        creatorMetamaskAddress: "xyz",
        numRequests: 3,
        approversCount: 10,
        contributorsCount: 10,
        isMap: false,
        postalAddress: "Address of the project",
        lng: "",
        lat: "",
        placeName: "",
        cancelled: false,
        finished: false,
    },
    {
        id: "test1",
        title: "test1 project",
        description: "test1 project description",
        minContribution: 100,
        currentBalance: 1000,
        totalPoolBalance: 3000,
        fees: 0.05,
        imgURL: "https://source.unsplash.com/random",
        folderURL: "test1 folder address",
        creatorMetamaskAddress: "xyz",
        numRequests: 3,
        approversCount: 10,
        contributorsCount: 10,
        isMap: false,
        postalAddress: "Address of the project",
        lng: "",
        lat: "",
        placeName: "",
        cancelled: false,
        finished: false,
    },
    {
        id: "test1",
        title: "test1 project",
        description: "test1 project description",
        minContribution: 100,
        currentBalance: 1000,
        totalPoolBalance: 3000,
        fees: 0.05,
        imgURL: "https://source.unsplash.com/random",
        folderURL: "test1 folder address",
        creatorMetamaskAddress: "xyz",
        numRequests: 3,
        approversCount: 10,
        contributorsCount: 10,
        isMap: false,
        postalAddress: "Address of the project",
        lng: "",
        lat: "",
        placeName: "",
        cancelled: false,
        finished: false,
    },
];

const initialState: ProjectState = {
    projects: testProjects,
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
