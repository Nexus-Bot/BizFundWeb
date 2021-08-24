import type { Milestone, Project } from "../../../../types/modelTypes";
import api from "../API/backend";

export const createProjectInBlockchain = async (
    projectData: any | Project
): Promise<Project | null> => {
    if (!projectData) return null;
    // call the web3.js api to create project

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

    return null;
};
