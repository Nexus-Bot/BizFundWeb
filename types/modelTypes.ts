export interface File {
    id: string;
    name: string;
    url: string;
}

export interface Milestone {
    id: string;
    projectId: string;
    milestoneIndex: number;
    title: string;
    description: string;
    isCompleted: boolean;
    isCancelled: boolean;
    requestIds: number[];
}

export interface Location {
    isMap: boolean;
    addressLine1: string;
    addressLine2: string;
    placeName: string;
    lng: string;
    lat: string;
}

export interface Request {
    id: string;
    index: number;
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
}

export interface Project {
    id: string;
    title: string;
    description: string;
    location: Location;
    minContribution: number;
    currentBalance: number;
    totalPoolBalance: number;
    fees: number;
    imgURL: string;
    folderURL: string;
    creatorMetamaskAddress: string;
    requests: number;
    approversCount: number;
    contributorsCount: number;
}

export interface BizFundraiser {
    id: string;
    isProjectMaker: boolean;
    isBizFundRaiser: boolean;
    metamaskAddress: string;
    email: string;
    firstName: string;
    lastName: string;
    displayName: string;
    photoURL: string;
}

export interface ProjectMaker {
    id: string;
    isProjectMaker: boolean;
    isBizFundRaiser: boolean;
    metamaskAddress: string;
    email: string;
    firstName: string;
    lastName: string;
    displayName: string;
    photoURL: string;
    Projects: Project[];
}
