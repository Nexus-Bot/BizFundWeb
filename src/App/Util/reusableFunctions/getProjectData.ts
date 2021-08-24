import type {
    Project,
    Milestone,
    Request,
    File,
} from "../../../../types/modelTypes";

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
export const getProjectDataByMetamaskAddress = async (
    metamaskAddress: string | undefined
): Promise<Project | null> => {
    if (metamaskAddress === undefined) return null;

    // Fetch the projectmaker by metamusk address

    return testProject;
};

export const getMilestoneDataById = async (
    milestoneId: string
): Promise<Milestone | null> => {
    if (!milestoneId) return null;

    // Fetch the milestone from mongoDB Database

    return null;
};

export const getRequestDataByRequestIndex = async (
    projectAddress: string | undefined,
    requestIndex: number | undefined
): Promise<Request | null> => {
    if (!projectAddress || !requestIndex) return null;

    // Fetch the request from blockchain

    return null;
};

export const getRequestsForMilestone = async (
    projectAddress: string | undefined,
    requestIndexes: number[] | undefined
): Promise<Request[] | null> => {
    if (!projectAddress || !requestIndexes || requestIndexes.length === 0)
        return null;

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
