import type { Milestone } from "../../../../types/modelTypes";
import api from "../API/backend";

export const addCreatedRequestIdToMilestone = async (
    requestId: number | null,
    milestoneId: string | null,
    token: string | null
): Promise<Milestone | null> => {
    if (requestId !== null || !milestoneId || !token) return null;

    const res = await api.patch(
        "/project/milestones/createrequest",
        {
            milestoneId,
            requestId,
        },
        {
            headers: { "Authorization": `Bearer ${token}` },
        }
    );

    if (res.data) return res.data;

    return null;
};

export const cancelRequest = async (
    projectAddress: string | undefined,
    requestId: number | undefined,
    reason: string | null
): Promise<boolean> => {
    if (!projectAddress || requestId === undefined || reason === null)
        return false;

    // Call the web3.js api to cancel the request

    return false;
};

export const upvoteRequest = async (
    projectAddress: string | undefined,
    requestId: number | undefined
): Promise<boolean> => {
    if (!projectAddress || requestId === undefined) return false;

    // Call the web3.js api to upvote the request

    return false;
};

export const downvoteRequest = async (
    projectAddress: string | undefined,
    requestId: number | undefined
): Promise<boolean> => {
    if (!projectAddress || requestId === undefined) return false;

    // Call the web3.js api to downvote the request

    return false;
};

export const cancelProject = async (
    projectAddress: string | undefined,
    reason: string | null
): Promise<boolean> => {
    if (!projectAddress || reason === null) return false;

    // Call the web3.js api to cancel to project

    return false;
};

export const finishProject = async (
    projectAddress: string | undefined
): Promise<boolean> => {
    if (!projectAddress) return false;

    // Call the web3.js api to finish to project

    return false;
};
