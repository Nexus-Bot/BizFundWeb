import type {
    Project,
    Milestone,
    Request,
    File,
} from "../../../../types/modelTypes";

import projectCreator from "../../../Ethereum/projectCreator";
import api from "../API/backend";

const testProject = {
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
};

const testRequest = {
    id: 0,
    title: "Test Request",
    description: "Test Request Description",
    milestoneId: "6125709accabdb6404690488",
    value: 2000,
    vendorMetamaskAddress: "xyz2",
    isComplete: false,
    approvalsCount: 5,
    denialsCount: 3,
    imgURL: "https://source.unsplash.com/random",
    filesURL: "test request folder address",
    cancelled: false,
};

export const getProjectAddresses = async (): Promise<String[] | null> => {
    const responseArray = await projectCreator.methods
        .getDeployedProjects()
        .call();

    return responseArray;
};

export const getProjectDataByProjectAddress = async (
    metamaskAddress: string | undefined
): Promise<Project | null> => {
    if (metamaskAddress === undefined) return null;

    // Fetch the projectData from blockchain

    return testProject;
};

export const getMilestonesForProject = async (
    projectAddress: string | undefined
): Promise<Milestone[] | null> => {
    if (!projectAddress) return null;

    const res = await api.get(`/project/milestones/${projectAddress}`);

    if (res.data) return res.data;

    return null;
};

export const getMilestoneDataById = async (
    milestoneId: string
): Promise<Milestone | null> => {
    if (!milestoneId) return null;

    // Fetch the milestone from mongoDB Database
    const res = await api.get(`/milestones/${milestoneId}`);

    if (res.data) return res.data;

    return null;
};

export const getRequestDataByRequestIndex = async (
    projectAddress: string | undefined,
    requestIndex: number | undefined
): Promise<Request | null> => {
    if (!projectAddress || requestIndex === undefined) return null;

    // Fetch the request from blockchain

    return testRequest;
};

export const getRequestsForMilestone = async (
    projectAddress: string | undefined,
    requestIndexes: number[] | undefined
): Promise<Request[] | null> => {
    if (!projectAddress || !requestIndexes) return null;

    let requests: Request[] = [];

    await Promise.all(
        requestIndexes.map(async (requestIndex) => {
            const requestData = await getRequestDataByRequestIndex(
                projectAddress,
                requestIndex
            );

            if (requestData) requests.push(requestData);
        })
    );

    return requests;
};

export const getFilesFromDB = async (
    folderURL: string | undefined
): Promise<File[] | null> => {
    if (!folderURL) return null;

    // Call the API

    return null;
};
