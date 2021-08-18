export interface Milestone {
    number: number;
    name: string;
    description: string;
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
    milestoneNumber: number;
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
    creator: ProjectMaker;
    requests: Request[];
    approversCount: number;
    contributorsCount: number;
}

export interface BizFundraiser {
    id: string;
    metamuskAddress: string;
    email: string;
    firstName: string;
    lastName: string;
    displayName: string;
    photoURL: string;
}

export interface ProjectMaker {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    displayName: string;
    photoURL: string;
    Projects: Project[];
}
