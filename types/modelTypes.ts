export interface Milestone {
    id: string;
    projectId: string;
    creator: ProjectMaker;
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
    title: string;
    description: string;
    milestoneId: string;
    value: number;
    vendorAddress: string;
    isComplete: boolean;
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
    creatorMetamuskAddress: string;
    requests: Request[];
    approversCount: number;
    contributorsCount: number;
}

export interface BizFundraiser {
    id: string;
    isProjectMaker: boolean;
    isBizFundRaiser: boolean;
    metamuskAddress: string;
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
    metamuskAddress: string;
    email: string;
    firstName: string;
    lastName: string;
    displayName: string;
    photoURL: string;
    Projects: Project[];
}
