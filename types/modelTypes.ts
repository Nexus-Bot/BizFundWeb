export interface File {
    id: string;
    name: string;
    url: string;
}

export interface Milestone {
    _id: string;
    projectId: string;
    milestoneIndex: number;
    owner: string;
    title: string;
    description: string;
    isCompleted: boolean;
    isCancelled: boolean;
    requestIds: number[];
    createdAt: string;
    updatedAt: string;
    "__v": number;
}

export interface Request {
    id: number;
    title: string;
    description: string;
    milestoneId: string;
    value: number;
    vendorMetamaskAddress: string;
    isComplete: boolean;
    isCancelled: boolean;
    approvalsCount: number;
    denialsCount: number;
    imgURL: string;
    filesURL: string;
    cancelled: boolean;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    isMap: boolean;
    postalAddress: string;
    placeName: string;
    lng: string;
    lat: string;
    minContribution: number;
    currentBalance: number;
    totalPoolBalance: number;
    fees: number;
    imgURL: string;
    folderURL: string;
    creatorMetamaskAddress: string;
    numRequests: number;
    approversCount: number;
    contributorsCount: number;
    cancelled: boolean;
    finished: boolean;
}

export interface BizFundraiser {
    _id: string;
    isProjectMaker: boolean;
    isBizFundRaiser: boolean;
    isVerified: boolean;
    metamaskAddress?: string;
    email: string;
    firstName: string;
    lastName: string;
    displayName?: string;
    photoURL?: string;
    createdAt: string;
    updatedAt: string;
    "__v": number;
}

export interface ProjectMaker {
    _id: string;
    isProjectMaker: boolean;
    isBizFundRaiser: boolean;
    isVerified: boolean;
    metamaskAddress?: string;
    email: string;
    firstName: string;
    lastName: string;
    displayName?: string;
    photoURL?: string;
    Projects: Project[];
    createdAt: string;
    updatedAt: string;
    "__v": number;
}
