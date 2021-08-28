import type { Project, Milestone, Request } from "../../../../types/modelTypes";
import projectCreator from "../../../Ethereum/projectCreator";
import api from "../API/backend";
import { fireabaseStorage } from "../API/firebase";
import { ref, getDownloadURL, listAll } from "firebase/storage";

import ProjectInstance from "../../../Ethereum/project";
import web3 from "src/Ethereum/web3";

const testProject = {
    id: "test1",
    title: "test1 project",
    description: "test1 project description",
    minContribution: 100,
    currentBalance: 1000,
    totalPoolBalance: 3000,
    fees: 0.05,
    imgURL: "https://source.unsplash.com/random",
    folderURL: "test1folderaddress",
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

export const getProjectAddresses = async (): Promise<string[] | null> => {
    try {
        const responseArray = await projectCreator.methods
            .getDeployedProjects()
            .call();

        return responseArray;
    } catch (err) {
        console.log(err);
        return null;
    }
};

export const getProjectDataByProjectAddress = async (
    projectAddress: string | undefined
): Promise<Project | null> => {
    if (projectAddress === undefined) return null;

    // Fetch the projectData from blockchain
    try {
        const projectInstance = ProjectInstance(projectAddress);
        const basicDetailsRes = await projectInstance!.methods
            .getBasicDetails()
            .call();
        const liveDetailsRes = await projectInstance!.methods
            .getLiveDetails()
            .call();
        const numRequest = await projectInstance!.methods.numRequests().call();

        const obj: Project = {
            id: projectAddress,
            title: basicDetailsRes.title,
            description: basicDetailsRes.description,
            isMap: basicDetailsRes.isMap,
            postalAddress: basicDetailsRes.postalAddress,
            placeName: basicDetailsRes.placeName,
            lng: basicDetailsRes.lng,
            lat: basicDetailsRes.lat,
            minContribution: parseFloat(
                web3.utils.fromWei(basicDetailsRes.minContribution, "ether")
            ),
            currentBalance: parseFloat(
                web3.utils.fromWei(liveDetailsRes[0], "ether")
            ),
            totalPoolBalance: parseFloat(
                web3.utils.fromWei(liveDetailsRes[1], "ether")
            ),
            imgURL: basicDetailsRes.imageUrl,
            folderURL: basicDetailsRes.folderUrl,
            fees: 0,
            creatorMetamaskAddress: basicDetailsRes.owner,
            numRequests: numRequest,
            approversCount: liveDetailsRes[2],
            contributorsCount: liveDetailsRes[3],
            cancelled: liveDetailsRes[4],
            finished: liveDetailsRes[5],
        };

        return obj;
    } catch (err) {
        return null;
    }
};

export const getAllProjectsData = async (): Promise<Project[] | null> => {
    try {
        // Fetching all addresses array
        const addressesArray = await getProjectAddresses();
        if (addressesArray === null) return null;

        const projectsDataArray: Project[] = [];

        await Promise.all(
            addressesArray.map(async (address) => {
                const response = await getProjectDataByProjectAddress(
                    address.toString()
                );

                if (response) projectsDataArray.push(response);
            })
        );

        return projectsDataArray;
    } catch (err) {
        console.log(err);
        return null;
    }
};

export const getMilestonesForProject = async (
    projectAddress: string | undefined
): Promise<Milestone[] | null> => {
    if (!projectAddress) return null;

    try {
        const res = await api.get(`/project/milestones/${projectAddress}`);

        if (res.data) return res.data;

        return null;
    } catch (err) {
        return null;
    }
};

export const getMilestoneDataById = async (
    milestoneId: string
): Promise<Milestone | null> => {
    if (!milestoneId) return null;

    try {
        // Fetch the milestone from mongoDB Database
        const res = await api.get(`/milestones/${milestoneId}`);

        if (res.data) return res.data;

        return null;
    } catch (err) {
        return null;
    }
};

export const getRequestDataByRequestIndex = async (
    projectAddress: string | undefined,
    requestIndex: number | undefined
): Promise<Request | null> => {
    if (!projectAddress || requestIndex === undefined) return null;

    // Fetch the request from blockchain
    try {
        const projectInstance = ProjectInstance(projectAddress);
        const reqData = await projectInstance!.methods
            .getRequestByIndex(requestIndex)
            .call();

        const obj: Request = {
            id: reqData.id,
            title: reqData.title,
            description: reqData.desc,
            milestoneId: reqData.milestoneId,
            value: web3.utils.fromWei(reqData.value, "ether").toString(),
            vendorMetamaskAddress: reqData.vendorAddress,
            isComplete: reqData.isComplete,
            approvalsCount: reqData.approvalsCount,
            denialsCount: reqData.denialsCount,
            imgURL: reqData.imgUrl,
            filesURL: reqData.filesUrl,
            cancelled: reqData.cancelled,
        };

        return obj;
    } catch (err) {
        console.log(err);
        return null;
    }
};

export const getRequestsForMilestone = async (
    projectAddress: string | undefined,
    requestIndexes: number[] | undefined
): Promise<Request[] | null> => {
    if (!projectAddress || !requestIndexes) return null;
    try {
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
    } catch (err) {
        return null;
    }
};

export const getFilesFromDB = async (
    folderURL: string | undefined
): Promise<{ name: string; url: string }[] | null> => {
    if (!folderURL) return null;

    try {
        const storageRef = ref(fireabaseStorage, `${folderURL}/Docs`);
        const files = await listAll(storageRef);

        const data: { name: string; url: string }[] = [];
        await Promise.all(
            files.items.map(async (file) => {
                const fileRef = ref(
                    fireabaseStorage,
                    `${storageRef}/${file.name}`
                );
                const downloadURL = await getDownloadURL(fileRef);

                if (downloadURL) {
                    data.push({ name: file.name, url: downloadURL });
                }
            })
        );
        return data;
    } catch (err) {
        return null;
    }
};
