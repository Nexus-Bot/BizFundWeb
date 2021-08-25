import type {
    Milestone,
    Project,
    ProjectMaker,
    Request,
} from "../../../../types/modelTypes";
import api from "../API/backend";

export const createProjectInBlockchain = async (
    projectData: any | Project
): Promise<Project | null> => {
    if (!projectData) return null;
    // call the web3.js api to create project

    return null;
};

export const addProjectInProjectMakersAccount = async (
    projectAddress: string | null,
    token: string | null
): Promise<ProjectMaker | null> => {
    if (!projectAddress || !token) return null;

    const res = await api.patch(
        "/project/projectmaker/createproject",
        {
            projectAddress,
        },
        {
            headers: { "Authorization": `Bearer ${token}` },
        }
    );

    if (res.data) return res.data;

    return null;
};

export const createRequestInBlockchain = async (
    requestData: any | Request
): Promise<Request | null> => {
    if (!requestData) return null;
    // call the web3.js api to create request

    return null;
};

export const createMilestoneForProject = async (
    milestoneData: any | Milestone,
    token: string | null
): Promise<Milestone | null> => {
    if (!milestoneData || !token) return null;
    // call the api to create milestone
    const res = await api.post(
        "/milestones",
        { ...milestoneData },
        {
            headers: { "Authorization": `Bearer ${token}` },
        }
    );

    if (res.data) return res.data;

    return null;
};
