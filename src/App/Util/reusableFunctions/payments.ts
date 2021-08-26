export const contributeInProject = async (
    isSignedIn: boolean,
    projectAddress: string | undefined
): Promise<boolean> => {
    if (!projectAddress) return false;

    // Call the web3.js api to contribute in project

    return false;
};

export const payVendor = async (
    projectAddress: string | undefined,
    requestId: number | undefined
): Promise<boolean> => {
    if (!projectAddress || requestId === undefined) return false;

    // Call the web3.js api to intiate transcation for the vendor payment

    return false;
};

export const checkRefund = async (
    projectAddress: string | undefined
): Promise<number | null> => {
    if (!projectAddress) return null;

    // Call the web3.js api to check refund of contributor

    return null;
};

export const getRefund = async (
    projectAddress: string | undefined
): Promise<boolean> => {
    if (!projectAddress) return false;

    // Call the web3.js api to initiate refund of contributor

    return false;
};
