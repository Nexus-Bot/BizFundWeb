export interface BizFundraiserSignInForm {
    email: string;
    password: string;
}

export interface BizFundraiserSignUpForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface ProjectMakerSignInForm {
    email: string;
    password: string;
}

export interface ProjectMakerSignUpForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface Location {
    center: any;
    placeName: string;
}

export interface ProjectForm {
    title: string;
    description: string;
    isMap: boolean;
    postalAddress?: string;
    location: Location;
    minContribution: number;
}

export interface MilestoneForm {
    title: string;
    description: string;
}

export interface RequestForm {
    title: string;
    description: string;
    vendorMetamaskAddress: string;
    value: number;
}
