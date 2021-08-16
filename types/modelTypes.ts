export interface Project {
    name: string;
    description: string;
}

export interface BizFundraiser {
    id: string;
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
