import type {
    Milestone,
    Project,
    ProjectMaker,
    Request,
} from "../../../../types/modelTypes";
import api from "../API/backend";
import projectCreator from "../../../Ethereum/projectCreator";
import ProjectInstance from "../../../Ethereum/project";
import web3 from "../../../Ethereum/web3";

export const createProjectInBlockchain = async (
    projectData: any | Project
): Promise<Project | null> => {
    if (!projectData) return null;
    try {
        let ethereum = (window as any).ethereum;
        const accounts = await ethereum.request({
            method: "eth_requestAccounts",
        });

        // call the web3.js api to create project
        await projectCreator!.methods
            .deployProject(
                projectData.title,
                projectData.description,
                web3.utils.toWei(projectData.minContribution, "ether"),
                projectData.imgURL,
                projectData.folderURL,
                projectData.isMap,
                projectData.postalAddress,
                projectData.lat,
                projectData.lng,
                projectData.placeName
            )
            .send({
                from: accounts[0],
            });
        return projectData;
    } catch (err) {
        return null;
    }
};

export const addProjectInProjectMakersAccount = async (
    projectAddress: string | null,
    token: string | null
): Promise<ProjectMaker | null> => {
    if (!projectAddress || !token) return null;

    try {
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
    } catch (Err) {
        return null;
    }
};

export const createRequestInBlockchain = async (
    projectAddress: string | null,
    requestData: any | Request
): Promise<number | null> => {
    if (!requestData || !projectAddress) return null;
    // call the web3.js api to create request
    try {
        let ethereum = (window as any).ethereum;
        const accounts = await ethereum.request({
            method: "eth_requestAccounts",
        });

        const projectInstance = ProjectInstance(projectAddress);
        const requestIndex = await projectInstance!.methods
            .createRequests(
                requestData.title,
                requestData.description,
                web3.utils.toWei(requestData.value, "ether"),
                requestData.milestoneId,
                requestData.vendorMetamaskAddress,
                requestData.imgURL,
                requestData.filesURL
            )
            .send({
                from: accounts[0],
            });

        return requestIndex;
    } catch (err) {
        return null;
    }
};

export const createMilestoneForProject = async (
    milestoneData: any | Milestone,
    token: string | null
): Promise<Milestone | null> => {
    if (!milestoneData || !token) return null;
    try {
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
    } catch (err) {
        return null;
    }
};
