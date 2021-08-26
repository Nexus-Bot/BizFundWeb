export const checkUserIsContributor = async (
    projectAddress: string | undefined,
    userAddress: string | undefined
): Promise<boolean> => {
    if (!projectAddress || !userAddress) return false;
    // Call the web3.js api to check if user is contributor

    return true;
};

export const checkUserIsVoterForRequest = async (
    projectAddress: string | undefined,
    userAddress: string | undefined,
    requestIndex: number | undefined
): Promise<boolean> => {
    if (!projectAddress || !userAddress || !requestIndex) return false;
    // Call the web3.js api to check if user already voted

    return true;
};
