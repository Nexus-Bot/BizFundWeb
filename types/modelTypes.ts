export interface Project {
    name: string;
    description: string;
}

export interface BizFundraiser {
    email: string;
    firstName: string;
    lastName: string;
}

export interface ProjectMaker {
    email: string;
    firstName: string;
    lastName: string;
    Projects: Project[];
}
