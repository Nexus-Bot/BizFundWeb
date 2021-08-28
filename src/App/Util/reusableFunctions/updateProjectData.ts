import ProjectInstance from "src/Ethereum/project";
import type { Milestone } from "../../../../types/modelTypes";
import api from "../API/backend";

export const addCreatedRequestIdToMilestone = async (
    requestId: number | null,
    milestoneId: string | null,
    token: string | null
): Promise<Milestone | null> => {
    if (requestId === null || !milestoneId || !token) return null;
    try {
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
    } catch (err) {
        return null;
    }
};

const accountAddress = async (): Promise<String | null> => {
    try {
        let ethereum = (window as any).ethereum;
        const accounts = await ethereum.request({
            method: "eth_requestAccounts",
        });

        return accounts[0];
    } catch (err) {
        return null;
    }
};

export const cancelRequest = async (
    projectAddress: string | undefined,
    requestId: number | undefined,
    reason: string | null
): Promise<boolean> => {
    if (!projectAddress || requestId === undefined || reason === null)
        return false;

    // Call the web3.js api to cancel the request
    try {
        const account = await accountAddress();
        const projectInstance = ProjectInstance(projectAddress);
        await projectInstance!.methods.cancelRequest(requestId, reason).send({
            from: account,
        });

        return true;
    } catch (err) {
        return false;
    }
};

export const upvoteRequest = async (
    projectAddress: string | undefined,
    requestId: number | undefined
): Promise<boolean> => {
    if (!projectAddress || requestId === undefined) return false;

    // Call the web3.js api to upvote the request
    try {
        const account = await accountAddress();
        const projectInstance = ProjectInstance(projectAddress);
        await projectInstance!.methods.approveRequest(requestId).send({
            from: account,
        });

        return true;
    } catch (err) {
        return false;
    }
};

export const downvoteRequest = async (
    projectAddress: string | undefined,
    requestId: number | undefined
): Promise<boolean> => {
    if (!projectAddress || requestId === undefined) return false;

    // Call the web3.js api to downvote the request
    try {
        const account = await accountAddress();
        const projectInstance = ProjectInstance(projectAddress);
        await projectInstance!.methods.denyRequest(requestId).send({
            from: account,
        });

        return true;
    } catch (err) {
        return false;
    }
};

export const cancelProject = async (
    projectAddress: string | undefined,
    reason: string | null
): Promise<boolean> => {
    if (!projectAddress || reason === null) return false;

    // Call the web3.js api to cancel to project
    try {
        const account = await accountAddress();
        const projectInstance = ProjectInstance(projectAddress);
        await projectInstance!.methods.cancelProject(reason).send({
            from: account,
        });

        return true;
    } catch (err) {
        return false;
    }
};

export const finishProject = async (
    projectAddress: string | undefined
): Promise<boolean> => {
    if (!projectAddress) return false;

    // Call the web3.js api to finish to project
    try {
        const account = await accountAddress();
        const projectInstance = ProjectInstance(projectAddress);
        await projectInstance!.methods.finishProject().send({
            from: account,
        });

        return true;
    } catch (err) {
        return false;
    }
};
